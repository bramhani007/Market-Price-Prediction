/**
 * Agricultural Market Record Structure (AGMARKNET & data.gov.in standard)
 */
export interface MarketRecord {
  id: string;
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrivalDate: string; // YYYY-MM-DD
  minPrice: number;    // INR per Quintal
  maxPrice: number;    // INR per Quintal
  modalPrice: number;  // Primary prediction target
  arrivals: number;    // Tonnes
}

export interface ModelMetrics {
  algorithm: string;
  mae: number;
  mse: number;
  rmse: number;
  r2: number;
  trainingTimeSec: number;
  bestHyperparameters: Record<string, string | number>;
  featureImportance: { feature: string; importance: number }[];
}

export interface PredictionResult {
  commodity: string;
  state: string;
  district: string;
  market: string;
  predictionDate: string;
  algorithm: string;
  predictedPrice: number;
  historicalAverage: number;
  confidenceMin: number;
  confidenceMax: number;
  priceTrend: 'Bullish (Upward)' | 'Bearish (Downward)' | 'Stable';
  percentageChange: number;
  seasonalImpact: string;
  historicalPoints: { date: string; actual: number }[];
  forecastTrajectory: { date: string; predicted: number }[];
  recommendation: string;
}

export interface MarketComparisonItem {
  market: string;
  district: string;
  latestActualPrice: number;
  predictedPrice: number;
  difference: number;
  percentageDiff: number;
  isHighest: boolean;
  recommendationText: string;
}

export interface FarmerRecommendation {
  id: string;
  type: 'market_arbitrage' | 'price_trend' | 'seasonal_timing' | 'risk_warning';
  commodity: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'normal';
  potentialGainPerQuintal?: number;
  suggestedAction: string;
}
