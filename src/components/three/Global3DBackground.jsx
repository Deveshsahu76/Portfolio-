import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber'
import {
  Float,
  Sparkles,
  Stars,
} from '@react-three/drei'
import {
  MathUtils,
} from 'three'
import {
  useLocation,
} from 'react-router-dom'

const getRouteTheme = (
  pathname
) => {
  if (
    pathname.startsWith(
      '/admin'
    ) ||
    pathname === '/analytics'
  ) {
    return {
      key: 'admin',
      primary: '#7c3aed',
      secondary: '#22d3ee',
      tertiary: '#f59e0b',
      scene: 'dashboard',
    }
  }

  if (
    pathname.startsWith(
      '/projects'
    )
  ) {
    return {
      key: 'projects',
      primary: '#ff7a18',
      secondary: '#8b5cf6',
      tertiary: '#22d3ee',
      scene: 'projects',
    }
  }

  if (
    pathname.startsWith(
      '/skills'
    )
  ) {
    return {
      key: 'skills',
      primary: '#22d3ee',
      secondary: '#8b5cf6',
      tertiary: '#ff7a18',
      scene: 'orbit',
    }
  }

  if (
    pathname.startsWith(
      '/about'
    )
  ) {
    return {
      key: 'about',
      primary: '#f59e0b',
      secondary: '#ff7a18',
      tertiary: '#22d3ee',
      scene: 'timeline',
    }
  }

  if (
    pathname.startsWith(
      '/contact'
    )
  ) {
    return {
      key: 'contact',
      primary: '#22d3ee',
      secondary: '#2563eb',
      tertiary: '#8b5cf6',
      scene: 'globe',
    }
  }

  if (
    pathname.startsWith(
      '/recruiter'
    )
  ) {
    return {
      key: 'recruiter',
      primary: '#ff7a18',
      secondary: '#facc15',
      tertiary: '#22d3ee',
      scene: 'dashboard',
    }
  }

  if (
    pathname.startsWith(
      '/freelance'
    )
  ) {
    return {
      key: 'freelance',
      primary: '#8b5cf6',
      secondary: '#22d3ee',
      tertiary: '#ff7a18',
      scene: 'dashboard',
    }
  }

  if (
    pathname.startsWith(
      '/engineering'
    ) ||
    pathname.startsWith(
      '/status'
    )
  ) {
    return {
      key: 'engineering',
      primary: '#10b981',
      secondary: '#22d3ee',
      tertiary: '#8b5cf6',
      scene: 'network',
    }
  }

  return {
    key: 'home',
    primary: '#ff7a18',
    secondary: '#22d3ee',
    tertiary: '#8b5cf6',
    scene: 'hero',
  }
}

const panelPositions = [
  {
    position: [-2.9, 1.8, -1],
    rotation: [0.18, 0.45, -0.12],
    scale: 0.8,
  },
  {
    position: [2.7, 1.35, -0.6],
    rotation: [-0.1, -0.45, 0.15],
    scale: 0.72,
  },
  {
    position: [-2.55, -1.65, -0.4],
    rotation: [-0.18, 0.4, 0.08],
    scale: 0.64,
  },
  {
    position: [2.65, -1.65, -1],
    rotation: [0.12, -0.42, -0.08],
    scale: 0.76,
  },
]

