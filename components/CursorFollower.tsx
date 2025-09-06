'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useMouseMove, useValue, animate } from 'react-ui-animate'

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
  const mousePos = useRef({ x: 0, y: 0 })
  const lastUpdate = useRef(0)
  
  const x = useValue(-CURSOR_SIZE)
  const y = useValue(0)
  const opacity = useValue(1)
  const scale = useValue(1)
  const rotation = useValue(0)

  useEffect(() => {
    if (pointer) {
      opacity.value = 0.9
      scale.value = 2.2
      rotation.value = 180
    } else {
      opacity.value = 0.8
      scale.value = 1
      rotation.value = 0
    }
  }, [pointer, opacity, scale, rotation])

  const updateTrail = useCallback(() => {
    const now = Date.now()
    if (now - lastUpdate.current > 16) { // 60fps throttle
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
      // Get the element under the mouse pointer
      const element = document.elementFromPoint(event.clientX, event.clientY)

      if (element) {
        // Get the computed cursor style of that element
        const cursorStyle = window.getComputedStyle(element).cursor

        // If the cursor is "pointer", trigger the callback
        if (cursorStyle === 'pointer') {
          setPointer(true)
        } else {
          setPointer(false)
        }
      }
    }

    // Add a mousemove event listener globally
    window.addEventListener('mousemove', handleMouseMove)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [setPointer])

  useMouseMove(({ mouseX, mouseY }) => {
    x.value = mouseX - CURSOR_SIZE / 2
    y.value = mouseY - CURSOR_SIZE / 2
    mousePos.current = { x: mouseX, y: mouseY }
  })


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
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 20%, hsl(220, 90%, 70%) 60%, hsl(280, 90%, 70%) 100%)`,
            transition: 'opacity 0.1s ease-out',
            filter: 'blur(0.5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <animate.div
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: '50%',
          translateX: x.value,
          translateY: y.value,
          opacity: opacity.value,
          scale: scale.value,
          rotate: rotation.value,
          background: pointer 
            ? `radial-gradient(circle, rgba(255, 255, 255, 1) 25%, hsl(340, 100%, 70%) 65%, hsl(280, 100%, 70%) 100%)`
            : `radial-gradient(circle, rgba(255, 255, 255, 0.95) 25%, hsl(220, 100%, 70%) 65%, hsl(280, 100%, 70%) 100%)`,
          boxShadow: pointer 
            ? `0 0 25px hsl(340, 80%, 60%), 0 0 50px hsl(280, 60%, 50%), 0 0 75px hsl(340, 40%, 40%)`
            : `0 0 15px hsl(220, 80%, 60%), 0 0 30px hsl(280, 60%, 50%)`,
          border: '2px solid rgba(255, 255, 255, 0.4)',
        }}
        className='fixed z-[9999] pointer-events-none hidden lg:block'
      />
    </>
  )
}
