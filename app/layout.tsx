import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vision Circle',
  description: 'Transforming Vision Into Reality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-subtext">{children}</body>
    </html>
  )
}