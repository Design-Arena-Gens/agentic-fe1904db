import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey, positionId } = body

    // Simulated position closure
    // In production, this would place a square-off order with Dhan API
    await new Promise(resolve => setTimeout(resolve, 800))

    return NextResponse.json({
      success: true,
      message: 'Position closed successfully',
      positionId,
      closureTime: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error closing position:', error)
    return NextResponse.json(
      { error: 'Failed to close position' },
      { status: 500 }
    )
  }
}
