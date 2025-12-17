'use client'

import { useState, useEffect } from 'react'
import { Activity, X, Edit2 } from 'lucide-react'

interface Position {
  id: string
  symbol: string
  optionType: 'CALL' | 'PUT'
  strikePrice: number
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  stopLoss: number
  takeProfit: number
  action: 'BUY' | 'SELL'
}

interface PositionsPanelProps {
  apiKey: string
}

export default function PositionsPanel({ apiKey }: PositionsPanelProps) {
  const [positions, setPositions] = useState<Position[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPosition, setEditingPosition] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ stopLoss: string, takeProfit: string }>({ stopLoss: '', takeProfit: '' })

  const fetchPositions = async () => {
    try {
      const response = await fetch('/api/get-positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey })
      })
      const data = await response.json()
      if (response.ok) {
        setPositions(data.positions)
      }
    } catch (error) {
      console.error('Error fetching positions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPositions()
    const interval = setInterval(fetchPositions, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [apiKey])

  const handleEdit = (position: Position) => {
    setEditingPosition(position.id)
    setEditValues({
      stopLoss: position.stopLoss.toString(),
      takeProfit: position.takeProfit.toString()
    })
  }

  const handleSaveEdit = async (positionId: string) => {
    try {
      await fetch('/api/update-position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          positionId,
          stopLoss: parseFloat(editValues.stopLoss),
          takeProfit: parseFloat(editValues.takeProfit)
        })
      })
      setEditingPosition(null)
      fetchPositions()
    } catch (error) {
      console.error('Error updating position:', error)
    }
  }

  const handleClosePosition = async (positionId: string) => {
    if (!confirm('Are you sure you want to close this position?')) return

    try {
      await fetch('/api/close-position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, positionId })
      })
      fetchPositions()
    } catch (error) {
      console.error('Error closing position:', error)
    }
  }

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)

  if (isLoading) {
    return (
      <div className="card text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading positions...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Positions</h2>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total P&L</p>
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{totalPnL.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="card text-center py-12">
          <Activity size={48} className="mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">No active positions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{position.symbol}</h3>
                  <p className="text-sm text-gray-400">
                    {position.optionType} @ ₹{position.strikePrice} | Qty: {position.quantity}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(position)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleClosePosition(position.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Avg Price</p>
                  <p className="text-lg font-semibold">₹{position.avgPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Price</p>
                  <p className="text-lg font-semibold">₹{position.currentPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">P&L</p>
                  <p className={`text-lg font-semibold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{position.pnl.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">P&L %</p>
                  <p className={`text-lg font-semibold ${position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {position.pnlPercent.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Action</p>
                  <p className={`text-lg font-semibold ${position.action === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {position.action}
                  </p>
                </div>
              </div>

              {editingPosition === position.id ? (
                <div className="border-t border-gray-700 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Stop Loss</label>
                      <input
                        type="number"
                        step="0.05"
                        className="input"
                        value={editValues.stopLoss}
                        onChange={(e) => setEditValues({ ...editValues, stopLoss: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Take Profit</label>
                      <input
                        type="number"
                        step="0.05"
                        className="input"
                        value={editValues.takeProfit}
                        onChange={(e) => setEditValues({ ...editValues, takeProfit: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleSaveEdit(position.id)}
                      className="btn btn-primary flex-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPosition(null)}
                      className="btn bg-gray-700 flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Stop Loss</p>
                    <p className="text-lg font-semibold text-red-400">₹{position.stopLoss}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Take Profit</p>
                    <p className="text-lg font-semibold text-green-400">₹{position.takeProfit}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
