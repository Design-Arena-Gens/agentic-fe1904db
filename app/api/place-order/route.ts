import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey, symbol, optionType, strikePrice, expiryDate, quantity, orderType, price, stopLoss, takeProfit, action } = body

    // Simulated order placement for demonstration
    // In production, this would integrate with actual Dhan API
    const orderId = `ORD${Date.now()}`

    // Store order with SL/TP for monitoring
    // In production, you would save this to a database
    const orderData = {
      orderId,
      symbol,
      optionType,
      strikePrice,
      expiryDate,
      quantity,
      orderType,
      price,
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      action,
      status: 'PLACED',
      timestamp: new Date().toISOString()
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order placed successfully',
      orderData
    })
  } catch (error) {
    console.error('Error placing order:', error)
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    )
  }
}