function GlassPanel({
  position,
  rotation,
  scale,
  color,
  secondary,
}) {
  return (
    <Float
      speed={1.25}
      rotationIntensity={0.24}
      floatIntensity={0.55}
      floatingRange={[
        -0.2,
        0.2,
      ]}
    >
      <group
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <mesh>
          <boxGeometry
            args={[
              2.2,
              1.15,
              0.08,
            ]}
          />

          <meshStandardMaterial
            color="#07101f"
            metalness={0.75}
            roughness={0.28}
            transparent
            opacity={0.7}
            emissive={color}
            emissiveIntensity={0.16}
          />
        </mesh>

        <mesh
          position={[
            -0.58,
            0.23,
            0.07,
          ]}
        >
          <boxGeometry
            args={[
              0.72,
              0.08,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh
          position={[
            -0.32,
            -0.02,
            0.07,
          ]}
        >
          <boxGeometry
            args={[
              1.24,
              0.045,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color={secondary}
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh
          position={[
            -0.45,
            -0.22,
            0.07,
          ]}
        >
          <boxGeometry
            args={[
              0.95,
              0.04,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.24}
          />
        </mesh>
      </group>
    </Float>
  )
}

function HeroScene({
  theme,
  lowQuality,
}) {
  const coreRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!coreRef.current) {
        return
      }

      coreRef.current.rotation.y +=
        delta * 0.16

      coreRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime *
            0.32
        ) * 0.12
    }
  )

  return (
    <group>
      <Float
        speed={1}
        rotationIntensity={0.28}
        floatIntensity={0.5}
      >
        <group ref={coreRef}>
          <mesh>
            <torusKnotGeometry
              args={[
                1.25,
                0.3,
                lowQuality
                  ? 72
                  : 130,
                lowQuality
                  ? 12
                  : 20,
              ]}
            />

            <meshStandardMaterial
              color="#0b1220"
              metalness={0.92}
              roughness={0.18}
              emissive={
                theme.primary
              }
              emissiveIntensity={0.42}
              transparent
              opacity={0.9}
            />
          </mesh>

          <mesh
            rotation={[
              Math.PI / 2,
              0,
              0,
            ]}
          >
            <torusGeometry
              args={[
                2.05,
                0.025,
                8,
                150,
              ]}
            />

            <meshBasicMaterial
              color={
                theme.secondary
              }
              transparent
              opacity={0.55}
            />
          </mesh>

          <mesh
            rotation={[
              0.45,
              0.35,
              0.2,
            ]}
          >
            <torusGeometry
              args={[
                2.42,
                0.014,
                8,
                150,
              ]}
            />

            <meshBasicMaterial
              color={
                theme.tertiary
              }
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      </Float>

      {panelPositions.map(
        (
          panel,
          index
        ) => (
          <GlassPanel
            key={index}
            {...panel}
            color={
              index % 2 === 0
                ? theme.primary
                : theme.secondary
            }
            secondary={
              index % 2 === 0
                ? theme.secondary
                : theme.tertiary
            }
          />
        )
      )}
    </group>
  )
}

function ProjectsScene({
  theme,
}) {
  const groupRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!groupRef.current) {
        return
      }

      groupRef.current.rotation.y +=
        delta * 0.08

      groupRef.current.position.y =
        Math.sin(
          state.clock.elapsedTime *
            0.45
        ) * 0.18
    }
  )

  const cards = [
    [-2.3, 1.5, -0.8],
    [0, 1.8, -1.5],
    [2.3, 1.3, -0.8],
    [-1.25, -1.15, -0.3],
    [1.3, -1.25, -0.55],
  ]

  return (
    <group ref={groupRef}>
      {cards.map(
        (
          position,
          index
        ) => (
          <GlassPanel
            key={index}
            position={position}
            rotation={[
              index % 2
                ? -0.08
                : 0.08,

              index % 2
                ? -0.34
                : 0.34,

              index % 3 === 0
                ? 0.08
                : -0.05,
            ]}
            scale={
              index === 1
                ? 0.82
                : 0.64
            }
            color={
              index % 2
                ? theme.secondary
                : theme.primary
            }
            secondary={
              theme.tertiary
            }
          />
        )
      )}
    </group>
  )
}

