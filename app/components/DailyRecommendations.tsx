'use client'

import { useState, useEffect } from 'react'
import { Star, TrendingUp, TrendingDown, Target, Shield } from 'lucide-react'

interface Recommendation {
  id: string
  symbol: string
  action: 'BUY' | 'SELL'
  optionType: 'CALL' | 'PUT'
  strikePrice: number
  expiryDate: string
  entryPrice: number
  targetPrice: number
  stopLoss: number
  riskRewardRatio: string
  reasoning: string
  technicalIndicators: {
    rsi: number
    macd: string
    trend: string
  }
  rating: number
}

interface DailyRecommendationsProps {
  apiKey: string
}

export default function DailyRecommendations({ apiKey }: DailyRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL')

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/get-daily-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey })
        })
        const data = await response.json()
        if (response.ok) {
          setRecommendations(data.recommendations)
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [apiKey])

  const filteredRecommendations = recommendations.filter(rec =>
    selectedFilter === 'ALL' || rec.action === selectedFilter
  )

  if (isLoading) {
    return (
      <div className="card text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Analyzing markets...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Daily Top Picks</h2>
        <p className="text-gray-400 mb-4">
          AI-powered recommendations based on technical analysis and market trends
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`btn ${selectedFilter === 'ALL' ? 'btn-primary' : 'bg-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('BUY')}
            className={`btn ${selectedFilter === 'BUY' ? 'btn-success' : 'bg-gray-700'}`}
          >
            Buy Signals
          </button>
          <button
            onClick={() => setSelectedFilter('SELL')}
            className={`btn ${selectedFilter === 'SELL' ? 'btn-danger' : 'bg-gray-700'}`}
          >
            Sell Signals
          </button>
        </div>
      </div>

      {filteredRecommendations.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400">No recommendations available for this filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <div key={rec.id} className="card hover:border-blue-500 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{rec.symbol}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < rec.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400">
                    {rec.optionType} @ ₹{rec.strikePrice} | Exp: {rec.expiryDate}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
                    rec.action === 'BUY'
                      ? 'bg-green-900/50 text-green-300'
                      : 'bg-red-900/50 text-red-300'
                  }`}
                >
                  {rec.action === 'BUY' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  {rec.action}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Entry Price</p>
                  <p className="text-lg font-bold">₹{rec.entryPrice}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Target</p>
                  <p className="text-lg font-bold text-green-400">₹{rec.targetPrice}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Stop Loss</p>
                  <p className="text-lg font-bold text-red-400">₹{rec.stopLoss}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Risk:Reward</p>
                  <p className="text-lg font-bold text-blue-400">{rec.riskRewardRatio}</p>
                </div>
              </div>

              <div className="bg-gray-700/30 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Technical Indicators</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">RSI:</span>{' '}
                    <span className={rec.technicalIndicators.rsi > 70 ? 'text-red-400' : rec.technicalIndicators.rsi < 30 ? 'text-green-400' : 'text-yellow-400'}>
                      {rec.technicalIndicators.rsi}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">MACD:</span>{' '}
                    <span className="text-blue-400">{rec.technicalIndicators.macd}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Trend:</span>{' '}
                    <span className="text-purple-400">{rec.technicalIndicators.trend}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target size={16} />
                  Analysis
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{rec.reasoning}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
