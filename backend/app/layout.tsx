export const metadata = {
  title: 'SystemAd API server',
  description: 'server for monitoring log',
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