function OrbitScene({
  theme,
}) {
  const orbitRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!orbitRef.current) {
        return
      }

      orbitRef.current.rotation.y +=
        delta * 0.11

      orbitRef.current.rotation.z =
        Math.sin(
          state.clock.elapsedTime *
            0.18
        ) * 0.2
    }
  )

  const nodes =
    Array.from(
      {
        length: 9,
      },
      (
        _,
        index
      ) => {
        const angle =
          (
            index /
            9
          ) *
          Math.PI *
          2

        return [
          Math.cos(angle) *
            2.55,

          Math.sin(
            angle *
              1.5
          ) *
            0.85,

          Math.sin(angle) *
            2.1,
        ]
      }
    )

  return (
    <group ref={orbitRef}>
      <mesh>
        <icosahedronGeometry
          args={[
            1.15,
            2,
          ]}
        />

        <meshStandardMaterial
          color="#07111d"
          wireframe
          emissive={
            theme.secondary
          }
          emissiveIntensity={0.7}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.65,
            0.018,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color={theme.primary}
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh
        rotation={[
          0.8,
          0.4,
          0,
        ]}
      >
        <torusGeometry
          args={[
            3.05,
            0.012,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color={theme.tertiary}
          transparent
          opacity={0.28}
        />
      </mesh>

      {nodes.map(
        (
          position,
          index
        ) => (
          <Float
            key={index}
            speed={
              1 +
              index * 0.04
            }
            floatIntensity={0.5}
            rotationIntensity={0.3}
          >
            <mesh
              position={position}
            >
              <sphereGeometry
                args={[
                  index % 3 === 0
                    ? 0.2
                    : 0.13,
                  18,
                  18,
                ]}
              />

              <meshStandardMaterial
                color={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissive={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissiveIntensity={1.2}
              />
            </mesh>
          </Float>
        )
      )}
    </group>
  )
}

function TimelineScene({
  theme,
}) {
  const groupRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!groupRef.current) {
        return
      }

      groupRef.current.rotation.y +=
        delta * 0.07

      groupRef.current.position.y =
        Math.sin(
          state.clock.elapsedTime *
            0.35
        ) * 0.15
    }
  )

  return (
    <group ref={groupRef}>
      {Array.from(
        {
          length: 7,
        },
        (
          _,
          index
        ) => {
          const y =
            (
              index -
              3
            ) *
            0.62

          const scale =
            0.75 +
            index * 0.12

          return (
            <mesh
              key={index}
              position={[
                Math.sin(index) *
                  0.45,
                y,
                -Math.abs(
                  index - 3
                ) * 0.12,
              ]}
              rotation={[
                Math.PI / 2,
                index * 0.18,
                index * 0.12,
              ]}
              scale={scale}
            >
              <torusGeometry
                args={[
                  1.15,
                  0.045,
                  10,
                  100,
                ]}
              />

              <meshStandardMaterial
                color={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissive={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissiveIntensity={0.55}
                metalness={0.7}
                roughness={0.3}
                transparent
                opacity={
                  0.72 -
                  index * 0.04
                }
              />
            </mesh>
          )
        }
      )}
    </group>
  )
}

function GlobeScene({
  theme,
}) {
  const globeRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!globeRef.current) {
        return
      }

      globeRef.current.rotation.y +=
        delta * 0.12

      globeRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime *
            0.25
        ) * 0.08
    }
  )

  const satellites = [
    [2.5, 0.5, 0],
    [-2.2, 1.35, -0.6],
    [1.5, -1.8, 0.8],
    [-1.35, -2, -0.4],
  ]

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry
          args={[
            1.6,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#06111c"
          wireframe
          emissive={
            theme.primary
          }
          emissiveIntensity={0.65}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2,
          0.35,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.35,
            0.018,
            8,
            150,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.secondary
          }
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh
        rotation={[
          0.4,
          0.8,
          0.25,
        ]}
      >
        <torusGeometry
          args={[
            2.75,
            0.012,
            8,
            150,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.tertiary
          }
          transparent
          opacity={0.3}
        />
      </mesh>

      {satellites.map(
        (
          position,
          index
        ) => (
          <Float
            key={index}
            speed={
              1.2 +
              index * 0.1
            }
            floatIntensity={0.55}
          >
            <mesh
              position={position}
            >
              <octahedronGeometry
                args={[
                  0.2,
                  0,
                ]}
              />

              <meshStandardMaterial
                color={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissive={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissiveIntensity={1}
              />
            </mesh>
          </Float>
        )
      )}
    </group>
  )
}

function DashboardScene({
  theme,
}) {
  const cubeRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!cubeRef.current) {
        return
      }

      cubeRef.current.rotation.y +=
        delta * 0.1

      cubeRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime *
            0.3
        ) * 0.14
    }
  )

  return (
    <group>
      <Float
        speed={0.9}
        floatIntensity={0.4}
      >
        <mesh
          ref={cubeRef}
          scale={1.45}
        >
          <boxGeometry
            args={[
              1.45,
              1.45,
              1.45,
              4,
              4,
              4,
            ]}
          />

          <meshStandardMaterial
            color="#070d18"
            wireframe
            emissive={
              theme.primary
            }
            emissiveIntensity={0.7}
            transparent
            opacity={0.75}
          />
        </mesh>
      </Float>

      {panelPositions.map(
        (
          panel,
          index
        ) => (
          <GlassPanel
            key={index}
            {...panel}
            scale={
              panel.scale *
              0.84
            }
            color={
              index % 2
                ? theme.secondary
                : theme.primary
            }
            secondary={
              theme.tertiary
            }
          />
        )
      )}
    </group>
  )
}

