// Rich financial dataset for the Finance Physics platform
export const SECTORS = {
  TECHNOLOGY: { name: 'Technology', color: 'hsl(190, 100%, 50%)', glow: 'rgba(0, 242, 254, 0.4)' },
  FINANCIALS: { name: 'Financials', color: 'hsl(145, 100%, 45%)', glow: 'rgba(0, 230, 118, 0.4)' },
  CONSUMER: { name: 'Consumer Cyclical', color: 'hsl(35, 100%, 50%)', glow: 'rgba(255, 167, 38, 0.4)' },
  ENERGY: { name: 'Energy', color: 'hsl(15, 100%, 50%)', glow: 'rgba(255, 87, 34, 0.4)' },
  HEALTHCARE: { name: 'Healthcare', color: 'hsl(320, 100%, 60%)', glow: 'rgba(240, 98, 146, 0.4)' },
  CRYPTOCURRENCY: { name: 'Cryptocurrency', color: 'hsl(275, 100%, 60%)', glow: 'rgba(186, 104, 200, 0.4)' }
};

export const METRICS = [
  { id: 'price', name: 'Price ($)', min: 0.1, max: 100000, description: 'Current trading price' },
  { id: 'volume', name: 'Volume ($M)', min: 1, max: 50000, description: 'Trading volume in millions of dollars' },
  { id: 'marketCap', name: 'Market Cap ($B)', min: 0.1, max: 4000, description: 'Market capitalization in billions of dollars' },
  { id: 'peRatio', name: 'P/E Ratio', min: -50, max: 200, description: 'Price-to-Earnings Ratio' },
  { id: 'revenueGrowth', name: 'Revenue Growth (%)', min: -30, max: 150, description: 'Year-over-year revenue growth percentage' },
  { id: 'profitMargin', name: 'Profit Margin (%)', min: -50, max: 60, description: 'Net profit margin percentage' },
  { id: 'volatility', name: 'Volatility (%)', min: 5, max: 200, description: 'Standard deviation of price changes' },
  { id: 'correlation', name: 'Market Correlation', min: -1, max: 1, description: 'Correlation score relative to the wider index' },
  { id: 'momentum', name: 'Momentum Score', min: 0, max: 100, description: 'Trend strength and speed of price movements' },
  { id: 'riskScore', name: 'Risk Score', min: 1, max: 10, description: 'Composite risk rating (1 = lowest, 10 = highest)' },
  { id: 'openInterest', name: 'Open Interest ($M)', min: 0, max: 10000, description: 'Total value of outstanding derivative contracts' }
];

// 20 timeline quarters from Q1 2020 to Q4 2024
export const TIMELINE_LABELS = [
  'Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020',
  'Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
  'Q2 2022', 'Q2 2022 (II)', 'Q3 2022', 'Q4 2022',
  'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'
];

