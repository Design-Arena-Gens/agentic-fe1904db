'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TradingFormProps {
  apiKey: string
}

export default function TradingForm({ apiKey }: TradingFormProps) {
  const [formData, setFormData] = useState({
    symbol: '',
    optionType: 'CALL',
    strikePrice: '',
    expiryDate: '',
    quantity: '50',
    orderType: 'MARKET',
    price: '',
    stopLoss: '',
    takeProfit: '',
    action: 'BUY'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          apiKey
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `Order placed successfully! Order ID: ${data.orderId}` })
        // Reset form
        setFormData({
          ...formData,
          symbol: '',
          strikePrice: '',
          expiryDate: '',
          price: '',
          stopLoss: '',
          takeProfit: ''
        })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to place order' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Place F&O Order</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Action Type */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, action: 'BUY' })}
            className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              formData.action === 'BUY'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            <TrendingUp size={20} />
            BUY
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, action: 'SELL' })}
            className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              formData.action === 'SELL'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            <TrendingDown size={20} />
            SELL
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Symbol */}
          <div>
            <label className="label">Symbol</label>
            <input
              type="text"
              placeholder="e.g., NIFTY, BANKNIFTY"
              className="input"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              required
            />
          </div>

          {/* Option Type */}
          <div>
            <label className="label">Option Type</label>
            <select
              className="input"
              value={formData.optionType}
              onChange={(e) => setFormData({ ...formData, optionType: e.target.value })}
            >
              <option value="CALL">CALL</option>
              <option value="PUT">PUT</option>
            </select>
          </div>

          {/* Strike Price */}
          <div>
            <label className="label">Strike Price</label>
            <input
              type="number"
              placeholder="e.g., 19500"
              className="input"
              value={formData.strikePrice}
              onChange={(e) => setFormData({ ...formData, strikePrice: e.target.value })}
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="label">Expiry Date</label>
            <input
              type="date"
              className="input"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="label">Quantity (Lot Size)</label>
            <input
              type="number"
              placeholder="50"
              className="input"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </div>

          {/* Order Type */}
          <div>
            <label className="label">Order Type</label>
            <select
              className="input"
              value={formData.orderType}
              onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
            >
              <option value="MARKET">MARKET</option>
              <option value="LIMIT">LIMIT</option>
            </select>
          </div>

          {/* Price (only for LIMIT orders) */}
          {formData.orderType === 'LIMIT' && (
            <div>
              <label className="label">Limit Price</label>
              <input
                type="number"
                step="0.05"
                placeholder="e.g., 125.50"
                className="input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          )}

          {/* Stop Loss */}
          <div>
            <label className="label">Stop Loss (₹)</label>
            <input
              type="number"
              step="0.05"
              placeholder="e.g., 100.00"
              className="input"
              value={formData.stopLoss}
              onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
            />
          </div>

          {/* Take Profit */}
          <div>
            <label className="label">Take Profit (₹)</label>
            <input
              type="number"
              step="0.05"
              placeholder="e.g., 150.00"
              className="input"
              value={formData.takeProfit}
              onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn ${
            formData.action === 'BUY' ? 'btn-success' : 'btn-danger'
          }`}
        >
          {isSubmitting ? 'Placing Order...' : `${formData.action} ${formData.symbol} ${formData.optionType}`}
        </button>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-900/50 text-green-300 border border-green-700'
                : 'bg-red-900/50 text-red-300 border border-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  )
}
