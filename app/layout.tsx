import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  other: {
    'llms-txt': 'https://abdukahhar.uz/projects.json',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${robotoMono.className} antialiased bg-background overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
