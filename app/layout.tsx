import type { Metadata } from "next";
import { Roboto_Mono } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import CursorFollower from '@/components/CursorFollower'
import './globals.css'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shahzod Abdukahhar',
  description:
    'Developer devoted to creating great web experiences focused on React, NextJS and Node JS',
  robots: 'index, follow',
  openGraph: {
    title: 'Shahzod Abdukahhar',
    description:
      'Developer devoted to creating great web experiences focused on React, NextJS and Node JS',
    siteName: 'Shahzod Abdukahhar personal websie',
    images: ['https://abdukahhar.uz/link-preview.jpg'],
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
        <CursorFollower />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
