import { Roboto_Mono } from 'next/font/google'
import './globals.css'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

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
