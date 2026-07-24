import {
  useEffect,
  useState,
} from 'react'

export default function useAdaptive3D() {
  const [
    capabilities,
    setCapabilities,
  ] = useState({
    ready: false,
    reducedMotion: false,
    lowQuality: false,
    visible: true,
  })

  useEffect(() => {
    const motionQuery =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      )

    const updateCapabilities =
      () => {
        const cores =
          Number(
            navigator
              .hardwareConcurrency ||
              8
          )

        const memory =
          Number(
            navigator
              .deviceMemory ||
              8
          )

        setCapabilities(
          (current) => ({
            ...current,

            ready: true,

            reducedMotion:
              motionQuery.matches ||
              window.innerWidth < 1024,

            lowQuality:
              window.innerWidth < 1024 ||
              cores <= 4 ||
              memory <= 4,

            visible:
              !document.hidden,
          })
        )
      }

    const updateVisibility =
      () => {
        setCapabilities(
          (current) => ({
            ...current,

            visible:
              !document.hidden,
          })
        )
      }

    updateCapabilities()

    window.addEventListener(
      'resize',
      updateCapabilities
    )

    document.addEventListener(
      'visibilitychange',
      updateVisibility
    )

    motionQuery
      .addEventListener?.(
        'change',
        updateCapabilities
      )

    return () => {
      window.removeEventListener(
        'resize',
        updateCapabilities
      )

      document.removeEventListener(
        'visibilitychange',
        updateVisibility
      )

      motionQuery
        .removeEventListener?.(
          'change',
          updateCapabilities
        )
    }
  }, [])

  return capabilities
}