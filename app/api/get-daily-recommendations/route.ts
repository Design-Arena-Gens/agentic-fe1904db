import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Simulated daily recommendations with comprehensive analysis
    const recommendations = [
      {
        id: `REC${Date.now()}_1`,
        symbol: 'NIFTY',
        action: 'BUY' as const,
        optionType: 'CALL' as const,
        strikePrice: 19600,
        expiryDate: '2025-01-30',
        entryPrice: 135.50,
        targetPrice: 165.00,
        stopLoss: 115.00,
        riskRewardRatio: '1:1.5',
        reasoning: 'Nifty showing strong bullish momentum with global cues turning positive. FII buying resumed after two weeks. Technical setup looks favorable with support at 19450. Option chain analysis shows significant CALL writing at 19800, suggesting potential move towards that level. Expected volatility contraction after recent spike.',
        technicalIndicators: {
          rsi: 58,
          macd: 'Bullish',
          trend: 'Uptrend'
        },
        rating: 5
      },
      {
        id: `REC${Date.now()}_2`,
        symbol: 'BANKNIFTY',
        action: 'BUY' as const,
        optionType: 'CALL' as const,
        strikePrice: 44500,
        expiryDate: '2025-01-23',
        entryPrice: 210.00,
        targetPrice: 265.00,
        stopLoss: 175.00,
        riskRewardRatio: '1:1.6',
        reasoning: 'Bank Nifty at crucial support zone. RBI policy expectations driving sentiment. PSU banks showing strength. PCR ratio at 1.15 indicating bullish sentiment. Historical pattern suggests strong move after consolidation at current levels.',
        technicalIndicators: {
          rsi: 52,
          macd: 'Neutral to Bullish',
          trend: 'Sideways to Up'
        },
        rating: 4
      },
      {
        id: `REC${Date.now()}_3`,
        symbol: 'RELIANCE',
        action: 'BUY' as const,
        optionType: 'CALL' as const,
        strikePrice: 2520,
        expiryDate: '2025-01-30',
        entryPrice: 48.50,
        targetPrice: 68.00,
        stopLoss: 37.00,
        riskRewardRatio: '1:1.7',
        reasoning: 'Reliance breaking out of multi-week consolidation. Refining margins improving globally. Jio user additions exceeding expectations. Institutional holdings increased. Chart pattern showing cup and handle formation with breakout imminent.',
        technicalIndicators: {
          rsi: 64,
          macd: 'Strong Buy',
          trend: 'Strong Uptrend'
        },
        rating: 5
      },
      {
        id: `REC${Date.now()}_4`,
        symbol: 'TATASTEEL',
        action: 'SELL' as const,
        optionType: 'PUT' as const,
        strikePrice: 140,
        expiryDate: '2025-01-23',
        entryPrice: 5.80,
        targetPrice: 9.50,
        stopLoss: 3.80,
        riskRewardRatio: '1:1.8',
        reasoning: 'Steel sector facing headwinds from Chinese oversupply. Tata Steel showing weakness on charts. Breaking below key support at 142. OI data suggests PUT accumulation. Global steel prices under pressure.',
        technicalIndicators: {
          rsi: 38,
          macd: 'Bearish',
          trend: 'Downtrend'
        },
        rating: 4
      },
      {
        id: `REC${Date.now()}_5`,
        symbol: 'ICICIBANK',
        action: 'BUY' as const,
        optionType: 'CALL' as const,
        strikePrice: 1140,
        expiryDate: '2025-02-06',
        entryPrice: 32.25,
        targetPrice: 46.00,
        stopLoss: 24.00,
        riskRewardRatio: '1:1.7',
        reasoning: 'ICICI Bank leading private sector banking strength. Loan growth robust, asset quality improving. Results expected to beat estimates. Technical breakout above 1125 with strong volume. PCR favorable at 1.3.',
        technicalIndicators: {
          rsi: 61,
          macd: 'Bullish Crossover',
          trend: 'Uptrend'
        },
        rating: 5
      },
      {
        id: `REC${Date.now()}_6`,
        symbol: 'INFY',
        action: 'BUY' as const,
        optionType: 'CALL' as const,
        strikePrice: 1460,
        expiryDate: '2025-01-30',
        entryPrice: 31.50,
        targetPrice: 44.00,
        stopLoss: 24.00,
        riskRewardRatio: '1:1.7',
        reasoning: 'IT sector seeing revival after correction. Infosys deal wins improving. Dollar strength helping margins. Technical setup showing higher lows formation. Volume profile suggests accumulation.',
        technicalIndicators: {
          rsi: 55,
          macd: 'Turning Bullish',
          trend: 'Reversal Pattern'
        },
        rating: 4
      }
    ]

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
}
