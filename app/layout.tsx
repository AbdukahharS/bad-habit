import type { Metadata } from "next";
import { Roboto_Mono } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import './globals.css'
import CursorFollower from '@/components/CursorFollower'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <CursorFollower />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
