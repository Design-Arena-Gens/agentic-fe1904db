import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Simulated hourly signals based on technical analysis
    const signals = [
      {
        id: `SIG${Date.now()}_1`,
        symbol: 'NIFTY',
        optionType: 'CALL' as const,
        strikePrice: 19500,
        signal: 'BUY' as const,
        currentPrice: 125.50,
        targetPrice: 145.00,
        stopLoss: 110.00,
        confidence: 78,
        timestamp: new Date().toISOString(),
        reason: 'Strong bullish momentum with RSI at 62. Price breaking above 20-EMA with increasing volume. MACD showing positive crossover.'
      },
      {
        id: `SIG${Date.now()}_2`,
        symbol: 'BANKNIFTY',
        optionType: 'PUT' as const,
        strikePrice: 44000,
        signal: 'SELL' as const,
        currentPrice: 180.25,
        targetPrice: 155.00,
        stopLoss: 195.00,
        confidence: 72,
        timestamp: new Date().toISOString(),
        reason: 'Bearish divergence on 1H chart. Price facing resistance at key level. OI data shows PUT writing at higher strikes.'
      },
      {
        id: `SIG${Date.now()}_3`,
        symbol: 'RELIANCE',
        optionType: 'CALL' as const,
        strikePrice: 2500,
        signal: 'BUY' as const,
        currentPrice: 45.80,
        targetPrice: 58.00,
        stopLoss: 38.00,
        confidence: 85,
        timestamp: new Date().toISOString(),
        reason: 'Breakout from consolidation phase. Strong institutional buying. Positive news on refining margins. Volume surge detected.'
      },
      {
        id: `SIG${Date.now()}_4`,
        symbol: 'TCS',
        optionType: 'CALL' as const,
        strikePrice: 3800,
        signal: 'BUY' as const,
        currentPrice: 92.50,
        targetPrice: 108.00,
        stopLoss: 82.00,
        confidence: 68,
        timestamp: new Date().toISOString(),
        reason: 'IT sector showing strength. TCS results expected to be positive. Technical pattern suggests upward movement.'
      },
      {
        id: `SIG${Date.now()}_5`,
        symbol: 'HDFCBANK',
        optionType: 'PUT' as const,
        strikePrice: 1650,
        signal: 'SELL' as const,
        currentPrice: 38.90,
        targetPrice: 28.00,
        stopLoss: 45.00,
        confidence: 64,
        timestamp: new Date().toISOString(),
        reason: 'Profit booking expected after recent rally. Overbought on hourly timeframe. Resistance at 1680 level.'
      },
      {
        id: `SIG${Date.now()}_6`,
        symbol: 'INFY',
        optionType: 'CALL' as const,
        strikePrice: 1450,
        signal: 'BUY' as const,
        currentPrice: 28.75,
        targetPrice: 36.50,
        stopLoss: 23.00,
        confidence: 76,
        timestamp: new Date().toISOString(),
        reason: 'Strong support at 1420. Positive order book trends. Technical indicators showing bullish momentum building up.'
      }
    ]

    return NextResponse.json({ signals })
  } catch (error) {
    console.error('Error fetching signals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch signals' },
      { status: 500 }
    )
  }
}
