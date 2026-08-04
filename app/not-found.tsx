import Link from 'next/link'
import './globals.css'

export default function NotFound() {
  return (
    <main className='w-full h-screen flex flex-col justify-center items-center gap-6 px-6 text-center bg-background'>
      <p className='text-6xl sm:text-8xl font-bold font-poppins text-white'>
        404
      </p>
      <p className='text-gray-300 text-sm sm:text-base'>
        This page could not be found.
      </p>
      <Link
        href='/en'
        className='inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 text-white font-semibold border border-blue-400/40 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40'
      >
        Back to home
      </Link>
    </main>
  )
}
