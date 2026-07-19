import React, {
  Suspense,
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
  Sparkles,
  useCursor,
} from '@react-three/drei'
import {
  CatmullRomCurve3,
  MathUtils,
  Vector3,
} from 'three'
import {
  FiArrowRight,
  FiBookOpen,
  FiCode,
  FiCompass,
} from 'react-icons/fi'
import useAdaptive3D from '../../hooks/useAdaptive3D'

const getTimelinePosition = (
  index,
  total
) => {
  const middle =
    (
      Math.max(
        total,
        1
      ) -
      1
    ) /
    2

  const offset =
    index - middle

  const angle =
    index * 1.22

  return [
    Math.cos(angle) *
      1.65,

    offset * 1.28,

    Math.sin(angle) *
      1.1,
  ]
}

function TimelineNode({
  item,
  index,
  total,
  selected,
  onSelect,
}) {
  const nodeRef =
    useRef(null)

  const [
    hovered,
    setHovered,
  ] = useState(false)

  useCursor(hovered)

  const position =
    getTimelinePosition(
      index,
      total
    )

  const colors = [
    '#22d3ee',
    '#8b5cf6',
    '#ff7a18',
    '#10b981',
  ]

  const color =
    colors[
      index %
        colors.length
    ]

  useFrame(
    (
      state,
      delta
    ) => {
      if (!nodeRef.current) {
        return
      }

      const scale =
        selected
          ? 1.35
          : hovered
            ? 1.17
            : 1

      nodeRef.current.scale.x =
        MathUtils.damp(
          nodeRef.current.scale.x,
          scale,
          6,
          delta
        )

      nodeRef.current.scale.y =
        MathUtils.damp(
          nodeRef.current.scale.y,
          scale,
          6,
          delta
        )

      nodeRef.current.scale.z =
        MathUtils.damp(
          nodeRef.current.scale.z,
          scale,
          6,
          delta
        )

      nodeRef.current.rotation.y +=
        delta * 0.35

      nodeRef.current.position.x =
        position[0] +
        Math.sin(
          state.clock.elapsedTime *
            0.55 +
            index
        ) *
          0.05
    }
  )

  return (
    <Float
      speed={
        0.8 +
        index * 0.08
      }
      floatIntensity={0.28}
      rotationIntensity={0.18}
    >
      <group
        ref={nodeRef}
        position={position}
      >
        <mesh
          onClick={(event) => {
            event.stopPropagation()
            onSelect(index)
          }}
          onPointerOver={(
            event
          ) => {
            event.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() =>
            setHovered(false)
          }
        >
          <octahedronGeometry
            args={[
              selected
                ? 0.34
                : 0.27,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#07101b"
            metalness={0.7}
            roughness={0.23}
            emissive={color}
            emissiveIntensity={
              selected
                ? 1.7
                : 0.9
            }
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
              selected
                ? 0.54
                : 0.43,
              0.014,
              8,
              70,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={
              selected
                ? 0.9
                : 0.46
            }
          />
        </mesh>

        <Html
          center
          distanceFactor={8}
          position={[
            0,
            -0.56,
            0,
          ]}
          style={{
            pointerEvents:
              'none',
          }}
        >
          <span
            className={
              selected
                ? 'journey3d-year active'
                : 'journey3d-year'
            }
          >
            {item.year}
          </span>
        </Html>
      </group>
    </Float>
  )
}

function TimelineScene({
  items,
  activeIndex,
  onSelect,
}) {
  const groupRef =
    useRef(null)

  const curve =
    useMemo(() => {
      const points =
        items.map(
          (
            _,
            index
          ) => {
            const position =
              getTimelinePosition(
                index,
                items.length
              )

            return new Vector3(
              position[0],
              position[1],
              position[2]
            )
          }
        )

      if (points.length === 1) {
        points.push(
          new Vector3(
            points[0].x,
            points[0].y + 1,
            points[0].z
          )
        )
      }

      return new CatmullRomCurve3(
        points
      )
    }, [items])

  useFrame(
    (
      state,
      delta
    ) => {
      if (!groupRef.current) {
        return
      }

      groupRef.current.rotation.y =
        MathUtils.damp(
          groupRef.current
            .rotation.y,

          state.pointer.x *
            0.16,

          3.2,
          delta
        )

      groupRef.current.rotation.x =
        MathUtils.damp(
          groupRef.current
            .rotation.x,

          state.pointer.y *
            0.055,

          3.2,
          delta
        )

      groupRef.current.position.y =
        Math.sin(
          state.clock.elapsedTime *
            0.32
        ) *
        0.07
    }
  )

  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry
          args={[
            curve,
            80,
            0.025,
            8,
            false,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.36}
        />
      </mesh>

      {items.map(
        (
          item,
          index
        ) => (
          <TimelineNode
            key={
              `${item.year}-${item.title}`
            }
            item={item}
            index={index}
            total={items.length}
            selected={
              index ===
              activeIndex
            }
            onSelect={onSelect}
          />
        )
      )}

      <Sparkles
        count={40}
        scale={[
          7,
          7,
          6,
        ]}
        size={2}
        speed={0.16}
        opacity={0.55}
        color="#ff9f43"
      />
    </group>
  )
}

export default function JourneyTimeline3D({
  items = [],
}) {
  const visual =
    useAdaptive3D()

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(
    Math.max(
      items.length - 1,
      0
    )
  )

  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null
  }

  const activeItem =
    items[
      activeIndex
    ] || items[0]

  return (
    <section className="journey3d-section">
      <div className="journey3d-heading">
        <div>
          <span>
            <FiCompass />
            Interactive Journey
          </span>

          <h2>
            A development journey
            visualized through depth
            and motion.
          </h2>

          <p>
            Select a year to explore
            how the learning path moved
            from programming basics to
            full-stack product
            development.
          </p>
        </div>

        <div className="journey3d-progress">
          <strong>
            {String(
              activeIndex + 1
            ).padStart(
              2,
              '0'
            )}
          </strong>

          <span>
            /{' '}
            {String(
              items.length
            ).padStart(
              2,
              '0'
            )}
          </span>
        </div>
      </div>

      <div className="journey3d-grid">
        <div className="journey3d-stage">
          {visual.ready &&
          !visual.reducedMotion ? (
            <Canvas
              aria-hidden="true"
              camera={{
                position: [
                  0,
                  0,
                  8,
                ],
                fov: 46,
                near: 0.1,
                far: 80,
              }}
              dpr={
                visual.lowQuality
                  ? [
                      1,
                      1.1,
                    ]
                  : [
                      1,
                      1.4,
                    ]
              }
              frameloop={
                visual.visible
                  ? 'always'
                  : 'never'
              }
              gl={{
                alpha: true,

                antialias:
                  !visual.lowQuality,

                powerPreference:
                  'high-performance',
              }}
            >
              <Suspense
                fallback={null}
              >
                <ambientLight
                  intensity={0.5}
                />

                <pointLight
                  position={[
                    5,
                    5,
                    5,
                  ]}
                  color="#ff7a18"
                  intensity={4.1}
                />

                <pointLight
                  position={[
                    -5,
                    -2,
                    4,
                  ]}
                  color="#22d3ee"
                  intensity={3.2}
                />

                <TimelineScene
                  items={items}
                  activeIndex={
                    activeIndex
                  }
                  onSelect={
                    setActiveIndex
                  }
                />
              </Suspense>
            </Canvas>
          ) : (
            <div className="journey3d-static">
              <FiBookOpen />

              <strong>
                Development Journey
              </strong>

              <span>
                Reduced-motion view
              </span>
            </div>
          )}
        </div>

        <article className="journey3d-active-card">
          <span>
            {activeItem.year}
          </span>

          <h3>
            {activeItem.title}
          </h3>

          <p>
            {activeItem.desc}
          </p>

          <div className="journey3d-active-index">
            <FiCode />

            <div>
              <strong>
                Current chapter
              </strong>

              <span>
                Step{' '}
                {activeIndex + 1}
                {' of '}
                {items.length}
              </span>
            </div>
          </div>

          <div className="journey3d-buttons">
            {items.map(
              (
                item,
                index
              ) => (
                <button
                  key={
                    `${item.year}-${item.title}`
                  }
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  className={
                    index ===
                    activeIndex
                      ? 'active'
                      : ''
                  }
                >
                  <span>
                    {item.year}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <FiArrowRight />
                </button>
              )
            )}
          </div>
        </article>
      </div>
    </section>
  )
}