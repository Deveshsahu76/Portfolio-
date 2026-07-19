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
} from '@react-three/fiber'
import {
  Float,
  Html,
  RoundedBox,
  Sparkles,
} from '@react-three/drei'
import {
  MathUtils,
} from 'three'

const technologyNodes = [
  {
    label: 'React',
    position: [-2.8, 1.7, 0.2],
    color: '#22d3ee',
  },
  {
    label: 'Node.js',
    position: [2.75, 1.45, -0.2],
    color: '#22c55e',
  },
  {
    label: 'MongoDB',
    position: [-2.45, -1.55, -0.3],
    color: '#10b981',
  },
  {
    label: 'REST API',
    position: [2.55, -1.45, 0.15],
    color: '#ff7a18',
  },
]

function CodeLine({
  position,
  width,
  color,
  opacity = 0.8,
}) {
  return (
    <mesh position={position}>
      <boxGeometry
        args={[
          width,
          0.055,
          0.025,
        ]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

function Laptop({
  lowQuality,
}) {
  const laptopRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!laptopRef.current) {
        return
      }

      laptopRef.current.rotation.y =
        MathUtils.damp(
          laptopRef.current.rotation.y,
          state.pointer.x * 0.18,
          3.5,
          delta
        )

      laptopRef.current.rotation.x =
        MathUtils.damp(
          laptopRef.current.rotation.x,
          -0.08 +
            state.pointer.y * 0.08,
          3.5,
          delta
        )

      laptopRef.current.position.y =
        Math.sin(
          state.clock.elapsedTime *
            0.65
        ) * 0.08
    }
  )

  const keyboardKeys =
    useMemo(() => {
      const keys = []

      for (
        let row = 0;
        row < 4;
        row += 1
      ) {
        for (
          let column = 0;
          column < 10;
          column += 1
        ) {
          keys.push({
            id:
              `${row}-${column}`,

            position: [
              -1.25 +
                column * 0.28,

              -0.76 -
                row * 0.15,

              0.43 +
                row * 0.06,
            ],
          })
        }
      }

      return keys
    }, [])

  return (
    <group
      ref={laptopRef}
      rotation={[
        -0.08,
        -0.1,
        0,
      ]}
    >
      <group
        position={[
          0,
          0.4,
          0,
        ]}
      >
        <RoundedBox
          args={[
            3.55,
            2.15,
            0.14,
          ]}
          radius={0.09}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#050b14"
            metalness={0.82}
            roughness={0.22}
            emissive="#ff7a18"
            emissiveIntensity={0.13}
          />
        </RoundedBox>

        <RoundedBox
          args={[
            3.25,
            1.82,
            0.04,
          ]}
          radius={0.04}
          smoothness={3}
          position={[
            0,
            0,
            0.1,
          ]}
        >
          <meshStandardMaterial
            color="#02050b"
            metalness={0.25}
            roughness={0.3}
            emissive="#071522"
            emissiveIntensity={0.8}
          />
        </RoundedBox>

        <mesh
          position={[
            -1.38,
            0.72,
            0.14,
          ]}
        >
          <circleGeometry
            args={[
              0.035,
              16,
            ]}
          />

          <meshBasicMaterial
            color="#fb7185"
          />
        </mesh>

        <mesh
          position={[
            -1.25,
            0.72,
            0.14,
          ]}
        >
          <circleGeometry
            args={[
              0.035,
              16,
            ]}
          />

          <meshBasicMaterial
            color="#facc15"
          />
        </mesh>

        <mesh
          position={[
            -1.12,
            0.72,
            0.14,
          ]}
        >
          <circleGeometry
            args={[
              0.035,
              16,
            ]}
          />

          <meshBasicMaterial
            color="#4ade80"
          />
        </mesh>

        <CodeLine
          position={[
            -0.82,
            0.38,
            0.14,
          ]}
          width={1.15}
          color="#22d3ee"
        />

        <CodeLine
          position={[
            -0.54,
            0.15,
            0.14,
          ]}
          width={1.72}
          color="#ffffff"
          opacity={0.28}
        />

        <CodeLine
          position={[
            -0.75,
            -0.08,
            0.14,
          ]}
          width={1.28}
          color="#ff7a18"
        />

        <CodeLine
          position={[
            -0.4,
            -0.31,
            0.14,
          ]}
          width={1.95}
          color="#8b5cf6"
          opacity={0.65}
        />

        <CodeLine
          position={[
            -0.68,
            -0.54,
            0.14,
          ]}
          width={1.38}
          color="#22d3ee"
          opacity={0.55}
        />

        <mesh
          position={[
            1.02,
            0.05,
            0.14,
          ]}
        >
          <torusGeometry
            args={[
              0.45,
              0.025,
              8,
              lowQuality
                ? 50
                : 90,
            ]}
          />

          <meshBasicMaterial
            color="#ff7a18"
            transparent
            opacity={0.85}
          />
        </mesh>

        <mesh
          position={[
            1.02,
            0.05,
            0.15,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <icosahedronGeometry
            args={[
              0.24,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#08111d"
            wireframe
            emissive="#22d3ee"
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      <group
        position={[
          0,
          -0.55,
          0.44,
        ]}
        rotation={[
          -0.22,
          0,
          0,
        ]}
      >
        <RoundedBox
          args={[
            3.85,
            1.42,
            0.13,
          ]}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#111827"
            metalness={0.85}
            roughness={0.24}
          />
        </RoundedBox>

        {!lowQuality &&
          keyboardKeys.map(
            (key) => (
              <mesh
                key={key.id}
                position={
                  key.position
                }
              >
                <boxGeometry
                  args={[
                    0.19,
                    0.075,
                    0.035,
                  ]}
                />

                <meshStandardMaterial
                  color="#1e293b"
                  emissive="#22d3ee"
                  emissiveIntensity={0.04}
                  roughness={0.4}
                />
              </mesh>
            )
          )}

        <RoundedBox
          args={[
            1.15,
            0.5,
            0.025,
          ]}
          radius={0.04}
          smoothness={3}
          position={[
            0,
            -1.18,
            0.63,
          ]}
        >
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.7}
            roughness={0.34}
          />
        </RoundedBox>
      </group>
    </group>
  )
}

function TechnologyNode({
  label,
  position,
  color,
  index,
}) {
  return (
    <Float
      speed={
        1.1 +
        index * 0.12
      }
      rotationIntensity={0.45}
      floatIntensity={0.6}
      floatingRange={[
        -0.22,
        0.22,
      ]}
    >
      <group position={position}>
        <mesh>
          <icosahedronGeometry
            args={[
              index % 2 === 0
                ? 0.25
                : 0.2,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#07101c"
            metalness={0.62}
            roughness={0.24}
            emissive={color}
            emissiveIntensity={1.05}
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
              0.42,
              0.012,
              8,
              60,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.7}
          />
        </mesh>

        <Html
          center
          distanceFactor={8}
          position={[
            0,
            -0.5,
            0,
          ]}
          style={{
            pointerEvents:
              'none',
          }}
        >
          <span className="home3d-tech-label">
            {label}
          </span>
        </Html>
      </group>
    </Float>
  )
}

function CommandCenterScene({
  lowQuality,
}) {
  const sceneRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!sceneRef.current) {
        return
      }

      sceneRef.current.position.x =
        MathUtils.damp(
          sceneRef.current.position.x,
          state.pointer.x * 0.18,
          2.8,
          delta
        )

      sceneRef.current.position.y =
        MathUtils.damp(
          sceneRef.current.position.y,
          state.pointer.y * 0.12,
          2.8,
          delta
        )
    }
  )

  return (
    <group
      ref={sceneRef}
      position={[
        0,
        0,
        -0.7,
      ]}
    >
      <Laptop
        lowQuality={lowQuality}
      />

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        position={[
          0,
          -0.35,
          -1,
        ]}
      >
        <torusGeometry
          args={[
            3.35,
            0.018,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.36}
        />
      </mesh>

      <mesh
        rotation={[
          0.4,
          0.75,
          0.2,
        ]}
        position={[
          0,
          0,
          -1.2,
        ]}
      >
        <torusGeometry
          args={[
            4,
            0.012,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.22}
        />
      </mesh>

      {technologyNodes.map(
        (
          technology,
          index
        ) => (
          <TechnologyNode
            key={
              technology.label
            }
            {...technology}
            index={index}
          />
        )
      )}

      <Sparkles
        count={
          lowQuality
            ? 18
            : 42
        }
        scale={[
          8,
          5,
          5,
        ]}
        size={2}
        speed={0.22}
        opacity={0.6}
        color="#ff9f43"
      />
    </group>
  )
}

function StaticFallback() {
  return (
    <div className="home3d-static-fallback">
      <div className="home3d-static-screen">
        <span />
        <span />
        <span />

        <div>
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="home3d-static-base" />
    </div>
  )
}

export default function HomeCommandCenter3D() {
  const [
    visualMode,
    setVisualMode,
  ] = useState({
    ready: false,
    reducedMotion: false,
    lowQuality: false,
  })

  useEffect(() => {
    const motionQuery =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      )

    const update = () => {
      setVisualMode({
        ready: true,

        reducedMotion:
          motionQuery.matches,

        lowQuality:
          window.innerWidth <
            760 ||
          Number(
            navigator
              .hardwareConcurrency ||
              8
          ) <= 4 ||
          Number(
            navigator
              .deviceMemory ||
              8
          ) <= 4,
      })
    }

    update()

    window.addEventListener(
      'resize',
      update
    )

    motionQuery
      .addEventListener?.(
        'change',
        update
      )

    return () => {
      window.removeEventListener(
        'resize',
        update
      )

      motionQuery
        .removeEventListener?.(
          'change',
          update
        )
    }
  }, [])

  if (
    !visualMode.ready ||
    visualMode.reducedMotion
  ) {
    return (
      <StaticFallback />
    )
  }

  return (
    <div
      className="home3d-canvas"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [
            0,
            0.15,
            8.3,
          ],
          fov: 43,
          near: 0.1,
          far: 80,
        }}
        dpr={
          visualMode.lowQuality
            ? [
                1,
                1.1,
              ]
            : [
                1,
                1.45,
              ]
        }
        gl={{
          alpha: true,
          antialias:
            !visualMode.lowQuality,
          powerPreference:
            'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight
            intensity={0.55}
          />

          <pointLight
            position={[
              5,
              5,
              5,
            ]}
            color="#ff7a18"
            intensity={4.8}
          />

          <pointLight
            position={[
              -5,
              -1,
              4,
            ]}
            color="#22d3ee"
            intensity={3.5}
          />

          <spotLight
            position={[
              0,
              6,
              6,
            ]}
            color="#ffffff"
            intensity={2.2}
            angle={0.45}
            penumbra={0.9}
          />

          <CommandCenterScene
            lowQuality={
              visualMode.lowQuality
            }
          />
        </Suspense>
      </Canvas>
    </div>
  )
}