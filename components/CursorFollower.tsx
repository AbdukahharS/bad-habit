'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const CURSOR_SIZE = 20
const TRAIL_LENGTH = 8

interface TrailSegment {
  x: number
  y: number
  scale: number
  opacity: number
  id: number
}

export default function CursorFollower() {
  const [pointer, setPointer] = useState(false)
  const [trail, setTrail] = useState<TrailSegment[]>([])
  const [cursorPos, setCursorPos] = useState({ x: -CURSOR_SIZE, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })
  const lastUpdate = useRef(0)

  const updateTrail = useCallback(() => {
    const now = Date.now()
    if (now - lastUpdate.current > 16) {
      setTrail(prevTrail => {
        const newSegment: TrailSegment = {
          x: mousePos.current.x,
          y: mousePos.current.y,
          scale: 0.9,
          opacity: 0.7,
          id: now
        }

        const newTrail = [newSegment, ...prevTrail.slice(0, TRAIL_LENGTH - 1)]
        return newTrail.map((segment, index) => ({
          ...segment,
          scale: Math.max(0.4, 0.9 - index * 0.1),
          opacity: Math.max(0.2, 0.7 - index * 0.08)
        }))
      })
      lastUpdate.current = now
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(updateTrail, 16)
    return () => clearInterval(interval)
  }, [updateTrail])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY })
      mousePos.current = { x: event.clientX, y: event.clientY }

      const element = document.elementFromPoint(event.clientX, event.clientY)
      if (element) {
        const cursorStyle = window.getComputedStyle(element).cursor
        setPointer(cursorStyle === 'pointer')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])


  return (
    <>
      {/* Trail segments */}
      {trail.map((segment) => (
        <div
          key={segment.id}
          className='fixed pointer-events-none z-[9998] hidden lg:block'
          style={{
            width: CURSOR_SIZE * segment.scale,
            height: CURSOR_SIZE * segment.scale,
            borderRadius: '50%',
            left: segment.x - (CURSOR_SIZE * segment.scale) / 2,
            top: segment.y - (CURSOR_SIZE * segment.scale) / 2,
            opacity: segment.opacity,
            background: `hsl(220, 90%, 70%)`,
            transition: 'opacity 0.1s ease-out',
            filter: 'blur(0.5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: '50%',
          translate: `${cursorPos.x - CURSOR_SIZE / 2}px ${cursorPos.y - CURSOR_SIZE / 2}px`,
          opacity: pointer ? 0.6 : 0.8,
          scale: pointer ? 2 : 1,
          rotate: pointer ? '180deg' : '0deg',
          background: 'white',
          boxShadow: pointer
            ? `0 0 20px hsl(340, 100%, 80%), 0 0 40px hsl(340, 90%, 70%), 0 0 80px hsl(280, 80%, 60%), 0 0 120px hsl(340, 60%, 50%)`
            : `0 0 15px hsl(220, 100%, 80%), 0 0 30px hsl(220, 90%, 70%), 0 0 60px hsl(220, 70%, 60%)`,
          border: '2.5px solid hsl(220, 90%, 70%)',
        }}
        className='fixed z-[9999] pointer-events-none hidden lg:block transition-all duration-150 ease-out'
      />
    </>
  )
}
