import "./globals.css"
export const metadata = {
  title: 'june7.site',
  description: 'june7.site',
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
