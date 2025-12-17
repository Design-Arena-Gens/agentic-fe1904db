import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dhan Trading Bot - Options Trading Platform',
  description: 'Advanced F&O trading bot with signals, SL/TP management, and daily stock recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
