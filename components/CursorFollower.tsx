'use client'

import { useEffect, useState } from 'react'
import { useMouseMove, useValue, animate } from 'react-ui-animate'

const CURSOR_SIZE = 15

export default function CursorFollower() {
  const [pointer, setPointer] = useState(false)
  const x = useValue(-CURSOR_SIZE)
  const y = useValue(0)
  const opacity = useValue(1)
  const scale = useValue(1)

  useEffect(() => {
    opacity.value = pointer ? 0.5 : 1
    scale.value = pointer ? 2 : 1
  }, [pointer, opacity, scale])

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
  })

  return (
    <animate.div
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: '50%',
        translateX: x.value,
        translateY: y.value,
        opacity: opacity.value,
        scale: scale.value,
      }}
      className='absolute bg-blue-400 z-[9999] pointer-events-none transition-all duration-[50ms]'
    />
  )
}
