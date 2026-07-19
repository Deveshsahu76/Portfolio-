import React, {
  useEffect,
} from 'react'
import {
  useLocation,
} from 'react-router-dom'

const surfaceSelector = [
  '.soft-card',
  '.premium-profile-panel',
  '.premium-capability-card',
  '.premium-audience-card',
  '.premium-proof-card',
  '.premium-contact-card',
  '.projectsx-project-card',
  '.projectsx-card',
  '.projectdetail-panel',
  '.projectdetail-card',
  '.recruiterx-card',
  '.recruiterx-panel',
  '.recruiterx-projects > article',
  '.recruiter60-page article',
  '.freelance-card',
  '.analytics-panel',
  '.adminlead-card',
  '.resumeadmin-card',
  '.admin-profile-control',
].join(',')

export default function GlobalPointerEffects() {
  const {
    pathname,
  } = useLocation()

  useEffect(() => {
    const root =
      document.documentElement

    const finePointer =
      window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      )

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      )

    const boundElements =
      new Set()

    const handleWindowPointer =
      (
        event
      ) => {
        root.style.setProperty(
          '--pointer-x',
          `${event.clientX}px`
        )

        root.style.setProperty(
          '--pointer-y',
          `${event.clientY}px`
        )
      }

    const bindSurfaces =
      () => {
        if (
          !finePointer.matches ||
          reducedMotion.matches
        ) {
          return
        }

        document
          .querySelectorAll(
            surfaceSelector
          )
          .forEach(
            (
              element
            ) => {
              if (
                element.dataset
                  .live3dBound ===
                'true'
              ) {
                return
              }

              if (
                element.closest(
                  '[data-disable-live-3d]'
                )
              ) {
                return
              }

              element.dataset.live3dBound =
                'true'

              element.classList.add(
                'live-3d-surface'
              )

              const handleMove =
                (
                  event
                ) => {
                  const rect =
                    element
                      .getBoundingClientRect()

                  const x =
                    (
                      event.clientX -
                      rect.left
                    ) /
                    rect.width

                  const y =
                    (
                      event.clientY -
                      rect.top
                    ) /
                    rect.height

                  const rotateY =
                    (
                      x -
                      0.5
                    ) *
                    6

                  const rotateX =
                    (
                      0.5 -
                      y
                    ) *
                    5

                  element.style.setProperty(
                    '--surface-x',
                    `${(
                      x * 100
                    ).toFixed(
                      1
                    )}%`
                  )

                  element.style.setProperty(
                    '--surface-y',
                    `${(
                      y * 100
                    ).toFixed(
                      1
                    )}%`
                  )

                  element.style.setProperty(
                    '--surface-rx',
                    `${rotateX.toFixed(
                      2
                    )}deg`
                  )

                  element.style.setProperty(
                    '--surface-ry',
                    `${rotateY.toFixed(
                      2
                    )}deg`
                  )
                }

              const handleLeave =
                () => {
                  element.style.setProperty(
                    '--surface-x',
                    '50%'
                  )

                  element.style.setProperty(
                    '--surface-y',
                    '50%'
                  )

                  element.style.setProperty(
                    '--surface-rx',
                    '0deg'
                  )

                  element.style.setProperty(
                    '--surface-ry',
                    '0deg'
                  )
                }

              element.addEventListener(
                'pointermove',
                handleMove,
                {
                  passive: true,
                }
              )

              element.addEventListener(
                'pointerleave',
                handleLeave
              )

              element.__removeLive3d =
                () => {
                  element.removeEventListener(
                    'pointermove',
                    handleMove
                  )

                  element.removeEventListener(
                    'pointerleave',
                    handleLeave
                  )

                  element.classList.remove(
                    'live-3d-surface'
                  )

                  delete element.dataset
                    .live3dBound
                }

              boundElements.add(
                element
              )
            }
          )
      }

    window.addEventListener(
      'pointermove',
      handleWindowPointer,
      {
        passive: true,
      }
    )

    const frameId =
      window.requestAnimationFrame(
        bindSurfaces
      )

    let observerFrame = null

    const observer =
      new MutationObserver(
        () => {
          if (observerFrame) {
            window.cancelAnimationFrame(
              observerFrame
            )
          }

          observerFrame =
            window.requestAnimationFrame(
              bindSurfaces
            )
        }
      )

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true,
      }
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handleWindowPointer
      )

      window.cancelAnimationFrame(
        frameId
      )

      if (observerFrame) {
        window.cancelAnimationFrame(
          observerFrame
        )
      }

      observer.disconnect()

      boundElements.forEach(
        (
          element
        ) => {
          element.__removeLive3d?.()
        }
      )
    }
  }, [pathname])

  return (
    <>
      <div
        key={pathname}
        className="route-transition-flash"
        aria-hidden="true"
      />

      <div
        className="cinematic-noise"
        aria-hidden="true"
      />

      <div
        className="global-pointer-aura"
        aria-hidden="true"
      />
    </>
  )
}