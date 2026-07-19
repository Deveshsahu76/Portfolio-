import React, {
  Suspense,
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
  MathUtils,
} from 'three'
import {
  FiArrowUpRight,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiRadio,
} from 'react-icons/fi'
import useAdaptive3D from '../../hooks/useAdaptive3D'
import useAvailability from '../../hooks/useAvailability'

const channels = [
  {
    label: 'Email',
    value:
      'deveshsahu567@gmail.com',

    href:
      'mailto:deveshsahu567@gmail.com?subject=Portfolio%20Contact%20Inquiry',

    icon: FiMail,
    color: '#ff7a18',

    position: [
      -2.55,
      1.35,
      0.25,
    ],
  },
  {
    label: 'WhatsApp',
    value:
      'Direct message',

    href:
      'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio.',

    icon:
      FiMessageCircle,

    color: '#10b981',

    position: [
      2.6,
      1.15,
      -0.2,
    ],
  },
  {
    label: 'LinkedIn',
    value:
      'Professional profile',

    href:
      'https://www.linkedin.com/in/devesh-sahu-560608270/',

    icon: FiLinkedin,
    color: '#22d3ee',

    position: [
      -2.35,
      -1.55,
      -0.3,
    ],
  },
  {
    label: 'GitHub',
    value:
      'Repositories and code',

    href:
      'https://github.com/Deveshsahu76',

    icon: FiGithub,
    color: '#8b5cf6',

    position: [
      2.4,
      -1.45,
      0.25,
    ],
  },
]

