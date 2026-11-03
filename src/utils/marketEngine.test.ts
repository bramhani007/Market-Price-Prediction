import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEvaluationMetrics,
  extractFeatures,
  predictCropPrice,
  compareMarkets,
  generateFarmerRecommendations,
  getModelPerformanceMetrics,
  parseAndValidateAgmarknetCSV
} from './marketEngine.ts';
import { SEED_MARKET_RECORDS } from './marketData.ts';

test('calculateEvaluationMetrics computes correct MAE, MSE, RMSE, and R2', () => {
  const actuals = [100, 200, 300, 400];
  const predictions = [110, 190, 310, 390];
  const metrics = calculateEvaluationMetrics(actuals, predictions);

  assert.equal(metrics.mae, 10);
  assert.equal(metrics.mse, 100);
  assert.equal(metrics.rmse, 10);
  assert.ok(metrics.r2 > 0.95, `R2 should be > 0.95, got ${metrics.r2}`);
});

test('extractFeatures correctly detects Indian agricultural seasons', () => {
  // August is Kharif season (Monsoon)
  const kharifFeatures = extractFeatures('2026-08-15', SEED_MARKET_RECORDS, 'Tomato');
  assert.equal(kharifFeatures.season, 'Kharif');
  assert.equal(kharifFeatures.month, 8);

  // December is Rabi season (Winter)
  const rabiFeatures = extractFeatures('2026-12-10', SEED_MARKET_RECORDS, 'Tomato');
  assert.equal(rabiFeatures.season, 'Rabi');

  // May is Zaid season (Summer)
  const zaidFeatures = extractFeatures('2026-05-20', SEED_MARKET_RECORDS, 'Tomato');
  assert.equal(zaidFeatures.season, 'Zaid');
});

test('predictCropPrice generates valid predictions for all 4 ML algorithms', () => {
  const algos = [
    'Random Forest Regressor',
    'XGBoost Regressor',
    'LightGBM Regressor',
    'SARIMA'
  ] as const;

  for (const algo of algos) {
    const res = predictCropPrice(
      'Tomato',
      'Tamil Nadu',
      'Dindigul',
      'Oddanchatram',
      '2026-12-15',
      algo,
      SEED_MARKET_RECORDS
    );

    assert.ok(res.predictedPrice > 1000, `Predicted price should be realistic, got ${res.predictedPrice}`);
    assert.ok(res.confidenceMin <= res.predictedPrice);
    assert.ok(res.confidenceMax >= res.predictedPrice);
    assert.ok(res.forecastTrajectory.length > 0, 'Should return forecast trajectory');
    assert.ok(['Bullish (Upward)', 'Bearish (Downward)', 'Stable'].includes(res.priceTrend));
    assert.ok(res.recommendation.length > 10, 'Should include actionable recommendation');
  }
});

test('compareMarkets ranks markets and selects highest predicted price', () => {
  const comparisons = compareMarkets('Onion (Small)', '2026-12-01', SEED_MARKET_RECORDS);
  assert.ok(comparisons.length >= 2, 'Should compare multiple markets');
  assert.equal(comparisons[0].isHighest, true, 'First market should be flagged as highest');
  assert.ok(comparisons[0].predictedPrice >= comparisons[1].predictedPrice, 'Should be sorted descending');
});

test('generateFarmerRecommendations provides real actionable insights', () => {
  const recs = generateFarmerRecommendations(SEED_MARKET_RECORDS);
  assert.ok(recs.length >= 3, 'Should generate at least 3 farmer recommendations');
  assert.ok(recs.some(r => r.commodity === 'Turmeric'));
  assert.ok(recs.some(r => r.type === 'market_arbitrage'));
});

test('getModelPerformanceMetrics returns benchmarks for all required algorithms', () => {
  const metrics = getModelPerformanceMetrics();
  assert.equal(metrics.length, 4);
  const names = metrics.map(m => m.algorithm);
  assert.ok(names.includes('Random Forest Regressor'));
  assert.ok(names.includes('XGBoost Regressor'));
  assert.ok(names.includes('LightGBM Regressor'));
  assert.ok(names.includes('SARIMA (Time-Series)'));
});

test('parseAndValidateAgmarknetCSV validates headers, parses rows, and flags bad data', () => {
  const validCsv = `State,District,Market,Commodity,Variety,Arrival Date,Min Price,Max Price,Modal Price,Arrivals
Tamil Nadu,Salem,Salem,Tomato,Hybrid,2026-11-05,2200,2800,2500,30
Tamil Nadu,Salem,Salem,Tomato,Hybrid,06/11/2026,2300,2900,2600,28`;

  const parsed = parseAndValidateAgmarknetCSV(validCsv);
  assert.equal(parsed.errors.length, 0);
  assert.equal(parsed.validRecords.length, 2);
  assert.equal(parsed.validRecords[0].modalPrice, 2500);
  assert.equal(parsed.validRecords[1].arrivalDate, '2026-11-06'); // normalized from 06/11/2026

  const invalidCsv = `ColA,ColB\n123,456`;
  const badParsed = parseAndValidateAgmarknetCSV(invalidCsv);
  assert.ok(badParsed.errors.length > 0, 'Should error on missing required columns');
});
