# Dhan Trading Bot - F&O Options Trading Platform

Advanced trading bot for Dhan platform with F&O options trading, stop-loss/take-profit management, daily stock recommendations, and hourly trading signals.

## Features

- **F&O Options Trading**: Place CALL/PUT orders with customizable parameters
- **Stop Loss & Take Profit**: Built-in risk management for every trade
- **Daily Recommendations**: AI-powered daily stock picks with comprehensive analysis
- **Hourly Signals**: Real-time trading signals updated every hour
- **Position Management**: Track and manage all active positions with live P&L
- **Technical Analysis**: RSI, MACD, trend analysis for informed decisions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your Dhan API key to connect
2. Navigate through tabs:
   - **Place Order**: Execute F&O trades with SL/TP
   - **Hourly Signals**: View real-time trading opportunities
   - **Daily Picks**: Check AI-powered recommendations
   - **Positions**: Monitor and manage active trades

## Deployment

Deploy to Vercel:
```bash
vercel deploy --prod
```

## Note

This is a demonstration application. In production, you would need to:
- Integrate actual Dhan API endpoints
- Implement proper authentication and security
- Add database for position tracking
- Set up automated signal generation
- Implement real-time price updates