export const RAW_ASSETS = [
  // TECHNOLOGY STOCKS
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    assetClass: 'Stock',
    sector: 'TECHNOLOGY',
    description: 'Apple designs consumer electronics, software, and services. Known for its strong ecosystem and premium margins.',
    baseMetrics: {
      price: 180, volume: 12000, marketCap: 3000, peRatio: 30, revenueGrowth: 8, profitMargin: 26, volatility: 18, correlation: 0.82, momentum: 65, riskScore: 3, openInterest: 850
    },
    // Generate timeseries reflecting 2020-2024 trends (COVID dip, recovery, tech boom, rate hike slump, AI boom)
    timeseries: [
      { price: 75, volume: 8000, marketCap: 1300, peRatio: 22, revenueGrowth: 6, profitMargin: 21, volatility: 28, correlation: 0.75, momentum: 45, riskScore: 3, openInterest: 400 },
      { price: 90, volume: 11000, marketCap: 1550, peRatio: 26, revenueGrowth: 11, profitMargin: 22, volatility: 32, correlation: 0.80, momentum: 60, riskScore: 3, openInterest: 480 },
      { price: 115, volume: 14000, marketCap: 2000, peRatio: 35, revenueGrowth: 15, profitMargin: 24, volatility: 25, correlation: 0.85, momentum: 78, riskScore: 3, openInterest: 600 },
      { price: 132, volume: 12500, marketCap: 2250, peRatio: 38, revenueGrowth: 21, profitMargin: 25, volatility: 20, correlation: 0.83, momentum: 72, riskScore: 3, openInterest: 650 },
      { price: 122, volume: 10500, marketCap: 2080, peRatio: 32, revenueGrowth: 54, profitMargin: 26, volatility: 22, correlation: 0.81, momentum: 40, riskScore: 3, openInterest: 580 },
      { price: 136, volume: 9500, marketCap: 2300, peRatio: 33, revenueGrowth: 36, profitMargin: 25, volatility: 18, correlation: 0.78, momentum: 62, riskScore: 3, openInterest: 620 },
      { price: 141, volume: 10000, marketCap: 2380, peRatio: 31, revenueGrowth: 29, profitMargin: 26, volatility: 17, correlation: 0.79, momentum: 58, riskScore: 3, openInterest: 660 },
      { price: 177, volume: 13000, marketCap: 2900, peRatio: 32, revenueGrowth: 11, profitMargin: 26, volatility: 22, correlation: 0.85, momentum: 85, riskScore: 3, openInterest: 780 },
      { price: 174, volume: 11000, marketCap: 2850, peRatio: 30, revenueGrowth: 9, profitMargin: 25, volatility: 24, correlation: 0.84, momentum: 48, riskScore: 3, openInterest: 750 },
      { price: 136, volume: 13500, marketCap: 2200, peRatio: 23, revenueGrowth: 2, profitMargin: 25, volatility: 30, correlation: 0.88, momentum: 25, riskScore: 4, openInterest: 700 },
      { price: 138, volume: 9800, marketCap: 2230, peRatio: 24, revenueGrowth: 8, profitMargin: 25, volatility: 27, correlation: 0.86, momentum: 30, riskScore: 4, openInterest: 690 },
      { price: 129, volume: 11200, marketCap: 2060, peRatio: 22, revenueGrowth: -5, profitMargin: 24, volatility: 28, correlation: 0.89, momentum: 22, riskScore: 4, openInterest: 720 },
      { price: 164, volume: 9000, marketCap: 2600, peRatio: 28, revenueGrowth: -2, profitMargin: 24, volatility: 18, correlation: 0.75, momentum: 68, riskScore: 3, openInterest: 760 },
      { price: 189, volume: 10500, marketCap: 3000, peRatio: 31, revenueGrowth: -1, profitMargin: 25, volatility: 15, correlation: 0.72, momentum: 78, riskScore: 3, openInterest: 820 },
      { price: 171, volume: 8500, marketCap: 2720, peRatio: 27, revenueGrowth: 1, profitMargin: 25, volatility: 16, correlation: 0.78, momentum: 42, riskScore: 3, openInterest: 790 },
      { price: 192, volume: 9200, marketCap: 3050, peRatio: 29, revenueGrowth: 2, profitMargin: 26, volatility: 14, correlation: 0.70, momentum: 70, riskScore: 3, openInterest: 840 },
      { price: 171, volume: 11000, marketCap: 2650, peRatio: 25, revenueGrowth: -4, profitMargin: 26, volatility: 19, correlation: 0.76, momentum: 35, riskScore: 3, openInterest: 800 },
      { price: 210, volume: 12500, marketCap: 3200, peRatio: 31, revenueGrowth: 5, profitMargin: 26, volatility: 21, correlation: 0.79, momentum: 78, riskScore: 3, openInterest: 920 },
      { price: 225, volume: 10000, marketCap: 3430, peRatio: 33, revenueGrowth: 6, profitMargin: 27, volatility: 18, correlation: 0.81, momentum: 74, riskScore: 3, openInterest: 950 },
      { price: 230, volume: 11500, marketCap: 3500, peRatio: 34, revenueGrowth: 8, profitMargin: 28, volatility: 16, correlation: 0.82, momentum: 70, riskScore: 3, openInterest: 980 }
    ]
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    assetClass: 'Stock',
    sector: 'TECHNOLOGY',
    description: 'Microsoft dominates operating systems, enterprise software, and is a pioneer in AI integrations via Azure & OpenAI.',
    baseMetrics: {
      price: 420, volume: 10000, marketCap: 3100, peRatio: 36, revenueGrowth: 16, profitMargin: 36, volatility: 16, correlation: 0.80, momentum: 72, riskScore: 3, openInterest: 900
    },
    timeseries: [
      { price: 160, volume: 7500, marketCap: 1200, peRatio: 26, revenueGrowth: 15, profitMargin: 31, volatility: 25, correlation: 0.76, momentum: 48, riskScore: 3, openInterest: 450 },
      { price: 195, volume: 9200, marketCap: 1470, peRatio: 29, revenueGrowth: 13, profitMargin: 32, volatility: 28, correlation: 0.79, momentum: 62, riskScore: 3, openInterest: 510 },
      { price: 210, volume: 10500, marketCap: 1580, peRatio: 32, revenueGrowth: 12, profitMargin: 33, volatility: 22, correlation: 0.83, momentum: 58, riskScore: 3, openInterest: 550 },
      { price: 222, volume: 9000, marketCap: 1670, peRatio: 34, revenueGrowth: 17, profitMargin: 34, volatility: 18, correlation: 0.82, momentum: 60, riskScore: 3, openInterest: 590 },
      { price: 235, volume: 8500, marketCap: 1770, peRatio: 33, revenueGrowth: 19, profitMargin: 34, volatility: 19, correlation: 0.78, momentum: 55, riskScore: 3, openInterest: 610 },
      { price: 270, volume: 9500, marketCap: 2030, peRatio: 35, revenueGrowth: 21, profitMargin: 35, volatility: 20, correlation: 0.80, momentum: 78, riskScore: 3, openInterest: 680 },
      { price: 281, volume: 8200, marketCap: 2110, peRatio: 34, revenueGrowth: 22, profitMargin: 36, volatility: 16, correlation: 0.77, momentum: 62, riskScore: 3, openInterest: 700 },
      { price: 336, volume: 11000, marketCap: 2520, peRatio: 38, revenueGrowth: 20, profitMargin: 37, volatility: 21, correlation: 0.84, momentum: 88, riskScore: 3, openInterest: 810 },
      { price: 308, volume: 9200, marketCap: 2310, peRatio: 32, revenueGrowth: 18, profitMargin: 36, volatility: 23, correlation: 0.85, momentum: 45, riskScore: 3, openInterest: 780 },
      { price: 256, volume: 10500, marketCap: 1920, peRatio: 26, revenueGrowth: 12, profitMargin: 35, volatility: 28, correlation: 0.87, momentum: 28, riskScore: 4, openInterest: 730 },
      { price: 240, volume: 9600, marketCap: 1800, peRatio: 24, revenueGrowth: 11, profitMargin: 34, volatility: 29, correlation: 0.86, momentum: 21, riskScore: 4, openInterest: 720 },
      { price: 239, volume: 11000, marketCap: 1790, peRatio: 24, revenueGrowth: 2, profitMargin: 33, volatility: 27, correlation: 0.89, momentum: 23, riskScore: 4, openInterest: 740 },
      { price: 288, volume: 8900, marketCap: 2150, peRatio: 28, revenueGrowth: 7, profitMargin: 34, volatility: 18, correlation: 0.74, momentum: 70, riskScore: 3, openInterest: 770 },
      { price: 340, volume: 12000, marketCap: 2540, peRatio: 33, revenueGrowth: 8, profitMargin: 34, volatility: 22, correlation: 0.72, momentum: 82, riskScore: 3, openInterest: 830 },
      { price: 315, volume: 9000, marketCap: 2350, peRatio: 30, revenueGrowth: 13, profitMargin: 35, volatility: 20, correlation: 0.76, momentum: 40, riskScore: 3, openInterest: 800 },
      { price: 376, volume: 10000, marketCap: 2800, peRatio: 34, revenueGrowth: 18, profitMargin: 36, volatility: 16, correlation: 0.69, momentum: 78, riskScore: 3, openInterest: 850 },
      { price: 420, volume: 11500, marketCap: 3120, peRatio: 36, revenueGrowth: 17, profitMargin: 36, volatility: 18, correlation: 0.78, momentum: 75, riskScore: 3, openInterest: 910 },
      { price: 420, volume: 9200, marketCap: 3120, peRatio: 35, revenueGrowth: 15, profitMargin: 36, volatility: 15, correlation: 0.79, momentum: 55, riskScore: 3, openInterest: 890 },
      { price: 430, volume: 8800, marketCap: 3200, peRatio: 35, revenueGrowth: 16, profitMargin: 37, volatility: 14, correlation: 0.81, momentum: 62, riskScore: 3, openInterest: 910 },
      { price: 442, volume: 9500, marketCap: 3300, peRatio: 36, revenueGrowth: 16, profitMargin: 37, volatility: 13, correlation: 0.80, momentum: 68, riskScore: 3, openInterest: 940 }
    ]
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    assetClass: 'Stock',
    sector: 'TECHNOLOGY',
    description: 'NVIDIA manufactures high-end graphics processing units (GPUs) and has become the primary hardware provider for the Artificial Intelligence boom.',
    baseMetrics: {
      price: 900, volume: 32000, marketCap: 2800, peRatio: 72, revenueGrowth: 120, profitMargin: 48, volatility: 42, correlation: 0.68, momentum: 94, riskScore: 7, openInterest: 2200
    },
    timeseries: [
      { price: 60, volume: 3500, marketCap: 150, peRatio: 40, revenueGrowth: 19, profitMargin: 25, volatility: 38, correlation: 0.58, momentum: 52, riskScore: 5, openInterest: 180 },
      { price: 90, volume: 4800, marketCap: 224, peRatio: 52, revenueGrowth: 50, profitMargin: 27, volatility: 42, correlation: 0.65, momentum: 70, riskScore: 5, openInterest: 230 },
      { price: 130, volume: 5500, marketCap: 323, peRatio: 75, revenueGrowth: 57, profitMargin: 28, volatility: 35, correlation: 0.70, momentum: 80, riskScore: 5, openInterest: 300 },
      { price: 131, volume: 4200, marketCap: 325, peRatio: 72, revenueGrowth: 61, profitMargin: 27, volatility: 30, correlation: 0.68, momentum: 55, riskScore: 5, openInterest: 310 },
      { price: 128, volume: 4900, marketCap: 317, peRatio: 68, revenueGrowth: 84, profitMargin: 29, volatility: 32, correlation: 0.66, momentum: 48, riskScore: 5, openInterest: 330 },
      { price: 200, volume: 7200, marketCap: 498, peRatio: 88, revenueGrowth: 68, profitMargin: 30, volatility: 39, correlation: 0.72, momentum: 84, riskScore: 6, openInterest: 450 },
      { price: 207, volume: 6000, marketCap: 515, peRatio: 80, revenueGrowth: 66, profitMargin: 32, volatility: 34, correlation: 0.71, momentum: 64, riskScore: 6, openInterest: 460 },
      { price: 294, volume: 8500, marketCap: 730, peRatio: 95, revenueGrowth: 53, profitMargin: 33, volatility: 41, correlation: 0.76, momentum: 90, riskScore: 6, openInterest: 610 },
      { price: 273, volume: 7800, marketCap: 680, peRatio: 82, revenueGrowth: 46, profitMargin: 31, volatility: 45, correlation: 0.74, momentum: 42, riskScore: 6, openInterest: 580 },
      { price: 151, volume: 10500, marketCap: 376, peRatio: 40, revenueGrowth: 3, profitMargin: 22, volatility: 52, correlation: 0.79, momentum: 18, riskScore: 7, openInterest: 520 },
      { price: 121, volume: 12000, marketCap: 301, peRatio: 32, revenueGrowth: -19, profitMargin: 16, volatility: 58, correlation: 0.81, momentum: 12, riskScore: 8, openInterest: 550 },
      { price: 146, volume: 11000, marketCap: 363, peRatio: 44, revenueGrowth: -21, profitMargin: 15, volatility: 54, correlation: 0.82, momentum: 30, riskScore: 8, openInterest: 600 },
      { price: 270, volume: 15000, marketCap: 670, peRatio: 85, revenueGrowth: -13, profitMargin: 17, volatility: 44, correlation: 0.65, momentum: 88, riskScore: 7, openInterest: 920 },
      { price: 423, volume: 22000, marketCap: 1040, peRatio: 120, revenueGrowth: 101, profitMargin: 38, volatility: 50, correlation: 0.59, momentum: 95, riskScore: 7, openInterest: 1400 },
      { price: 435, volume: 18000, marketCap: 1070, peRatio: 98, revenueGrowth: 206, profitMargin: 46, volatility: 43, correlation: 0.61, momentum: 70, riskScore: 7, openInterest: 1350 },
      { price: 495, volume: 19500, marketCap: 1220, peRatio: 74, revenueGrowth: 251, profitMargin: 49, volatility: 38, correlation: 0.58, momentum: 76, riskScore: 6, openInterest: 1500 },
      { price: 900, volume: 32000, marketCap: 2200, peRatio: 78, revenueGrowth: 268, profitMargin: 53, volatility: 45, correlation: 0.63, momentum: 98, riskScore: 7, openInterest: 2300 },
      { price: 1095, volume: 38000, marketCap: 2700, peRatio: 72, revenueGrowth: 262, profitMargin: 55, volatility: 40, correlation: 0.67, momentum: 94, riskScore: 7, openInterest: 2600 },
      { price: 1200, volume: 34000, marketCap: 2950, peRatio: 65, revenueGrowth: 122, profitMargin: 54, volatility: 38, correlation: 0.68, momentum: 88, riskScore: 7, openInterest: 2750 },
      { price: 1280, volume: 36000, marketCap: 3150, peRatio: 66, revenueGrowth: 94, profitMargin: 56, volatility: 35, correlation: 0.69, momentum: 85, riskScore: 7, openInterest: 2900 }
    ]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    assetClass: 'Stock',
    sector: 'CONSUMER',
    description: 'Tesla builds electric vehicles, energy storage systems, and autonomous driving technology. Highly volatile, retail-driven stock.',
    baseMetrics: {
      price: 180, volume: 18000, marketCap: 570, peRatio: 45, revenueGrowth: -8, profitMargin: 12, volatility: 48, correlation: 0.58, momentum: 38, riskScore: 6, openInterest: 1400
    },
    timeseries: [
      { price: 30, volume: 8000, marketCap: 50, peRatio: 150, revenueGrowth: 20, profitMargin: 1, volatility: 60, correlation: 0.42, momentum: 75, riskScore: 7, openInterest: 300 },
      { price: 60, volume: 12000, marketCap: 100, peRatio: 200, revenueGrowth: 3, profitMargin: 2, volatility: 75, correlation: 0.48, momentum: 90, riskScore: 8, openInterest: 450 },
      { price: 140, volume: 22000, marketCap: 240, peRatio: 350, revenueGrowth: 39, profitMargin: 5, volatility: 80, correlation: 0.52, momentum: 98, riskScore: 8, openInterest: 750 },
      { price: 235, volume: 28000, marketCap: 400, peRatio: 480, revenueGrowth: 46, profitMargin: 7, volatility: 72, correlation: 0.56, momentum: 95, riskScore: 8, openInterest: 1100 },
      { price: 220, volume: 19000, marketCap: 380, peRatio: 400, revenueGrowth: 74, profitMargin: 11, volatility: 65, correlation: 0.54, momentum: 45, riskScore: 8, openInterest: 980 },
      { price: 226, volume: 16000, marketCap: 395, peRatio: 350, revenueGrowth: 99, profitMargin: 12, volatility: 58, correlation: 0.53, momentum: 52, riskScore: 7, openInterest: 1020 },
      { price: 258, volume: 17500, marketCap: 450, peRatio: 320, revenueGrowth: 57, profitMargin: 13, volatility: 54, correlation: 0.55, momentum: 64, riskScore: 7, openInterest: 1150 },
      { price: 352, volume: 24000, marketCap: 1000, peRatio: 380, revenueGrowth: 65, profitMargin: 14, volatility: 68, correlation: 0.60, momentum: 92, riskScore: 8, openInterest: 1600 },
      { price: 359, volume: 18000, marketCap: 1030, peRatio: 280, revenueGrowth: 81, profitMargin: 15, volatility: 60, correlation: 0.59, momentum: 52, riskScore: 8, openInterest: 1500 },
      { price: 224, volume: 22000, marketCap: 650, peRatio: 90, revenueGrowth: 42, profitMargin: 16, volatility: 65, correlation: 0.64, momentum: 28, riskScore: 7, openInterest: 1300 },
      { price: 180, volume: 21000, marketCap: 520, peRatio: 65, revenueGrowth: 55, profitMargin: 15, volatility: 68, correlation: 0.66, momentum: 20, riskScore: 7, openInterest: 1200 },
      { price: 123, volume: 25000, marketCap: 355, peRatio: 38, revenueGrowth: 37, profitMargin: 14, volatility: 72, correlation: 0.70, momentum: 10, riskScore: 8, openInterest: 1100 },
      { price: 207, volume: 21000, marketCap: 600, peRatio: 58, revenueGrowth: 24, profitMargin: 13, volatility: 55, correlation: 0.55, momentum: 80, riskScore: 7, openInterest: 1350 },
      { price: 261, volume: 23000, marketCap: 760, peRatio: 72, revenueGrowth: 47, profitMargin: 11, volatility: 52, correlation: 0.52, momentum: 86, riskScore: 7, openInterest: 1500 },
      { price: 250, volume: 17000, marketCap: 730, peRatio: 68, revenueGrowth: 9, profitMargin: 11, volatility: 48, correlation: 0.58, momentum: 48, riskScore: 7, openInterest: 1420 },
      { price: 248, volume: 16500, marketCap: 720, peRatio: 65, revenueGrowth: 3, profitMargin: 10, volatility: 46, correlation: 0.56, momentum: 46, riskScore: 7, openInterest: 1380 },
      { price: 175, volume: 19000, marketCap: 510, peRatio: 40, revenueGrowth: -9, profitMargin: 9, volatility: 50, correlation: 0.61, momentum: 25, riskScore: 7, openInterest: 1250 },
      { price: 197, volume: 20000, marketCap: 575, peRatio: 44, revenueGrowth: -3, profitMargin: 9, volatility: 54, correlation: 0.62, momentum: 58, riskScore: 7, openInterest: 1330 },
      { price: 220, volume: 16000, marketCap: 640, peRatio: 48, revenueGrowth: 2, profitMargin: 10, volatility: 49, correlation: 0.60, momentum: 62, riskScore: 6, openInterest: 1400 },
      { price: 250, volume: 18500, marketCap: 730, peRatio: 52, revenueGrowth: 8, profitMargin: 11, volatility: 45, correlation: 0.58, momentum: 68, riskScore: 6, openInterest: 1480 }
    ]
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    assetClass: 'Stock',
    sector: 'CONSUMER',
    description: 'Amazon dominates e-commerce, cloud computing (AWS), and digital streaming. Focuses on scaling operations and logistics.',
    baseMetrics: {
      price: 185, volume: 11000, marketCap: 1900, peRatio: 40, revenueGrowth: 13, profitMargin: 7, volatility: 20, correlation: 0.78, momentum: 68, riskScore: 4, openInterest: 750
    },
    timeseries: [
      { price: 95, volume: 9500, marketCap: 950, peRatio: 80, revenueGrowth: 26, profitMargin: 4, volatility: 32, correlation: 0.72, momentum: 50, riskScore: 4, openInterest: 420 },
      { price: 120, volume: 13000, marketCap: 1200, peRatio: 95, revenueGrowth: 40, profitMargin: 4, volatility: 38, correlation: 0.76, momentum: 74, riskScore: 4, openInterest: 490 },
      { price: 155, volume: 11000, marketCap: 1550, peRatio: 110, revenueGrowth: 37, profitMargin: 5, volatility: 30, correlation: 0.81, momentum: 82, riskScore: 4, openInterest: 560 },
      { price: 162, volume: 9800, marketCap: 1620, peRatio: 115, revenueGrowth: 44, profitMargin: 6, volatility: 26, correlation: 0.79, momentum: 70, riskScore: 4, openInterest: 580 },
      { price: 154, volume: 9000, marketCap: 1540, peRatio: 90, revenueGrowth: 38, profitMargin: 5, volatility: 27, correlation: 0.75, momentum: 42, riskScore: 4, openInterest: 550 },
      { price: 172, volume: 8500, marketCap: 1720, peRatio: 100, revenueGrowth: 27, profitMargin: 6, volatility: 24, correlation: 0.74, momentum: 60, riskScore: 4, openInterest: 590 },
      { price: 164, volume: 8200, marketCap: 1640, peRatio: 92, revenueGrowth: 15, profitMargin: 5, volatility: 22, correlation: 0.76, momentum: 48, riskScore: 4, openInterest: 570 },
      { price: 167, volume: 9400, marketCap: 1670, peRatio: 94, revenueGrowth: 9, profitMargin: 5, volatility: 25, correlation: 0.80, momentum: 52, riskScore: 4, openInterest: 600 },
      { price: 163, volume: 9000, marketCap: 1630, peRatio: 88, revenueGrowth: 7, profitMargin: 4, volatility: 28, correlation: 0.78, momentum: 45, riskScore: 4, openInterest: 590 },
      { price: 118, volume: 11500, marketCap: 1180, peRatio: 55, revenueGrowth: 15, profitMargin: 2, volatility: 35, correlation: 0.84, momentum: 22, riskScore: 5, openInterest: 550 },
      { price: 106, volume: 12500, marketCap: 1060, peRatio: 45, revenueGrowth: 10, profitMargin: -1, volatility: 39, correlation: 0.83, momentum: 18, riskScore: 5, openInterest: 540 },
      { price: 84, volume: 14000, marketCap: 840, peRatio: 38, revenueGrowth: 9, profitMargin: -2, volatility: 42, correlation: 0.86, momentum: 10, riskScore: 5, openInterest: 580 },
      { price: 103, volume: 10500, marketCap: 1030, peRatio: 48, revenueGrowth: 9, profitMargin: 1, volatility: 28, correlation: 0.74, momentum: 65, riskScore: 4, openInterest: 610 },
      { price: 130, volume: 11000, marketCap: 1300, peRatio: 58, revenueGrowth: 11, profitMargin: 3, volatility: 24, correlation: 0.71, momentum: 78, riskScore: 4, openInterest: 670 },
      { price: 127, volume: 8800, marketCap: 1270, peRatio: 52, revenueGrowth: 13, profitMargin: 4, volatility: 25, correlation: 0.75, momentum: 46, riskScore: 4, openInterest: 650 },
      { price: 152, volume: 9200, marketCap: 1520, peRatio: 60, revenueGrowth: 14, profitMargin: 5, volatility: 22, correlation: 0.69, momentum: 72, riskScore: 4, openInterest: 700 },
      { price: 180, volume: 10800, marketCap: 1800, peRatio: 45, revenueGrowth: 13, profitMargin: 6, volatility: 21, correlation: 0.76, momentum: 80, riskScore: 4, openInterest: 740 },
      { price: 193, volume: 9800, marketCap: 1930, peRatio: 48, revenueGrowth: 10, profitMargin: 7, volatility: 18, correlation: 0.78, momentum: 68, riskScore: 4, openInterest: 780 },
      { price: 189, volume: 8500, marketCap: 1890, peRatio: 44, revenueGrowth: 11, profitMargin: 7, volatility: 19, correlation: 0.79, momentum: 55, riskScore: 4, openInterest: 760 },
      { price: 202, volume: 9000, marketCap: 2020, peRatio: 46, revenueGrowth: 12, profitMargin: 8, volatility: 17, correlation: 0.78, momentum: 62, riskScore: 4, openInterest: 790 }
    ]
  },

  // FINANCIALS STOCKS
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    assetClass: 'Stock',
    sector: 'FINANCIALS',
    description: 'JPMorgan Chase is the largest bank in the US. Diversified across investment banking, commercial banking, and asset management.',
    baseMetrics: {
      price: 195, volume: 5500, marketCap: 560, peRatio: 12, revenueGrowth: 11, profitMargin: 33, volatility: 14, correlation: 0.75, momentum: 64, riskScore: 2, openInterest: 180
    },
    timeseries: [
      { price: 110, volume: 6200, marketCap: 335, peRatio: 11, revenueGrowth: 5, profitMargin: 29, volatility: 25, correlation: 0.70, momentum: 40, riskScore: 3, openInterest: 110 },
      { price: 92, volume: 8500, marketCap: 280, peRatio: 9, revenueGrowth: -2, profitMargin: 22, volatility: 35, correlation: 0.78, momentum: 25, riskScore: 4, openInterest: 130 },
      { price: 100, volume: 7000, marketCap: 305, peRatio: 10, revenueGrowth: 4, profitMargin: 26, volatility: 28, correlation: 0.75, momentum: 42, riskScore: 3, openInterest: 125 },
      { price: 127, volume: 6100, marketCap: 385, peRatio: 13, revenueGrowth: 8, profitMargin: 28, volatility: 20, correlation: 0.74, momentum: 68, riskScore: 3, openInterest: 140 },
      { price: 152, volume: 5800, marketCap: 460, peRatio: 15, revenueGrowth: 14, profitMargin: 31, volatility: 18, correlation: 0.71, momentum: 75, riskScore: 3, openInterest: 155 },
      { price: 155, volume: 5100, marketCap: 470, peRatio: 14, revenueGrowth: 18, profitMargin: 32, volatility: 16, correlation: 0.73, momentum: 58, riskScore: 3, openInterest: 150 },
      { price: 163, volume: 4900, marketCap: 495, peRatio: 15, revenueGrowth: 15, profitMargin: 32, volatility: 15, correlation: 0.70, momentum: 62, riskScore: 3, openInterest: 160 },
      { price: 158, volume: 5400, marketCap: 480, peRatio: 14, revenueGrowth: 10, profitMargin: 30, volatility: 18, correlation: 0.75, momentum: 48, riskScore: 3, openInterest: 165 },
      { price: 135, volume: 6800, marketCap: 410, peRatio: 10, revenueGrowth: 5, profitMargin: 27, volatility: 24, correlation: 0.81, momentum: 28, riskScore: 3, openInterest: 150 },
      { price: 112, volume: 7200, marketCap: 340, peRatio: 8, revenueGrowth: 2, profitMargin: 25, volatility: 26, correlation: 0.83, momentum: 18, riskScore: 4, openInterest: 145 },
      { price: 105, volume: 6900, marketCap: 320, peRatio: 8, revenueGrowth: -1, profitMargin: 24, volatility: 25, correlation: 0.82, momentum: 15, riskScore: 4, openInterest: 140 },
      { price: 134, volume: 5800, marketCap: 405, peRatio: 10, revenueGrowth: 6, profitMargin: 27, volatility: 22, correlation: 0.85, momentum: 60, riskScore: 3, openInterest: 160 },
      { price: 130, volume: 5200, marketCap: 395, peRatio: 9, revenueGrowth: 8, profitMargin: 28, volatility: 18, correlation: 0.72, momentum: 46, riskScore: 3, openInterest: 155 },
      { price: 145, volume: 4800, marketCap: 440, peRatio: 10, revenueGrowth: 10, profitMargin: 29, volatility: 16, correlation: 0.68, momentum: 68, riskScore: 3, openInterest: 165 },
      { price: 145, volume: 4200, marketCap: 440, peRatio: 10, revenueGrowth: 12, profitMargin: 30, volatility: 15, correlation: 0.71, momentum: 50, riskScore: 2, openInterest: 160 },
      { price: 170, volume: 4700, marketCap: 500, peRatio: 11, revenueGrowth: 15, profitMargin: 32, volatility: 14, correlation: 0.65, momentum: 74, riskScore: 2, openInterest: 175 },
      { price: 200, volume: 5400, marketCap: 580, peRatio: 12, revenueGrowth: 12, profitMargin: 33, volatility: 16, correlation: 0.74, momentum: 80, riskScore: 2, openInterest: 185 },
      { price: 198, volume: 4900, marketCap: 575, peRatio: 11, revenueGrowth: 9, profitMargin: 32, volatility: 15, correlation: 0.76, momentum: 52, riskScore: 2, openInterest: 180 },
      { price: 208, volume: 4600, marketCap: 605, peRatio: 12, revenueGrowth: 10, profitMargin: 33, volatility: 13, correlation: 0.78, momentum: 64, riskScore: 2, openInterest: 185 },
      { price: 220, volume: 5000, marketCap: 640, peRatio: 13, revenueGrowth: 11, profitMargin: 34, volatility: 12, correlation: 0.77, momentum: 70, riskScore: 2, openInterest: 195 }
    ]
  },
  {
    symbol: 'GS',
    name: 'The Goldman Sachs Group',
    assetClass: 'Stock',
    sector: 'FINANCIALS',
    description: 'Goldman Sachs is a leading global investment banking, securities, and investment management firm. Heavy reliance on capital market cycles.',
    baseMetrics: {
      price: 450, volume: 3200, marketCap: 150, peRatio: 15, revenueGrowth: 18, profitMargin: 24, volatility: 18, correlation: 0.78, momentum: 70, riskScore: 4, openInterest: 120
    },
    timeseries: [
      { price: 210, volume: 3800, marketCap: 75, peRatio: 9, revenueGrowth: 8, profitMargin: 20, volatility: 29, correlation: 0.72, momentum: 45, riskScore: 4, openInterest: 80 },
      { price: 185, volume: 4800, marketCap: 65, peRatio: 8, revenueGrowth: -5, profitMargin: 15, volatility: 38, correlation: 0.80, momentum: 20, riskScore: 5, openInterest: 90 },
      { price: 200, volume: 4200, marketCap: 70, peRatio: 9, revenueGrowth: 2, profitMargin: 18, volatility: 32, correlation: 0.77, momentum: 38, riskScore: 4, openInterest: 85 },
      { price: 263, volume: 3900, marketCap: 92, peRatio: 12, revenueGrowth: 15, profitMargin: 22, volatility: 24, correlation: 0.75, momentum: 72, riskScore: 4, openInterest: 100 },
      { price: 327, volume: 3500, marketCap: 114, peRatio: 14, revenueGrowth: 28, profitMargin: 26, volatility: 22, correlation: 0.72, momentum: 80, riskScore: 4, openInterest: 110 },
      { price: 379, volume: 3200, marketCap: 132, peRatio: 16, revenueGrowth: 35, profitMargin: 27, volatility: 20, correlation: 0.74, momentum: 85, riskScore: 4, openInterest: 115 },
      { price: 385, volume: 2900, marketCap: 135, peRatio: 15, revenueGrowth: 24, profitMargin: 26, volatility: 18, correlation: 0.71, momentum: 58, riskScore: 4, openInterest: 110 },
      { price: 382, volume: 3100, marketCap: 134, peRatio: 15, revenueGrowth: 12, profitMargin: 23, volatility: 21, correlation: 0.77, momentum: 50, riskScore: 4, openInterest: 115 },
      { price: 330, volume: 3900, marketCap: 115, peRatio: 11, revenueGrowth: -8, profitMargin: 18, volatility: 26, correlation: 0.83, momentum: 24, riskScore: 5, openInterest: 105 },
      { price: 298, volume: 4100, marketCap: 104, peRatio: 9, revenueGrowth: -15, profitMargin: 14, volatility: 29, correlation: 0.85, momentum: 18, riskScore: 5, openInterest: 100 },
      { price: 293, volume: 3800, marketCap: 102, peRatio: 9, revenueGrowth: -19, profitMargin: 13, volatility: 28, correlation: 0.84, momentum: 15, riskScore: 5, openInterest: 98 },
      { price: 343, volume: 3400, marketCap: 120, peRatio: 11, revenueGrowth: -11, profitMargin: 16, volatility: 25, correlation: 0.86, momentum: 55, riskScore: 4, openInterest: 108 },
      { price: 320, volume: 3200, marketCap: 112, peRatio: 10, revenueGrowth: -5, profitMargin: 17, volatility: 22, correlation: 0.75, momentum: 42, riskScore: 4, openInterest: 104 },
      { price: 325, volume: 3000, marketCap: 113, peRatio: 10, revenueGrowth: 4, profitMargin: 19, volatility: 20, correlation: 0.70, momentum: 48, riskScore: 4, openInterest: 106 },
      { price: 322, volume: 2700, marketCap: 112, peRatio: 10, revenueGrowth: 6, profitMargin: 20, volatility: 18, correlation: 0.73, momentum: 46, riskScore: 4, openInterest: 102 },
      { price: 380, volume: 3100, marketCap: 131, peRatio: 13, revenueGrowth: 12, profitMargin: 22, volatility: 16, correlation: 0.68, momentum: 78, riskScore: 4, openInterest: 114 },
      { price: 415, volume: 3300, marketCap: 142, peRatio: 14, revenueGrowth: 15, profitMargin: 23, volatility: 20, correlation: 0.76, momentum: 82, riskScore: 4, openInterest: 120 },
      { price: 440, volume: 3000, marketCap: 149, peRatio: 15, revenueGrowth: 17, profitMargin: 24, volatility: 18, correlation: 0.77, momentum: 74, riskScore: 4, openInterest: 124 },
      { price: 465, volume: 2800, marketCap: 157, peRatio: 15, revenueGrowth: 20, profitMargin: 25, volatility: 15, correlation: 0.79, momentum: 78, riskScore: 4, openInterest: 128 },
      { price: 485, volume: 3100, marketCap: 163, peRatio: 16, revenueGrowth: 22, profitMargin: 26, volatility: 14, correlation: 0.78, momentum: 80, riskScore: 4, openInterest: 132 }
    ]
  },

  // HEALTHCARE STOCKS
  {
    symbol: 'LLY',
    name: 'Eli Lilly & Co.',
    assetClass: 'Stock',
    sector: 'HEALTHCARE',
    description: 'Eli Lilly is a pharmaceutical giant experiencing exponential growth due to its blockbuster weight-loss (Mounjaro) and diabetes drugs.',
    baseMetrics: {
      price: 820, volume: 4500, marketCap: 780, peRatio: 110, revenueGrowth: 35, profitMargin: 20, volatility: 22, correlation: 0.45, momentum: 88, riskScore: 5, openInterest: 400
    },
    timeseries: [
      { price: 140, volume: 2200, marketCap: 130, peRatio: 25, revenueGrowth: 8, profitMargin: 18, volatility: 20, correlation: 0.40, momentum: 45, riskScore: 3, openInterest: 90 },
      { price: 160, volume: 2500, marketCap: 150, peRatio: 28, revenueGrowth: 12, profitMargin: 19, volatility: 24, correlation: 0.44, momentum: 55, riskScore: 3, openInterest: 100 },
      { price: 150, volume: 2100, marketCap: 140, peRatio: 26, revenueGrowth: 6, profitMargin: 17, volatility: 22, correlation: 0.48, momentum: 38, riskScore: 3, openInterest: 95 },
      { price: 168, volume: 2400, marketCap: 158, peRatio: 30, revenueGrowth: 9, profitMargin: 18, volatility: 18, correlation: 0.45, momentum: 54, riskScore: 3, openInterest: 105 },
      { price: 185, volume: 2300, marketCap: 175, peRatio: 32, revenueGrowth: 14, profitMargin: 19, volatility: 17, correlation: 0.41, momentum: 58, riskScore: 3, openInterest: 110 },
      { price: 230, volume: 3000, marketCap: 218, peRatio: 38, revenueGrowth: 16, profitMargin: 20, volatility: 21, correlation: 0.42, momentum: 76, riskScore: 3, openInterest: 135 },
      { price: 231, volume: 2500, marketCap: 219, peRatio: 37, revenueGrowth: 15, profitMargin: 20, volatility: 18, correlation: 0.40, momentum: 52, riskScore: 3, openInterest: 130 },
      { price: 276, volume: 2900, marketCap: 262, peRatio: 45, revenueGrowth: 18, profitMargin: 21, volatility: 22, correlation: 0.44, momentum: 70, riskScore: 3, openInterest: 150 },
      { price: 285, volume: 2600, marketCap: 270, peRatio: 44, revenueGrowth: 20, profitMargin: 20, volatility: 25, correlation: 0.46, momentum: 54, riskScore: 3, openInterest: 155 },
      { price: 324, volume: 2800, marketCap: 308, peRatio: 50, revenueGrowth: 22, profitMargin: 21, volatility: 23, correlation: 0.48, momentum: 62, riskScore: 4, openInterest: 170 },
      { price: 322, volume: 2400, marketCap: 306, peRatio: 48, revenueGrowth: 19, profitMargin: 19, volatility: 22, correlation: 0.47, momentum: 48, riskScore: 4, openInterest: 165 },
      { price: 365, volume: 3100, marketCap: 346, peRatio: 55, revenueGrowth: 24, profitMargin: 21, volatility: 26, correlation: 0.49, momentum: 70, riskScore: 4, openInterest: 190 },
      { price: 343, volume: 2700, marketCap: 325, peRatio: 50, revenueGrowth: 20, profitMargin: 20, volatility: 21, correlation: 0.42, momentum: 40, riskScore: 4, openInterest: 180 },
      { price: 468, volume: 4500, marketCap: 445, peRatio: 72, revenueGrowth: 28, profitMargin: 21, volatility: 28, correlation: 0.38, momentum: 92, riskScore: 4, openInterest: 260 },
      { price: 538, volume: 4900, marketCap: 510, peRatio: 84, revenueGrowth: 32, profitMargin: 22, volatility: 25, correlation: 0.36, momentum: 88, riskScore: 4, openInterest: 290 },
      { price: 582, volume: 4200, marketCap: 552, peRatio: 82, revenueGrowth: 34, profitMargin: 21, volatility: 22, correlation: 0.35, momentum: 78, riskScore: 4, openInterest: 310 },
      { price: 780, volume: 5500, marketCap: 740, peRatio: 105, revenueGrowth: 36, profitMargin: 22, volatility: 24, correlation: 0.39, momentum: 95, riskScore: 5, openInterest: 380 },
      { price: 890, volume: 6000, marketCap: 845, peRatio: 118, revenueGrowth: 37, profitMargin: 23, volatility: 26, correlation: 0.42, momentum: 94, riskScore: 5, openInterest: 430 },
      { price: 885, volume: 5200, marketCap: 840, peRatio: 112, revenueGrowth: 35, profitMargin: 22, volatility: 23, correlation: 0.41, momentum: 65, riskScore: 5, openInterest: 420 },
      { price: 920, volume: 5600, marketCap: 874, peRatio: 115, revenueGrowth: 38, profitMargin: 24, volatility: 21, correlation: 0.43, momentum: 78, riskScore: 5, openInterest: 450 }
    ]
  },

  // ENERGY STOCKS
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corp.',
    assetClass: 'Stock',
    sector: 'ENERGY',
    description: 'Exxon Mobil is one of the world\'s largest oil and gas conglomerates. High sensitivity to crude oil prices and global demand.',
    baseMetrics: {
      price: 115, volume: 8000, marketCap: 460, peRatio: 12, revenueGrowth: 4, profitMargin: 12, volatility: 18, correlation: 0.52, momentum: 55, riskScore: 3, openInterest: 140
    },
    timeseries: [
      { price: 40, volume: 9000, marketCap: 170, peRatio: 15, revenueGrowth: -15, profitMargin: 5, volatility: 38, correlation: 0.48, momentum: 20, riskScore: 5, openInterest: 80 },
      { price: 34, volume: 12000, marketCap: 144, peRatio: 18, revenueGrowth: -28, profitMargin: -2, volatility: 42, correlation: 0.54, momentum: 12, riskScore: 6, openInterest: 90 },
      { price: 38, volume: 10000, marketCap: 161, peRatio: 16, revenueGrowth: -20, profitMargin: 1, volatility: 35, correlation: 0.52, momentum: 28, riskScore: 5, openInterest: 85 },
      { price: 41, volume: 8500, marketCap: 174, peRatio: 14, revenueGrowth: -12, profitMargin: 4, volatility: 30, correlation: 0.50, momentum: 35, riskScore: 5, openInterest: 90 },
      { price: 56, volume: 9200, marketCap: 237, peRatio: 15, revenueGrowth: 5, profitMargin: 8, volatility: 28, correlation: 0.45, momentum: 68, riskScore: 4, openInterest: 110 },
      { price: 63, volume: 8800, marketCap: 267, peRatio: 16, revenueGrowth: 18, profitMargin: 10, volatility: 25, correlation: 0.42, momentum: 70, riskScore: 4, openInterest: 120 },
      { price: 58, volume: 7600, marketCap: 246, peRatio: 14, revenueGrowth: 14, profitMargin: 9, volatility: 24, correlation: 0.46, momentum: 42, riskScore: 4, openInterest: 115 },
      { price: 61, volume: 8200, marketCap: 258, peRatio: 13, revenueGrowth: 22, profitMargin: 11, volatility: 26, correlation: 0.48, momentum: 50, riskScore: 4, openInterest: 120 },
      { price: 82, volume: 9500, marketCap: 348, peRatio: 15, revenueGrowth: 38, profitMargin: 14, volatility: 28, correlation: 0.49, momentum: 85, riskScore: 3, openInterest: 145 },
      { price: 86, volume: 11000, marketCap: 365, peRatio: 14, revenueGrowth: 45, profitMargin: 15, volatility: 30, correlation: 0.53, momentum: 78, riskScore: 3, openInterest: 150 },
      { price: 88, volume: 10500, marketCap: 373, peRatio: 12, revenueGrowth: 40, profitMargin: 14, volatility: 29, correlation: 0.51, momentum: 60, riskScore: 3, openInterest: 148 },
      { price: 109, volume: 12000, marketCap: 462, peRatio: 10, revenueGrowth: 48, profitMargin: 16, volatility: 32, correlation: 0.55, momentum: 88, riskScore: 3, openInterest: 180 },
      { price: 110, volume: 9000, marketCap: 466, peRatio: 11, revenueGrowth: 12, profitMargin: 13, volatility: 22, correlation: 0.46, momentum: 55, riskScore: 3, openInterest: 165 },
      { price: 115, volume: 8400, marketCap: 488, peRatio: 12, revenueGrowth: -2, profitMargin: 12, volatility: 20, correlation: 0.42, momentum: 58, riskScore: 3, openInterest: 160 },
      { price: 105, volume: 7200, marketCap: 445, peRatio: 11, revenueGrowth: -8, profitMargin: 11, volatility: 19, correlation: 0.45, momentum: 38, riskScore: 3, openInterest: 150 },
      { price: 100, volume: 7800, marketCap: 424, peRatio: 10, revenueGrowth: -10, profitMargin: 11, volatility: 18, correlation: 0.48, momentum: 32, riskScore: 3, openInterest: 142 },
      { price: 116, volume: 8500, marketCap: 490, peRatio: 12, revenueGrowth: 2, profitMargin: 12, volatility: 19, correlation: 0.44, momentum: 72, riskScore: 3, openInterest: 155 },
      { price: 120, volume: 8200, marketCap: 508, peRatio: 13, revenueGrowth: 5, profitMargin: 12, volatility: 17, correlation: 0.42, momentum: 65, riskScore: 3, openInterest: 158 },
      { price: 114, volume: 7500, marketCap: 482, peRatio: 12, revenueGrowth: 1, profitMargin: 11, volatility: 18, correlation: 0.45, momentum: 42, riskScore: 3, openInterest: 150 },
      { price: 118, volume: 7900, marketCap: 499, peRatio: 12, revenueGrowth: 3, profitMargin: 12, volatility: 16, correlation: 0.47, momentum: 52, riskScore: 3, openInterest: 154 }
    ]
  },

  // CRYPTOCURRENCY
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    assetClass: 'Crypto',
    sector: 'CRYPTOCURRENCY',
    description: 'The first decentralized digital currency. Acts as digital gold and dictates the direction of the wider cryptocurrency market.',
    baseMetrics: {
      price: 65000, volume: 28000, marketCap: 1280, peRatio: 0, revenueGrowth: 85, profitMargin: 0, volatility: 45, correlation: 0.65, momentum: 76, riskScore: 6, openInterest: 4500
    },
    timeseries: [
      { price: 7200, volume: 15000, marketCap: 130, peRatio: 0, revenueGrowth: 15, profitMargin: 0, volatility: 60, correlation: 0.50, momentum: 35, riskScore: 7, openInterest: 1100 },
      { price: 9100, volume: 18000, marketCap: 167, peRatio: 0, revenueGrowth: 25, profitMargin: 0, volatility: 65, correlation: 0.55, momentum: 58, riskScore: 7, openInterest: 1350 },
      { price: 10800, volume: 16000, marketCap: 198, peRatio: 0, revenueGrowth: 32, profitMargin: 0, volatility: 55, correlation: 0.60, momentum: 62, riskScore: 7, openInterest: 1500 },
      { price: 29000, volume: 38000, marketCap: 540, peRatio: 0, revenueGrowth: 150, profitMargin: 0, volatility: 78, correlation: 0.62, momentum: 98, riskScore: 8, openInterest: 2600 },
      { price: 58700, volume: 45000, marketCap: 1100, peRatio: 0, revenueGrowth: 280, profitMargin: 0, volatility: 82, correlation: 0.58, momentum: 94, riskScore: 8, openInterest: 3800 },
      { price: 35000, volume: 40000, marketCap: 650, peRatio: 0, revenueGrowth: 180, profitMargin: 0, volatility: 90, correlation: 0.64, momentum: 22, riskScore: 9, openInterest: 2900 },
      { price: 43800, volume: 32000, marketCap: 820, peRatio: 0, revenueGrowth: 150, profitMargin: 0, volatility: 75, correlation: 0.60, momentum: 68, riskScore: 8, openInterest: 3100 },
      { price: 46200, volume: 35000, marketCap: 870, peRatio: 0, revenueGrowth: 120, profitMargin: 0, volatility: 70, correlation: 0.62, momentum: 55, riskScore: 8, openInterest: 3300 },
      { price: 45500, volume: 29000, marketCap: 860, peRatio: 0, revenueGrowth: 90, profitMargin: 0, volatility: 68, correlation: 0.66, momentum: 48, riskScore: 8, openInterest: 3200 },
      { price: 19800, volume: 36000, marketCap: 380, peRatio: 0, revenueGrowth: -25, profitMargin: 0, volatility: 75, correlation: 0.72, momentum: 15, riskScore: 9, openInterest: 2400 },
      { price: 19400, volume: 31000, marketCap: 370, peRatio: 0, revenueGrowth: -30, profitMargin: 0, volatility: 72, correlation: 0.70, momentum: 12, riskScore: 9, openInterest: 2200 },
      { price: 16500, volume: 33000, marketCap: 318, peRatio: 0, revenueGrowth: -45, profitMargin: 0, volatility: 80, correlation: 0.74, momentum: 8, riskScore: 9, openInterest: 2000 },
      { price: 28500, volume: 22000, marketCap: 550, peRatio: 0, revenueGrowth: -15, profitMargin: 0, volatility: 52, correlation: 0.58, momentum: 82, riskScore: 8, openInterest: 2800 },
      { price: 30400, volume: 24000, marketCap: 590, peRatio: 0, revenueGrowth: 5, profitMargin: 0, volatility: 48, correlation: 0.54, momentum: 70, riskScore: 7, openInterest: 3000 },
      { price: 26900, volume: 18000, marketCap: 520, peRatio: 0, revenueGrowth: 2, profitMargin: 0, volatility: 44, correlation: 0.59, momentum: 42, riskScore: 7, openInterest: 2850 },
      { price: 42200, volume: 26000, marketCap: 820, peRatio: 0, revenueGrowth: 40, profitMargin: 0, volatility: 49, correlation: 0.52, momentum: 88, riskScore: 7, openInterest: 3600 },
      { price: 71200, volume: 38000, marketCap: 1400, peRatio: 0, revenueGrowth: 95, profitMargin: 0, volatility: 55, correlation: 0.56, momentum: 96, riskScore: 7, openInterest: 4800 },
      { price: 62700, volume: 32000, marketCap: 1230, peRatio: 0, revenueGrowth: 80, profitMargin: 0, volatility: 52, correlation: 0.59, momentum: 45, riskScore: 7, openInterest: 4400 },
      { price: 63300, volume: 26000, marketCap: 1245, peRatio: 0, revenueGrowth: 78, profitMargin: 0, volatility: 48, correlation: 0.61, momentum: 52, riskScore: 7, openInterest: 4300 },
      { price: 68500, volume: 29000, marketCap: 1350, peRatio: 0, revenueGrowth: 84, profitMargin: 0, volatility: 44, correlation: 0.60, momentum: 72, riskScore: 6, openInterest: 4600 }
    ]
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    assetClass: 'Crypto',
    sector: 'CRYPTOCURRENCY',
    description: 'A decentralized smart contract platform. The primary engine of Decentralized Finance (DeFi) and NFTs.',
    baseMetrics: {
      price: 3500, volume: 16000, marketCap: 420, peRatio: 0, revenueGrowth: 75, profitMargin: 0, volatility: 52, correlation: 0.72, momentum: 72, riskScore: 7, openInterest: 2800
    },
    timeseries: [
      { price: 130, volume: 6000, marketCap: 14, peRatio: 0, revenueGrowth: 8, profitMargin: 0, volatility: 72, correlation: 0.58, momentum: 30, riskScore: 8, openInterest: 400 },
      { price: 220, volume: 7500, marketCap: 24, peRatio: 0, revenueGrowth: 20, profitMargin: 0, volatility: 78, correlation: 0.62, momentum: 62, riskScore: 8, openInterest: 580 },
      { price: 350, volume: 8000, marketCap: 39, peRatio: 0, revenueGrowth: 45, profitMargin: 0, volatility: 68, correlation: 0.65, momentum: 74, riskScore: 8, openInterest: 750 },
      { price: 740, volume: 14000, marketCap: 84, peRatio: 0, revenueGrowth: 110, profitMargin: 0, volatility: 80, correlation: 0.68, momentum: 94, riskScore: 9, openInterest: 1200 },
      { price: 1900, volume: 22000, marketCap: 218, peRatio: 0, revenueGrowth: 240, profitMargin: 0, volatility: 88, correlation: 0.64, momentum: 92, riskScore: 9, openInterest: 2100 },
      { price: 2100, volume: 25000, marketCap: 242, peRatio: 0, revenueGrowth: 220, profitMargin: 0, volatility: 95, correlation: 0.69, momentum: 55, riskScore: 9, openInterest: 2300 },
      { price: 3000, volume: 21000, marketCap: 350, peRatio: 0, revenueGrowth: 190, profitMargin: 0, volatility: 84, correlation: 0.66, momentum: 78, riskScore: 9, openInterest: 2500 },
      { price: 3600, volume: 24000, marketCap: 420, peRatio: 0, revenueGrowth: 160, profitMargin: 0, volatility: 80, correlation: 0.68, momentum: 68, riskScore: 9, openInterest: 2800 },
      { price: 3200, volume: 18000, marketCap: 380, peRatio: 0, revenueGrowth: 110, profitMargin: 0, volatility: 78, correlation: 0.70, momentum: 45, riskScore: 9, openInterest: 2600 },
      { price: 1100, volume: 22000, marketCap: 130, peRatio: 0, revenueGrowth: -15, profitMargin: 0, volatility: 88, correlation: 0.78, momentum: 18, riskScore: 9, openInterest: 1800 },
      { price: 1300, volume: 19000, marketCap: 155, peRatio: 0, revenueGrowth: -22, profitMargin: 0, volatility: 85, correlation: 0.75, momentum: 28, riskScore: 9, openInterest: 1900 },
      { price: 1200, volume: 21000, marketCap: 144, peRatio: 0, revenueGrowth: -38, profitMargin: 0, volatility: 92, correlation: 0.79, momentum: 12, riskScore: 9, openInterest: 1750 },
      { price: 1800, volume: 13000, marketCap: 216, peRatio: 0, revenueGrowth: -18, profitMargin: 0, volatility: 60, correlation: 0.63, momentum: 80, riskScore: 8, openInterest: 2100 },
      { price: 1900, volume: 14500, marketCap: 228, peRatio: 0, revenueGrowth: 2, profitMargin: 0, volatility: 56, correlation: 0.58, momentum: 68, riskScore: 8, openInterest: 2200 },
      { price: 16500, volume: 11000, marketCap: 198, peRatio: 0, revenueGrowth: 5, profitMargin: 0, volatility: 52, correlation: 0.64, momentum: 38, riskScore: 8, openInterest: 2000 }, // Typo fix - Ethereum price shouldn't jump to 16500 here, let's make it 1650
      { price: 1650, volume: 11000, marketCap: 198, peRatio: 0, revenueGrowth: 5, profitMargin: 0, volatility: 52, correlation: 0.64, momentum: 38, riskScore: 8, openInterest: 2000 },
      { price: 2300, volume: 15000, marketCap: 276, peRatio: 0, revenueGrowth: 25, profitMargin: 0, volatility: 58, correlation: 0.58, momentum: 82, riskScore: 8, openInterest: 2400 },
      { price: 3500, volume: 21000, marketCap: 420, peRatio: 0, revenueGrowth: 78, profitMargin: 0, volatility: 62, correlation: 0.61, momentum: 94, riskScore: 7, openInterest: 3200 },
      { price: 3400, volume: 17000, marketCap: 410, peRatio: 0, revenueGrowth: 72, profitMargin: 0, volatility: 58, correlation: 0.64, momentum: 48, riskScore: 7, openInterest: 3000 },
      { price: 2700, volume: 15000, marketCap: 325, peRatio: 0, revenueGrowth: 68, profitMargin: 0, volatility: 55, correlation: 0.66, momentum: 35, riskScore: 7, openInterest: 2750 },
      { price: 3300, volume: 16500, marketCap: 398, peRatio: 0, revenueGrowth: 74, profitMargin: 0, volatility: 51, correlation: 0.65, momentum: 68, riskScore: 7, openInterest: 2950 }
    ]
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    assetClass: 'Crypto',
    sector: 'CRYPTOCURRENCY',
    description: 'A high-performance blockchain supporting fast transactions and low fees. Known for its volatile cycles and strong community.',
    baseMetrics: {
      price: 150, volume: 3800, marketCap: 68, peRatio: 0, revenueGrowth: 110, profitMargin: 0, volatility: 68, correlation: 0.59, momentum: 80, riskScore: 8, openInterest: 850
    },
    timeseries: [
      { price: 0.8, volume: 50, marketCap: 0.1, peRatio: 0, revenueGrowth: 5, profitMargin: 0, volatility: 95, correlation: 0.35, momentum: 28, riskScore: 9, openInterest: 5 },
      { price: 2.1, volume: 120, marketCap: 0.3, peRatio: 0, revenueGrowth: 40, profitMargin: 0, volatility: 110, correlation: 0.42, momentum: 65, riskScore: 9, openInterest: 15 },
      { price: 3.2, volume: 180, marketCap: 0.5, peRatio: 0, revenueGrowth: 65, profitMargin: 0, volatility: 98, correlation: 0.44, momentum: 58, riskScore: 9, openInterest: 20 },
      { price: 1.8, volume: 150, marketCap: 0.3, peRatio: 0, revenueGrowth: 42, profitMargin: 0, volatility: 105, correlation: 0.48, momentum: 22, riskScore: 9, openInterest: 18 },
      { price: 19, volume: 900, marketCap: 4.8, peRatio: 0, revenueGrowth: 800, profitMargin: 0, volatility: 130, correlation: 0.52, momentum: 96, riskScore: 9, openInterest: 150 },
      { price: 35, volume: 1400, marketCap: 9.8, peRatio: 0, revenueGrowth: 950, profitMargin: 0, volatility: 145, correlation: 0.58, momentum: 78, riskScore: 9, openInterest: 280 },
      { price: 140, volume: 3800, marketCap: 42, peRatio: 0, revenueGrowth: 1400, profitMargin: 0, volatility: 120, correlation: 0.62, momentum: 98, riskScore: 9, openInterest: 750 },
      { price: 170, volume: 4200, marketCap: 51, peRatio: 0, revenueGrowth: 1200, profitMargin: 0, volatility: 110, correlation: 0.65, momentum: 85, riskScore: 9, openInterest: 890 },
      { price: 102, volume: 2900, marketCap: 31, peRatio: 0, revenueGrowth: 600, profitMargin: 0, volatility: 115, correlation: 0.68, momentum: 38, riskScore: 9, openInterest: 720 },
      { price: 32, volume: 3500, marketCap: 10, peRatio: 0, revenueGrowth: 150, profitMargin: 0, volatility: 125, correlation: 0.72, momentum: 18, riskScore: 9, openInterest: 510 },
      { price: 13, volume: 4100, marketCap: 4, peRatio: 0, revenueGrowth: 45, profitMargin: 0, volatility: 140, correlation: 0.78, momentum: 10, riskScore: 10, openInterest: 380 },
      { price: 9.8, volume: 4500, marketCap: 3, peRatio: 0, revenueGrowth: -15, profitMargin: 0, volatility: 160, correlation: 0.81, momentum: 6, riskScore: 10, openInterest: 320 },
      { price: 21, volume: 1800, marketCap: 7.8, peRatio: 0, revenueGrowth: 5, profitMargin: 0, volatility: 95, correlation: 0.64, momentum: 75, riskScore: 9, openInterest: 480 },
      { price: 18, volume: 1500, marketCap: 6.9, peRatio: 0, revenueGrowth: 8, profitMargin: 0, volatility: 88, correlation: 0.60, momentum: 42, riskScore: 9, openInterest: 440 },
      { price: 22, volume: 1200, marketCap: 8.5, peRatio: 0, revenueGrowth: 25, profitMargin: 0, volatility: 78, correlation: 0.63, momentum: 54, riskScore: 9, openInterest: 490 },
      { price: 75, volume: 2900, marketCap: 31, peRatio: 0, revenueGrowth: 110, profitMargin: 0, volatility: 84, correlation: 0.58, momentum: 94, riskScore: 9, openInterest: 680 },
      { price: 180, volume: 5500, marketCap: 78, peRatio: 0, revenueGrowth: 240, profitMargin: 0, volatility: 88, correlation: 0.54, momentum: 97, riskScore: 9, openInterest: 1100 },
      { price: 142, volume: 3400, marketCap: 64, peRatio: 0, revenueGrowth: 180, profitMargin: 0, volatility: 76, correlation: 0.59, momentum: 46, riskScore: 9, openInterest: 940 },
      { price: 155, volume: 2900, marketCap: 71, peRatio: 0, revenueGrowth: 150, profitMargin: 0, volatility: 70, correlation: 0.61, momentum: 55, riskScore: 8, openInterest: 980 },
      { price: 190, volume: 3800, marketCap: 88, peRatio: 0, revenueGrowth: 165, profitMargin: 0, volatility: 64, correlation: 0.60, momentum: 78, riskScore: 8, openInterest: 1150 }
    ]
  }
];

