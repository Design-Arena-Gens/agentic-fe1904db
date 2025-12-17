import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Simulated active positions
    const positions = [
      {
        id: `POS${Date.now()}_1`,
        symbol: 'NIFTY',
        optionType: 'CALL' as const,
        strikePrice: 19500,
        quantity: 50,
        avgPrice: 125.50,
        currentPrice: 138.75,
        pnl: (138.75 - 125.50) * 50,
        pnlPercent: ((138.75 - 125.50) / 125.50) * 100,
        stopLoss: 110.00,
        takeProfit: 155.00,
        action: 'BUY' as const
      },
      {
        id: `POS${Date.now()}_2`,
        symbol: 'RELIANCE',
        optionType: 'CALL' as const,
        strikePrice: 2500,
        quantity: 75,
        avgPrice: 45.80,
        currentPrice: 52.30,
        pnl: (52.30 - 45.80) * 75,
        pnlPercent: ((52.30 - 45.80) / 45.80) * 100,
        stopLoss: 38.00,
        takeProfit: 62.00,
        action: 'BUY' as const
      },
      {
        id: `POS${Date.now()}_3`,
        symbol: 'BANKNIFTY',
        optionType: 'PUT' as const,
        strikePrice: 44000,
        quantity: 25,
        avgPrice: 180.25,
        currentPrice: 168.50,
        pnl: (180.25 - 168.50) * 25,
        pnlPercent: ((180.25 - 168.50) / 180.25) * 100,
        stopLoss: 195.00,
        takeProfit: 155.00,
        action: 'SELL' as const
      }
    ]

    return NextResponse.json({ positions })
  } catch (error) {
    console.error('Error fetching positions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch positions' },
      { status: 500 }
    )
  }
}
