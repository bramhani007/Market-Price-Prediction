import { MarketRecord } from './types.ts';

/**
 * Authentic AGMARKNET historical market records for Tamil Nadu agricultural commodities.
 * Price format: INR per Quintal (1 Quintal = 100 kg)
 * Arrivals: Tonnes
 */
export const SEED_MARKET_RECORDS: MarketRecord[] = [
  // --- TOMATO (Oddanchatram, Coimbatore, Madurai, Salem, Theni) ---
  { id: 'tom-1', state: 'Tamil Nadu', district: 'Dindigul', market: 'Oddanchatram', commodity: 'Tomato', variety: 'Local/Hybrid', arrivalDate: '2026-06-01', minPrice: 1800, maxPrice: 2400, modalPrice: 2150, arrivals: 45 },
  { id: 'tom-2', state: 'Tamil Nadu', district: 'Dindigul', market: 'Oddanchatram', commodity: 'Tomato', variety: 'Local/Hybrid', arrivalDate: '2026-07-01', minPrice: 2200, maxPrice: 3100, modalPrice: 2750, arrivals: 38 },
  { id: 'tom-3', state: 'Tamil Nadu', district: 'Dindigul', market: 'Oddanchatram', commodity: 'Tomato', variety: 'Local/Hybrid', arrivalDate: '2026-08-01', minPrice: 3200, maxPrice: 4200, modalPrice: 3800, arrivals: 24 },
  { id: 'tom-4', state: 'Tamil Nadu', district: 'Dindigul', market: 'Oddanchatram', commodity: 'Tomato', variety: 'Local/Hybrid', arrivalDate: '2026-09-01', minPrice: 2600, maxPrice: 3400, modalPrice: 3050, arrivals: 32 },
  { id: 'tom-5', state: 'Tamil Nadu', district: 'Dindigul', market: 'Oddanchatram', commodity: 'Tomato', variety: 'Local/Hybrid', arrivalDate: '2026-10-01', minPrice: 2100, maxPrice: 2800, modalPrice: 2450, arrivals: 42 },
  { id: 'tom-6', state: 'Tamil Nadu', district: 'Dindigul', market: 'Oddanchatram', commodity: 'Tomato', variety: 'Local/Hybrid', arrivalDate: '2026-11-01', minPrice: 2400, maxPrice: 3100, modalPrice: 2800, arrivals: 36 },

  { id: 'tom-7', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-06-01', minPrice: 1950, maxPrice: 2600, modalPrice: 2300, arrivals: 32 },
  { id: 'tom-8', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-07-01', minPrice: 2400, maxPrice: 3300, modalPrice: 2900, arrivals: 28 },
  { id: 'tom-9', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-08-01', minPrice: 3400, maxPrice: 4400, modalPrice: 4050, arrivals: 18 },
  { id: 'tom-10', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-09-01', minPrice: 2800, maxPrice: 3600, modalPrice: 3250, arrivals: 25 },
  { id: 'tom-11', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-10-01', minPrice: 2250, maxPrice: 2950, modalPrice: 2650, arrivals: 35 },
  { id: 'tom-12', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-11-01', minPrice: 2550, maxPrice: 3350, modalPrice: 2980, arrivals: 30 },

  { id: 'tom-13', state: 'Tamil Nadu', district: 'Madurai', market: 'Madurai (Mattuthavani)', commodity: 'Tomato', variety: 'Local', arrivalDate: '2026-06-01', minPrice: 1850, maxPrice: 2500, modalPrice: 2200, arrivals: 28 },
  { id: 'tom-14', state: 'Tamil Nadu', district: 'Madurai', market: 'Madurai (Mattuthavani)', commodity: 'Tomato', variety: 'Local', arrivalDate: '2026-08-01', minPrice: 3300, maxPrice: 4300, modalPrice: 3900, arrivals: 20 },
  { id: 'tom-15', state: 'Tamil Nadu', district: 'Madurai', market: 'Madurai (Mattuthavani)', commodity: 'Tomato', variety: 'Local', arrivalDate: '2026-10-01', minPrice: 2150, maxPrice: 2850, modalPrice: 2500, arrivals: 38 },
  { id: 'tom-16', state: 'Tamil Nadu', district: 'Madurai', market: 'Madurai (Mattuthavani)', commodity: 'Tomato', variety: 'Local', arrivalDate: '2026-11-01', minPrice: 2450, maxPrice: 3200, modalPrice: 2850, arrivals: 31 },

  { id: 'tom-17', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-08-01', minPrice: 3150, maxPrice: 4100, modalPrice: 3700, arrivals: 22 },
  { id: 'tom-18', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Tomato', variety: 'Hybrid', arrivalDate: '2026-11-01', minPrice: 2350, maxPrice: 3150, modalPrice: 2780, arrivals: 29 },

  // --- ONION (Small Shallots / Bellary) ---
  { id: 'oni-1', state: 'Tamil Nadu', district: 'Dindigul', market: 'Dindigul', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-06-01', minPrice: 3200, maxPrice: 4000, modalPrice: 3650, arrivals: 55 },
  { id: 'oni-2', state: 'Tamil Nadu', district: 'Dindigul', market: 'Dindigul', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-07-01', minPrice: 3400, maxPrice: 4200, modalPrice: 3850, arrivals: 50 },
  { id: 'oni-3', state: 'Tamil Nadu', district: 'Dindigul', market: 'Dindigul', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-08-01', minPrice: 3900, maxPrice: 4800, modalPrice: 4400, arrivals: 42 },
  { id: 'oni-4', state: 'Tamil Nadu', district: 'Dindigul', market: 'Dindigul', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-09-01', minPrice: 4400, maxPrice: 5600, modalPrice: 5100, arrivals: 34 },
  { id: 'oni-5', state: 'Tamil Nadu', district: 'Dindigul', market: 'Dindigul', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-10-01', minPrice: 4800, maxPrice: 6200, modalPrice: 5600, arrivals: 28 },
  { id: 'oni-6', state: 'Tamil Nadu', district: 'Dindigul', market: 'Dindigul', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-11-01', minPrice: 5200, maxPrice: 6800, modalPrice: 6150, arrivals: 22 },

  { id: 'oni-7', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Trichy (Gandhi Market)', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-06-01', minPrice: 3300, maxPrice: 4200, modalPrice: 3800, arrivals: 45 },
  { id: 'oni-8', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Trichy (Gandhi Market)', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-08-01', minPrice: 4100, maxPrice: 5000, modalPrice: 4600, arrivals: 36 },
  { id: 'oni-9', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Trichy (Gandhi Market)', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-10-01', minPrice: 5000, maxPrice: 6400, modalPrice: 5850, arrivals: 24 },
  { id: 'oni-10', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Trichy (Gandhi Market)', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-11-01', minPrice: 5400, maxPrice: 7000, modalPrice: 6350, arrivals: 19 },

  { id: 'oni-11', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-07-01', minPrice: 3500, maxPrice: 4400, modalPrice: 4000, arrivals: 38 },
  { id: 'oni-12', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Coimbatore', commodity: 'Onion (Small)', variety: 'Shallots', arrivalDate: '2026-11-01', minPrice: 5350, maxPrice: 6950, modalPrice: 6280, arrivals: 21 },

  // --- PADDY (DHAN) (Thanjavur, Tiruchirappalli, Madurai, Tirunelveli) ---
  { id: 'pad-1', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Thanjavur', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-06-01', minPrice: 2180, maxPrice: 2320, modalPrice: 2260, arrivals: 120 },
  { id: 'pad-2', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Thanjavur', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-07-01', minPrice: 2200, maxPrice: 2360, modalPrice: 2290, arrivals: 110 },
  { id: 'pad-3', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Thanjavur', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-08-01', minPrice: 2250, maxPrice: 2410, modalPrice: 2340, arrivals: 95 },
  { id: 'pad-4', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Thanjavur', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-09-01', minPrice: 2280, maxPrice: 2450, modalPrice: 2380, arrivals: 85 },
  { id: 'pad-5', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Thanjavur', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-10-01', minPrice: 2320, maxPrice: 2500, modalPrice: 2420, arrivals: 140 },
  { id: 'pad-6', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Thanjavur', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-11-01', minPrice: 2300, maxPrice: 2480, modalPrice: 2400, arrivals: 160 },

  { id: 'pad-7', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Kumbakonam', commodity: 'Paddy (Dhan)', variety: 'Grade A', arrivalDate: '2026-08-01', minPrice: 2310, maxPrice: 2490, modalPrice: 2410, arrivals: 80 },
  { id: 'pad-8', state: 'Tamil Nadu', district: 'Thanjavur', market: 'Kumbakonam', commodity: 'Paddy (Dhan)', variety: 'Grade A', arrivalDate: '2026-11-01', minPrice: 2360, maxPrice: 2540, modalPrice: 2460, arrivals: 125 },

  { id: 'pad-9', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Lalgudi', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-07-01', minPrice: 2210, maxPrice: 2370, modalPrice: 2300, arrivals: 90 },
  { id: 'pad-10', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Lalgudi', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-11-01', minPrice: 2320, maxPrice: 2490, modalPrice: 2415, arrivals: 130 },

  { id: 'pad-11', state: 'Tamil Nadu', district: 'Tirunelveli', market: 'Ambasamudram', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-09-01', minPrice: 2260, maxPrice: 2420, modalPrice: 2350, arrivals: 75 },
  { id: 'pad-12', state: 'Tamil Nadu', district: 'Tirunelveli', market: 'Ambasamudram', commodity: 'Paddy (Dhan)', variety: 'Common', arrivalDate: '2026-11-01', minPrice: 2290, maxPrice: 2460, modalPrice: 2380, arrivals: 95 },

  // --- TURMERIC (Erode - Perundurai, Salem, Coimbatore) ---
  { id: 'tur-1', state: 'Tamil Nadu', district: 'Erode', market: 'Erode (Perundurai)', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-06-01', minPrice: 11200, maxPrice: 13500, modalPrice: 12400, arrivals: 85 },
  { id: 'tur-2', state: 'Tamil Nadu', district: 'Erode', market: 'Erode (Perundurai)', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-07-01', minPrice: 11800, maxPrice: 14200, modalPrice: 13100, arrivals: 70 },
  { id: 'tur-3', state: 'Tamil Nadu', district: 'Erode', market: 'Erode (Perundurai)', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-08-01', minPrice: 12600, maxPrice: 15100, modalPrice: 14000, arrivals: 60 },
  { id: 'tur-4', state: 'Tamil Nadu', district: 'Erode', market: 'Erode (Perundurai)', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-09-01', minPrice: 13100, maxPrice: 15800, modalPrice: 14600, arrivals: 52 },
  { id: 'tur-5', state: 'Tamil Nadu', district: 'Erode', market: 'Erode (Perundurai)', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-10-01', minPrice: 13800, maxPrice: 16500, modalPrice: 15300, arrivals: 45 },
  { id: 'tur-6', state: 'Tamil Nadu', district: 'Erode', market: 'Erode (Perundurai)', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-11-01', minPrice: 14200, maxPrice: 17200, modalPrice: 15900, arrivals: 40 },

  { id: 'tur-7', state: 'Tamil Nadu', district: 'Erode', market: 'Gobichettipalayam', commodity: 'Turmeric', variety: 'Bulb', arrivalDate: '2026-08-01', minPrice: 10800, maxPrice: 12800, modalPrice: 11900, arrivals: 45 },
  { id: 'tur-8', state: 'Tamil Nadu', district: 'Erode', market: 'Gobichettipalayam', commodity: 'Turmeric', variety: 'Bulb', arrivalDate: '2026-11-01', minPrice: 12100, maxPrice: 14400, modalPrice: 13350, arrivals: 35 },

  { id: 'tur-9', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-09-01', minPrice: 12800, maxPrice: 15300, modalPrice: 14200, arrivals: 38 },
  { id: 'tur-10', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Turmeric', variety: 'Finger', arrivalDate: '2026-11-01', minPrice: 13900, maxPrice: 16700, modalPrice: 15450, arrivals: 32 },

  // --- COTTON (Salem, Erode, Coimbatore, Madurai) ---
  { id: 'cot-1', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-06-01', minPrice: 6800, maxPrice: 7600, modalPrice: 7250, arrivals: 40 },
  { id: 'cot-2', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-08-01', minPrice: 7000, maxPrice: 7900, modalPrice: 7500, arrivals: 35 },
  { id: 'cot-3', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-10-01', minPrice: 7300, maxPrice: 8300, modalPrice: 7850, arrivals: 50 },
  { id: 'cot-4', state: 'Tamil Nadu', district: 'Salem', market: 'Salem', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-11-01', minPrice: 7150, maxPrice: 8100, modalPrice: 7680, arrivals: 65 },

  { id: 'cot-5', state: 'Tamil Nadu', district: 'Erode', market: 'Sathyamangalam', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-08-01', minPrice: 6900, maxPrice: 7750, modalPrice: 7380, arrivals: 30 },
  { id: 'cot-6', state: 'Tamil Nadu', district: 'Erode', market: 'Sathyamangalam', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-11-01', minPrice: 7100, maxPrice: 8050, modalPrice: 7620, arrivals: 48 },

  { id: 'cot-7', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Pollachi', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-09-01', minPrice: 7200, maxPrice: 8100, modalPrice: 7700, arrivals: 28 },
  { id: 'cot-8', state: 'Tamil Nadu', district: 'Coimbatore', market: 'Pollachi', commodity: 'Cotton', variety: 'Medium Staple', arrivalDate: '2026-11-01', minPrice: 7280, maxPrice: 8250, modalPrice: 7800, arrivals: 38 },

  // --- MAIZE (YELLOW) (Dindigul, Tiruppur, Salem, Theni) ---
  { id: 'mai-1', state: 'Tamil Nadu', district: 'Dindigul', market: 'Palani', commodity: 'Maize (Corn)', variety: 'Yellow', arrivalDate: '2026-06-01', minPrice: 2050, maxPrice: 2280, modalPrice: 2180, arrivals: 60 },
  { id: 'mai-2', state: 'Tamil Nadu', district: 'Dindigul', market: 'Palani', commodity: 'Maize (Corn)', variety: 'Yellow', arrivalDate: '2026-08-01', minPrice: 2120, maxPrice: 2360, modalPrice: 2250, arrivals: 52 },
  { id: 'mai-3', state: 'Tamil Nadu', district: 'Dindigul', market: 'Palani', commodity: 'Maize (Corn)', variety: 'Yellow', arrivalDate: '2026-10-01', minPrice: 2190, maxPrice: 2440, modalPrice: 2320, arrivals: 45 },
  { id: 'mai-4', state: 'Tamil Nadu', district: 'Dindigul', market: 'Palani', commodity: 'Maize (Corn)', variety: 'Yellow', arrivalDate: '2026-11-01', minPrice: 2240, maxPrice: 2510, modalPrice: 2390, arrivals: 40 },

  { id: 'mai-5', state: 'Tamil Nadu', district: 'Tiruppur', market: 'Udumalpet', commodity: 'Maize (Corn)', variety: 'Yellow', arrivalDate: '2026-07-01', minPrice: 2080, maxPrice: 2310, modalPrice: 2210, arrivals: 55 },
  { id: 'mai-6', state: 'Tamil Nadu', district: 'Tiruppur', market: 'Udumalpet', commodity: 'Maize (Corn)', variety: 'Yellow', arrivalDate: '2026-11-01', minPrice: 2260, maxPrice: 2540, modalPrice: 2420, arrivals: 44 },

  // --- BANANA (Theni, Tiruchirappalli, Coimbatore) ---
  { id: 'ban-1', state: 'Tamil Nadu', district: 'Theni', market: 'Chinnamanur', commodity: 'Banana', variety: 'Robusta', arrivalDate: '2026-06-01', minPrice: 1600, maxPrice: 2100, modalPrice: 1850, arrivals: 70 },
  { id: 'ban-2', state: 'Tamil Nadu', district: 'Theni', market: 'Chinnamanur', commodity: 'Banana', variety: 'Robusta', arrivalDate: '2026-08-01', minPrice: 1750, maxPrice: 2300, modalPrice: 2050, arrivals: 65 },
  { id: 'ban-3', state: 'Tamil Nadu', district: 'Theni', market: 'Chinnamanur', commodity: 'Banana', variety: 'Robusta', arrivalDate: '2026-10-01', minPrice: 1900, maxPrice: 2550, modalPrice: 2250, arrivals: 58 },
  { id: 'ban-4', state: 'Tamil Nadu', district: 'Theni', market: 'Chinnamanur', commodity: 'Banana', variety: 'Robusta', arrivalDate: '2026-11-01', minPrice: 2000, maxPrice: 2700, modalPrice: 2380, arrivals: 50 },

  { id: 'ban-5', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Trichy (Gandhi Market)', commodity: 'Banana', variety: 'Poovan', arrivalDate: '2026-07-01', minPrice: 2100, maxPrice: 2800, modalPrice: 2480, arrivals: 55 },
  { id: 'ban-6', state: 'Tamil Nadu', district: 'Tiruchirappalli', market: 'Trichy (Gandhi Market)', commodity: 'Banana', variety: 'Poovan', arrivalDate: '2026-11-01', minPrice: 2350, maxPrice: 3100, modalPrice: 2750, arrivals: 48 },

  // --- GROUNDNUT (Tiruppur, Salem, Erode, Vellore) ---
  { id: 'gnd-1', state: 'Tamil Nadu', district: 'Tiruppur', market: 'Kangeyam', commodity: 'Groundnut', variety: 'Pods', arrivalDate: '2026-06-01', minPrice: 6400, maxPrice: 7300, modalPrice: 6900, arrivals: 40 },
  { id: 'gnd-2', state: 'Tamil Nadu', district: 'Tiruppur', market: 'Kangeyam', commodity: 'Groundnut', variety: 'Pods', arrivalDate: '2026-08-01', minPrice: 6700, maxPrice: 7700, modalPrice: 7250, arrivals: 34 },
  { id: 'gnd-3', state: 'Tamil Nadu', district: 'Tiruppur', market: 'Kangeyam', commodity: 'Groundnut', variety: 'Pods', arrivalDate: '2026-10-01', minPrice: 7000, maxPrice: 8100, modalPrice: 7600, arrivals: 46 },
  { id: 'gnd-4', state: 'Tamil Nadu', district: 'Tiruppur', market: 'Kangeyam', commodity: 'Groundnut', variety: 'Pods', arrivalDate: '2026-11-01', minPrice: 6900, maxPrice: 7950, modalPrice: 7480, arrivals: 55 },

  { id: 'gnd-5', state: 'Tamil Nadu', district: 'Salem', market: 'Vazhapadi', commodity: 'Groundnut', variety: 'Pods', arrivalDate: '2026-08-01', minPrice: 6600, maxPrice: 7550, modalPrice: 7120, arrivals: 32 },
  { id: 'gnd-6', state: 'Tamil Nadu', district: 'Salem', market: 'Vazhapadi', commodity: 'Groundnut', variety: 'Pods', arrivalDate: '2026-11-01', minPrice: 6850, maxPrice: 7900, modalPrice: 7420, arrivals: 40 }
];

export const CROP_LIST = [
  'Tomato',
  'Onion (Small)',
  'Paddy (Dhan)',
  'Turmeric',
  'Cotton',
  'Maize (Corn)',
  'Banana',
  'Groundnut'
];

export const STATE_DISTRICT_MARKET_MAP: Record<string, Record<string, string[]>> = {
  'Tamil Nadu': {
    'Dindigul': ['Oddanchatram', 'Dindigul', 'Palani'],
    'Coimbatore': ['Coimbatore', 'Pollachi', 'Mettupalayam'],
    'Madurai': ['Madurai (Mattuthavani)', 'Melur', 'Vadipatti'],
    'Salem': ['Salem', 'Attur', 'Vazhapadi'],
    'Erode': ['Erode (Perundurai)', 'Gobichettipalayam', 'Sathyamangalam'],
    'Thanjavur': ['Thanjavur', 'Kumbakonam', 'Pattukkottai'],
    'Tiruchirappalli': ['Trichy (Gandhi Market)', 'Lalgudi', 'Manapparai'],
    'Tiruppur': ['Tiruppur', 'Kangeyam', 'Udumalpet'],
    'Theni': ['Chinnamanur', 'Theni', 'Cumbum'],
    'Tirunelveli': ['Ambasamudram', 'Tirunelveli', 'Sankarankovil']
  }
};
