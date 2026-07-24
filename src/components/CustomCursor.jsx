import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const capabilityQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    )

    let frame = 0
    let pointerX = -100
    let pointerY = -100

    const updateCapability = () => {
      setEnabled(capabilityQuery.matches)
    }

    const renderCursor = () => {
      frame = 0

      if (!cursorRef.current) {
        return
      }

      cursorRef.current.style.transform =
        `translate3d(${pointerX - 7}px, ${pointerY - 7}px, 0)`
    }

    const handlePointerMove = (event) => {
      if (!capabilityQuery.matches) {
        return
      }

      pointerX = event.clientX
      pointerY = event.clientY

      if (!frame) {
        frame = window.requestAnimationFrame(renderCursor)
      }
    }

    updateCapability()

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })

    capabilityQuery.addEventListener?.('change', updateCapability)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      capabilityQuery.removeEventListener?.('change', updateCapability)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  )
}