function ChannelNode({
  channel,
  index,
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
          ? 1.3
          : hovered
            ? 1.15
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
        delta *
        (
          0.3 +
          index * 0.04
        )

      nodeRef.current.position.y =
        channel.position[1] +
        Math.sin(
          state.clock.elapsedTime *
            (
              0.6 +
              index * 0.04
            ) +
            index
        ) *
          0.08
    }
  )

  return (
    <Float
      speed={
        1 +
        index * 0.1
      }
      rotationIntensity={0.28}
      floatIntensity={0.42}
    >
      <group
        ref={nodeRef}
        position={
          channel.position
        }
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
          <icosahedronGeometry
            args={[
              selected
                ? 0.34
                : 0.27,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#07101b"
            metalness={0.72}
            roughness={0.23}
            emissive={
              channel.color
            }
            emissiveIntensity={
              selected
                ? 1.8
                : 1
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
                ? 0.52
                : 0.43,
              0.014,
              8,
              70,
            ]}
          />

          <meshBasicMaterial
            color={
              channel.color
            }
            transparent
            opacity={
              selected
                ? 0.92
                : 0.5
            }
          />
        </mesh>

        <Html
          center
          distanceFactor={8}
          position={[
            0,
            -0.58,
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
                ? 'contact3d-node-label active'
                : 'contact3d-node-label'
            }
          >
            {channel.label}
          </span>
        </Html>
      </group>
    </Float>
  )
}

function CommunicationGlobeScene({
  activeIndex,
  onSelect,
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
        delta * 0.08

      globeRef.current.rotation.x =
        MathUtils.damp(
          globeRef.current
            .rotation.x,

          state.pointer.y *
            0.08,

          3,
          delta
        )

      globeRef.current.position.x =
        MathUtils.damp(
          globeRef.current
            .position.x,

          state.pointer.x *
            0.14,

          3,
          delta
        )
    }
  )

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry
          args={[
            1.42,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#06111b"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.76}
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[
            1.18,
            24,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#02060c"
          metalness={0.72}
          roughness={0.3}
          emissive="#071827"
          emissiveIntensity={0.7}
          transparent
          opacity={0.74}
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
            2.05,
            0.018,
            8,
            140,
          ]}
        />

        <meshBasicMaterial
          color="#ff7a18"
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh
        rotation={[
          0.7,
          0.4,
          0.25,
        ]}
      >
        <torusGeometry
          args={[
            2.6,
            0.012,
            8,
            150,
          ]}
        />

        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh
        rotation={[
          -0.5,
          0.85,
          0.15,
        ]}
      >
        <torusGeometry
          args={[
            3.05,
            0.009,
            8,
            150,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.2}
        />
      </mesh>

      {channels.map(
        (
          channel,
          index
        ) => (
          <ChannelNode
            key={
              channel.label
            }
            channel={channel}
            index={index}
            selected={
              index ===
              activeIndex
            }
            onSelect={onSelect}
          />
        )
      )}

      <Sparkles
        count={42}
        scale={[
          8,
          6,
          7,
        ]}
        size={2}
        speed={0.17}
        opacity={0.58}
        color="#22d3ee"
      />
    </group>
  )
}

export default function ContactGlobe3D() {
  const visual =
    useAdaptive3D()

  const availability =
    useAvailability()

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const activeChannel =
    channels[
      activeIndex
    ] || channels[0]

  const ActiveIcon =
    activeChannel.icon

  return (
    <section className="contact-globe-section">
      <div className="contact-globe-heading">
        <div>
          <span>
            <FiRadio />
            Live Communication Hub
          </span>

          <h2>
            Connect through an
            interactive global contact
            network.
          </h2>

          <p>
            Select a communication
            channel, review current
            availability and open the
            preferred contact method.
          </p>
        </div>

        <div className="contact-globe-live">
          <i />

          <div>
            <strong>
              {
                availability.data
                  .statusLabel
              }
            </strong>

            <span>
              {availability.status ===
              'live'
                ? 'Live profile status'
                : 'Availability fallback'}
            </span>
          </div>
        </div>
      </div>

      <div className="contact-globe-grid">
        <div className="contact-globe-stage">
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
                fov: 44,
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
                  intensity={0.52}
                />

                <pointLight
                  position={[
                    5,
                    5,
                    5,
                  ]}
                  color="#22d3ee"
                  intensity={4.2}
                />

                <pointLight
                  position={[
                    -5,
                    -2,
                    4,
                  ]}
                  color="#ff7a18"
                  intensity={3.4}
                />

                <CommunicationGlobeScene
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
            <div className="contact-globe-static">
              <FiGlobe />

              <strong>
                Communication Network
              </strong>

              <span>
                Reduced-motion view
              </span>
            </div>
          )}
        </div>

        <article className="contact-globe-info">
          <div className="contact-globe-channel-icon">
            <ActiveIcon />
          </div>

          <span>
            Selected channel
          </span>

          <h3>
            {activeChannel.label}
          </h3>

          <p>
            {activeChannel.value}
          </p>

          <a
            href={activeChannel.href}
            target={
              activeChannel.href
                .startsWith(
                  'http'
                )
                ? '_blank'
                : undefined
            }
            rel={
              activeChannel.href
                .startsWith(
                  'http'
                )
                ? 'noreferrer'
                : undefined
            }
            className="contact-globe-open"
          >
            Open{' '}
            {activeChannel.label}

            <FiArrowUpRight />
          </a>

          <div className="contact-globe-profile">
            <div>
              <FiMapPin />

              <section>
                <span>
                  Location
                </span>

                <strong>
                  {
                    availability.data
                      .location
                  }
                </strong>
              </section>
            </div>

            <div>
              <FiRadio />

              <section>
                <span>
                  Joining time
                </span>

                <strong>
                  {
                    availability.data
                      .joiningTime
                  }
                </strong>
              </section>
            </div>
          </div>

          <div className="contact-globe-modes">
            <strong>
              Work modes
            </strong>

            <div>
              {(
                availability.data
                  .workModes || []
              ).map(
                (mode) => (
                  <span key={mode}>
                    {mode}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="contact-globe-selector">
            {channels.map(
              (
                channel,
                index
              ) => {
                const Icon =
                  channel.icon

                return (
                  <button
                    key={
                      channel.label
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
                    <Icon />

                    <span>
                      {channel.label}
                    </span>
                  </button>
                )
              }
            )}
          </div>
        </article>
      </div>
    </section>
  )
}