import React from 'react'

// Root layout must be minimal because Payload's RootLayout
// in (payload) route group provides its own <html> and <body>
export default function RootLayout({
}: {
  children: any
}) {
  return children
}