function NetworkScene({
  theme,
}) {
  const networkRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!networkRef.current) {
        return
      }

      networkRef.current.rotation.y +=
        delta * 0.09

      networkRef.current.rotation.z =
        Math.sin(
          state.clock.elapsedTime *
            0.22
        ) * 0.12
    }
  )

  const nodes = [
    [-2.4, 1.35, -0.4],
    [0, 2.1, -1],
    [2.25, 1.25, -0.3],
    [-1.65, -0.3, 0.4],
    [1.55, -0.45, 0.5],
    [-2.15, -1.9, -0.6],
    [0.15, -2.15, 0.2],
    [2.35, -1.65, -0.5],
  ]

  return (
    <group ref={networkRef}>
      <mesh>
        <icosahedronGeometry
          args={[
            0.85,
            1,
          ]}
        />

        <meshStandardMaterial
          color="#07131a"
          wireframe
          emissive={
            theme.primary
          }
          emissiveIntensity={0.75}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.2,
            0.018,
            8,
            150,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.secondary
          }
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh
        rotation={[
          0.5,
          0.7,
          0.4,
        ]}
      >
        <torusGeometry
          args={[
            2.8,
            0.012,
            8,
            150,
          ]}
        />

        <meshBasicMaterial
          color={
            theme.tertiary
          }
          transparent
          opacity={0.3}
        />
      </mesh>

      {nodes.map(
        (
          position,
          index
        ) => (
          <Float
            key={index}
            speed={
              1 +
              index * 0.05
            }
            floatIntensity={0.45}
          >
            <mesh
              position={position}
            >
              <icosahedronGeometry
                args={[
                  index % 3 === 0
                    ? 0.3
                    : 0.18,
                  1,
                ]}
              />

              <meshStandardMaterial
                color={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissive={
                  index % 2
                    ? theme.primary
                    : theme.secondary
                }
                emissiveIntensity={1.15}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
          </Float>
        )
      )}
    </group>
  )
}

function SceneGeometry({
  theme,
  lowQuality,
}) {
  if (
    theme.scene ===
    'projects'
  ) {
    return (
      <ProjectsScene
        theme={theme}
      />
    )
  }

  if (
    theme.scene ===
    'orbit'
  ) {
    return (
      <OrbitScene
        theme={theme}
      />
    )
  }

  if (
    theme.scene ===
    'timeline'
  ) {
    return (
      <TimelineScene
        theme={theme}
      />
    )
  }

  if (
    theme.scene ===
    'globe'
  ) {
    return (
      <GlobeScene
        theme={theme}
      />
    )
  }

  if (
    theme.scene ===
    'dashboard'
  ) {
    return (
      <DashboardScene
        theme={theme}
      />
    )
  }

  if (
    theme.scene ===
    'network'
  ) {
    return (
      <NetworkScene
        theme={theme}
      />
    )
  }

  return (
    <HeroScene
      theme={theme}
      lowQuality={
        lowQuality
      }
    />
  )
}

function ResponsiveRig({
  children,
}) {
  const groupRef =
    useRef(null)

  const pointerTarget =
    useRef({
      x: 0,
      y: 0,
    })

  const {
    viewport,
  } = useThree()

  useEffect(() => {
    const handlePointerMove = (
      event
    ) => {
      pointerTarget.current.x =
        (
          event.clientX /
          window.innerWidth
        ) *
          2 -
        1

      pointerTarget.current.y =
        -(
          (
            event.clientY /
            window.innerHeight
          ) *
            2 -
          1
        )
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      {
        passive: true,
      }
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )
    }
  }, [])

  useFrame(
    (
      state,
      delta
    ) => {
      if (!groupRef.current) {
        return
      }

      const desktopOffset =
        viewport.width > 8
          ? 1.5
          : 0

      groupRef.current.rotation.x =
        MathUtils.damp(
          groupRef.current
            .rotation.x,

          pointerTarget.current.y *
            0.12,

          3.5,
          delta
        )

      groupRef.current.rotation.y =
        MathUtils.damp(
          groupRef.current
            .rotation.y,

          pointerTarget.current.x *
            0.2,

          3.5,
          delta
        )

      groupRef.current.position.x =
        MathUtils.damp(
          groupRef.current
            .position.x,

          desktopOffset +
            pointerTarget.current.x *
              0.35,

          2.8,
          delta
        )

      groupRef.current.position.y =
        MathUtils.damp(
          groupRef.current
            .position.y,

          pointerTarget.current.y *
            0.22,

          2.8,
          delta
        )

      state.camera.position.x =
        MathUtils.damp(
          state.camera.position.x,

          pointerTarget.current.x *
            0.18,

          2.5,
          delta
        )

      state.camera.position.y =
        MathUtils.damp(
          state.camera.position.y,

          pointerTarget.current.y *
            0.12,

          2.5,
          delta
        )

      state.camera.lookAt(
        0,
        0,
        0
      )
    }
  )

  return (
    <group
      ref={groupRef}
      position={[
        0,
        0,
        -0.8,
      ]}
    >
      {children}
    </group>
  )
}

