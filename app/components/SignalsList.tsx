'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react'

interface Signal {
  id: string
  symbol: string
  optionType: 'CALL' | 'PUT'
  strikePrice: number
  signal: 'BUY' | 'SELL'
  currentPrice: number
  targetPrice: number
  stopLoss: number
  confidence: number
  timestamp: string
  reason: string
}

interface SignalsListProps {
  apiKey: string
}

export default function SignalsList({ apiKey }: SignalsListProps) {
  const [signals, setSignals] = useState<Signal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchSignals = async () => {
    try {
      const response = await fetch('/api/get-signals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey })
      })
      const data = await response.json()
      if (response.ok) {
        setSignals(data.signals)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Error fetching signals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSignals()
    const interval = setInterval(fetchSignals, 3600000) // Update every hour
    return () => clearInterval(interval)
  }, [apiKey])

  if (isLoading) {
    return (
      <div className="card text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading signals...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Hourly Trading Signals</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={16} />
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
        <button
          onClick={fetchSignals}
          className="btn btn-primary mb-4"
        >
          Refresh Signals
        </button>
      </div>

      {signals.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400">No signals available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {signals.map((signal) => (
            <div key={signal.id} className="card hover:border-blue-500 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{signal.symbol}</h3>
                  <p className="text-sm text-gray-400">
                    {signal.optionType} @ ₹{signal.strikePrice}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    signal.signal === 'BUY'
                      ? 'bg-green-900/50 text-green-300'
                      : 'bg-red-900/50 text-red-300'
                  }`}
                >
                  {signal.signal === 'BUY' ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {signal.signal}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Price</p>
                  <p className="text-lg font-semibold">₹{signal.currentPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Target</p>
                  <p className="text-lg font-semibold text-green-400">₹{signal.targetPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stop Loss</p>
                  <p className="text-lg font-semibold text-red-400">₹{signal.stopLoss}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">Confidence</span>
                  <span className="font-semibold">{signal.confidence}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${signal.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-3">
                <p className="text-sm text-gray-400">{signal.reason}</p>
              </div>

              <div className="text-xs text-gray-500 mt-3">
                {new Date(signal.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