export const TEMPLATES = [
  {
    id: 'stock-market',
    name: 'Stock Market Universe',
    description: 'A structural universe focused on valuation and growth metrics of major stocks.',
    dimensions: { x: 'peRatio', y: 'revenueGrowth', z: 'marketCap' },
    mappings: { color: 'sector', size: 'marketCap', opacity: 'riskScore' },
    physics: {
      mass: 'marketCap',
      velocity: 'momentum',
      force: 'volume',
      gravity: 'correlation',
      friction: 'riskScore',
      entropy: 'volatility',
      equilibrium: 'peRatio'
    },
    formulas: {
      mass: 'marketCap',
      velocity: 'momentum * 0.1',
      force: 'volume / 1000',
      gravity: 'correlation * 2.0',
      friction: '0.1 + riskScore * 0.05',
      entropy: 'volatility / 100',
      equilibrium: '30' // Standard PE equilibrium target
    }
  },
  {
    id: 'crypto-universe',
    name: 'Crypto Universe',
    description: 'A high-energy, volatility-driven universe featuring digital assets.',
    dimensions: { x: 'volatility', y: 'volume', z: 'price' },
    mappings: { color: 'sector', size: 'openInterest', opacity: 'riskScore' },
    physics: {
      mass: 'openInterest',
      velocity: 'momentum',
      force: 'volume',
      gravity: 'correlation',
      friction: 'volatility',
      entropy: 'volatility',
      equilibrium: 'momentum'
    },
    formulas: {
      mass: 'openInterest / 10',
      velocity: 'momentum * 0.15',
      force: 'volume / 500',
      gravity: 'correlation * 3.0',
      friction: 'volatility * 0.005',
      entropy: 'volatility / 50',
      equilibrium: '50'
    }
  },
  {
    id: 'portfolio-universe',
    name: 'Portfolio Risk Universe',
    description: 'Evaluate asset correlation, volatility, and risk exposure in a unified space.',
    dimensions: { x: 'correlation', y: 'volatility', z: 'riskScore' },
    mappings: { color: 'assetClass', size: 'marketCap', opacity: 'momentum' },
    physics: {
      mass: 'marketCap',
      velocity: 'momentum',
      force: 'volume',
      gravity: 'correlation',
      friction: 'riskScore',
      entropy: 'volatility',
      equilibrium: 'riskScore'
    },
    formulas: {
      mass: 'marketCap',
      velocity: 'momentum * 0.08',
      force: 'volume / 1000',
      gravity: 'correlation * 1.5',
      friction: 'riskScore * 0.1',
      entropy: 'volatility / 80',
      equilibrium: '5'
    }
  },
  {
    id: 'sector-analysis',
    name: 'Sector Correlation Universe',
    description: 'Group assets by industry and study how momentum aligns with sector correlations.',
    dimensions: { x: 'correlation', y: 'momentum', z: 'peRatio' },
    mappings: { color: 'sector', size: 'marketCap', opacity: 'revenueGrowth' },
    physics: {
      mass: 'marketCap',
      velocity: 'momentum',
      force: 'volume',
      gravity: 'correlation',
      friction: 'riskScore',
      entropy: 'volatility',
      equilibrium: 'correlation'
    },
    formulas: {
      mass: 'marketCap',
      velocity: 'momentum * 0.1',
      force: 'volume / 800',
      gravity: 'correlation * 2.5',
      friction: 'riskScore * 0.08',
      entropy: 'volatility / 100',
      equilibrium: '0.7'
    }
  },
  {
    id: 'market-correlation',
    name: 'Market Momentum Universe',
    description: 'Explore the relationship between pricing momentum, volume force, and risk indicators.',
    dimensions: { x: 'momentum', y: 'volume', z: 'riskScore' },
    mappings: { color: 'assetClass', size: 'marketCap', opacity: 'volatility' },
    physics: {
      mass: 'marketCap',
      velocity: 'momentum',
      force: 'volume',
      gravity: 'correlation',
      friction: 'riskScore',
      entropy: 'volatility',
      equilibrium: 'momentum'
    },
    formulas: {
      mass: 'marketCap',
      velocity: 'momentum * 0.12',
      force: 'volume / 1200',
      gravity: 'correlation * 1.8',
      friction: 'riskScore * 0.06',
      entropy: 'volatility / 90',
      equilibrium: '70'
    }
  }
];