function ThreeWorld({
  theme,
  lowQuality,
}) {
  return (
    <>
      <fog
        attach="fog"
        args={[
          '#02040a',
          7,
          18,
        ]}
      />

      <ambientLight
        intensity={0.44}
      />

      <pointLight
        position={[
          5,
          5,
          5,
        ]}
        intensity={4.5}
        color={
          theme.primary
        }
      />

      <pointLight
        position={[
          -5,
          -2,
          4,
        ]}
        intensity={3.2}
        color={
          theme.secondary
        }
      />

      <spotLight
        position={[
          0,
          7,
          5,
        ]}
        intensity={2}
        angle={0.5}
        penumbra={0.9}
        color="#ffffff"
      />

      <Stars
        radius={55}
        depth={30}
        count={
          lowQuality
            ? 450
            : 1150
        }
        factor={3}
        saturation={0.15}
        fade
        speed={0.25}
      />

      <Sparkles
        count={
          lowQuality
            ? 24
            : 70
        }
        scale={[
          13,
          8,
          8,
        ]}
        size={
          lowQuality
            ? 1.7
            : 2.4
        }
        speed={0.22}
        opacity={0.58}
        color={
          theme.secondary
        }
      />

      <ResponsiveRig>
        <SceneGeometry
          theme={theme}
          lowQuality={
            lowQuality
          }
        />
      </ResponsiveRig>
    </>
  )
}

const detectWebGL = () => {
  try {
    const canvas =
      document.createElement(
        'canvas'
      )

    return Boolean(
      canvas.getContext(
        'webgl2'
      ) ||
        canvas.getContext(
          'webgl'
        )
    )
  } catch {
    return false
  }
}

export default function Global3DBackground() {
  const {
    pathname,
  } = useLocation()

  const theme =
    useMemo(
      () =>
        getRouteTheme(
          pathname
        ),
      [pathname]
    )

  const [
    capabilities,
    setCapabilities,
  ] = useState({
    ready: false,
    webgl: true,
    reducedMotion: false,
    lowQuality: false,
    visible: true,
  })

  useEffect(() => {
    const reducedMotionQuery =
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
          (
            current
          ) => ({
            ...current,

            ready: true,

            webgl:
              detectWebGL(),

            reducedMotion:
              reducedMotionQuery
                .matches,

            lowQuality:
              window.innerWidth <
                800 ||
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
          (
            current
          ) => ({
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

    reducedMotionQuery
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

      reducedMotionQuery
        .removeEventListener?.(
          'change',
          updateCapabilities
        )
    }
  }, [])

  useEffect(() => {
    const root =
      document.documentElement

    const hadDark =
      root.classList.contains(
        'dark'
      )

    root.classList.add(
      'dark',
      'cinematic-3d-root'
    )

    root.style.colorScheme =
      'dark'

    return () => {
      root.classList.remove(
        'cinematic-3d-root'
      )

      if (!hadDark) {
        root.classList.remove(
          'dark'
        )
      }
    }
  }, [])

  useEffect(() => {
    const root =
      document.documentElement

    root.dataset.threeRoute =
      theme.key

    root.style.setProperty(
      '--scene-primary',
      theme.primary
    )

    root.style.setProperty(
      '--scene-secondary',
      theme.secondary
    )

    root.style.setProperty(
      '--scene-tertiary',
      theme.tertiary
    )
  }, [theme])

  const lowQuality =
    capabilities.lowQuality ||
    theme.key === 'admin'

  if (
    !capabilities.ready ||
    !capabilities.webgl ||
    capabilities.reducedMotion
  ) {
    return (
      <div
        className="global-3d-layer global-3d-fallback"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className={`global-3d-layer global-3d-${theme.key}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [
            0,
            0,
            7.5,
          ],

          fov: 44,

          near: 0.1,

          far: 100,
        }}
        dpr={
          lowQuality
            ? [
                1,
                1.1,
              ]
            : [
                1,
                1.5,
              ]
        }
        gl={{
          alpha: true,

          antialias:
            !lowQuality,

          powerPreference:
            'high-performance',
        }}
        frameloop={
          capabilities.visible
            ? 'always'
            : 'never'
        }
        performance={{
          min: 0.5,
        }}
      >
        <Suspense fallback={null}>
          <ThreeWorld
            theme={theme}
            lowQuality={
              lowQuality
            }
          />
        </Suspense>
      </Canvas>
    </div>
  )
}