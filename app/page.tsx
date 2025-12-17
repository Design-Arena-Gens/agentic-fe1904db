'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Target, Shield, Bell } from 'lucide-react'
import TradingForm from './components/TradingForm'
import SignalsList from './components/SignalsList'
import DailyRecommendations from './components/DailyRecommendations'
import PositionsPanel from './components/PositionsPanel'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trade' | 'signals' | 'recommendations' | 'positions'>('trade')
  const [dhanApiKey, setDhanApiKey] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const savedApiKey = localStorage.getItem('dhanApiKey')
    if (savedApiKey) {
      setDhanApiKey(savedApiKey)
      setIsConnected(true)
    }
  }, [])

  const handleConnect = () => {
    if (dhanApiKey) {
      localStorage.setItem('dhanApiKey', dhanApiKey)
      setIsConnected(true)
    }
  }

  const handleDisconnect = () => {
    localStorage.removeItem('dhanApiKey')
    setDhanApiKey('')
    setIsConnected(false)
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Dhan Trading Bot
          </h1>
          <p className="text-gray-400">Advanced F&O Trading with AI-Powered Signals</p>
        </div>

        {/* Connection Status */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Dhan API Connection</h3>
              {isConnected ? (
                <div className="flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Connected
                </div>
              ) : (
                <div className="flex items-center text-red-400">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                  Disconnected
                </div>
              )}
            </div>
            {!isConnected ? (
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Enter Dhan API Key"
                  className="input"
                  value={dhanApiKey}
                  onChange={(e) => setDhanApiKey(e.target.value)}
                />
                <button onClick={handleConnect} className="btn btn-primary">
                  Connect
                </button>
              </div>
            ) : (
              <button onClick={handleDisconnect} className="btn btn-danger">
                Disconnect
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('trade')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'trade'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Activity size={20} />
            Place Order
          </button>
          <button
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'signals'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Bell size={20} />
            Hourly Signals
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'recommendations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <TrendingUp size={20} />
            Daily Picks
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'positions'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Target size={20} />
            Positions
          </button>
        </div>

        {/* Content Area */}
        {!isConnected ? (
          <div className="card text-center py-12">
            <Shield size={48} className="mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-semibold mb-2">Connect Your Dhan Account</h3>
            <p className="text-gray-400">
              Enter your Dhan API key above to start trading with advanced F&O options
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'trade' && <TradingForm apiKey={dhanApiKey} />}
            {activeTab === 'signals' && <SignalsList apiKey={dhanApiKey} />}
            {activeTab === 'recommendations' && <DailyRecommendations apiKey={dhanApiKey} />}
            {activeTab === 'positions' && <PositionsPanel apiKey={dhanApiKey} />}
          </>
        )}
      </div>
    </main>
  )
}
