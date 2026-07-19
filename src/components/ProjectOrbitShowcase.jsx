import React, {
  Suspense,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import {
  Canvas,
  useFrame,
} from '@react-three/fiber'
import {
  Float,
  RoundedBox,
  Sparkles,
} from '@react-three/drei'
import {
  MathUtils,
} from 'three'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiLayers,
} from 'react-icons/fi'
import ProjectEngineeringBadge from './ProjectEngineeringBadge'

const sceneColors = [
  {
    primary: '#ff7a18',
    secondary: '#22d3ee',
  },
  {
    primary: '#8b5cf6',
    secondary: '#f59e0b',
  },
  {
    primary: '#22d3ee',
    secondary: '#10b981',
  },
  {
    primary: '#f43f5e',
    secondary: '#8b5cf6',
  },
]

function FloatingFrame({
  position,
  rotation,
  scale,
  color,
  secondary,
  active,
}) {
  return (
    <Float
      speed={
        active
          ? 1.35
          : 0.9
      }
      rotationIntensity={
        active
          ? 0.28
          : 0.16
      }
      floatIntensity={
        active
          ? 0.55
          : 0.35
      }
    >
      <group
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <RoundedBox
          args={[
            2.4,
            1.45,
            0.12,
          ]}
          radius={0.08}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#07101b"
            metalness={0.75}
            roughness={0.26}
            emissive={color}
            emissiveIntensity={
              active
                ? 0.34
                : 0.12
            }
            transparent
            opacity={
              active
                ? 0.9
                : 0.62
            }
          />
        </RoundedBox>

        <mesh
          position={[
            -0.62,
            0.37,
            0.09,
          ]}
        >
          <boxGeometry
            args={[
              0.85,
              0.075,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.85}
          />
        </mesh>

        <mesh
          position={[
            -0.25,
            0.06,
            0.09,
          ]}
        >
          <boxGeometry
            args={[
              1.52,
              0.045,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color={secondary}
            transparent
            opacity={0.5}
          />
        </mesh>

        <mesh
          position={[
            -0.48,
            -0.2,
            0.09,
          ]}
        >
          <boxGeometry
            args={[
              1.04,
              0.04,
              0.025,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.28}
          />
        </mesh>

        <mesh
          position={[
            0.52,
            -0.38,
            0.09,
          ]}
        >
          <circleGeometry
            args={[
              0.2,
              24,
            ]}
          />

          <meshStandardMaterial
            color="#07111c"
            emissive={color}
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </Float>
  )
}

function ProjectOrbitScene({
  activeIndex,
}) {
  const groupRef =
    useRef(null)

  const color =
    sceneColors[
      activeIndex %
        sceneColors.length
    ]

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
          state.pointer.x * 0.16,
          3,
          delta
        )

      groupRef.current.rotation.x =
        MathUtils.damp(
          groupRef.current
            .rotation.x,
          state.pointer.y * 0.08,
          3,
          delta
        )

      groupRef.current.position.y =
        Math.sin(
          state.clock.elapsedTime *
            0.48
        ) * 0.1
    }
  )

  return (
    <group ref={groupRef}>
      <FloatingFrame
        position={[
          0,
          0.25,
          0.4,
        ]}
        rotation={[
          -0.05,
          0,
          0,
        ]}
        scale={1.2}
        color={color.primary}
        secondary={
          color.secondary
        }
        active
      />

      <FloatingFrame
        position={[
          -2.65,
          0.75,
          -1.3,
        ]}
        rotation={[
          0.08,
          0.48,
          -0.08,
        ]}
        scale={0.68}
        color={
          color.secondary
        }
        secondary={
          color.primary
        }
      />

      <FloatingFrame
        position={[
          2.65,
          -0.45,
          -1.4,
        ]}
        rotation={[
          -0.08,
          -0.5,
          0.08,
        ]}
        scale={0.66}
        color={
          color.secondary
        }
        secondary={
          color.primary
        }
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
          -1.1,
        ]}
      >
        <torusGeometry
          args={[
            3.4,
            0.018,
            8,
            160,
          ]}
        />

        <meshBasicMaterial
          color={color.primary}
          transparent
          opacity={0.36}
        />
      </mesh>

      <mesh
        rotation={[
          0.45,
          0.7,
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
          color={
            color.secondary
          }
          transparent
          opacity={0.2}
        />
      </mesh>

      <Sparkles
        count={36}
        scale={[
          8,
          5,
          5,
        ]}
        size={2}
        speed={0.18}
        opacity={0.55}
        color={color.primary}
      />
    </group>
  )
}

export default function ProjectOrbitShowcase({
  projects = [],
  eyebrow = 'Interactive Project Lab',
  title = 'Projects presented as digital products.',
  description =
    'Select a project to inspect its technology, development status, live deployment and case study.',
  id = 'project-orbit-showcase',
}) {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const safeProjects =
    useMemo(
      () =>
        Array.isArray(projects)
          ? projects.filter(Boolean)
          : [],
      [projects]
    )

  if (
    safeProjects.length === 0
  ) {
    return null
  }

  const activeProject =
    safeProjects[
      activeIndex %
        safeProjects.length
    ]

  const move = (
    direction
  ) => {
    setActiveIndex(
      (current) =>
        (
          current +
          direction +
          safeProjects.length
        ) %
        safeProjects.length
    )
  }

  return (
    <section
      id={id}
      className="project-orbit-section"
    >
      <div className="project-orbit-heading">
        <div>
          <span>
            <FiLayers />
            {eyebrow}
          </span>

          <h2>{title}</h2>

          <p>{description}</p>
        </div>

        <div className="project-orbit-navigation">
          <button
            type="button"
            onClick={() =>
              move(-1)
            }
            aria-label="Previous project"
          >
            <FiArrowLeft />
          </button>

          <span>
            {String(
              activeIndex + 1
            ).padStart(2, '0')}
            {' / '}
            {String(
              safeProjects.length
            ).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={() =>
              move(1)
            }
            aria-label="Next project"
          >
            <FiArrowRight />
          </button>
        </div>
      </div>

      <div className="project-orbit-grid">
        <div className="project-orbit-visual">
          <div className="project-orbit-canvas">
            <Canvas
              camera={{
                position: [
                  0,
                  0,
                  8.2,
                ],
                fov: 43,
                near: 0.1,
                far: 80,
              }}
              dpr={[
                1,
                1.35,
              ]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference:
                  'high-performance',
              }}
            >
              <Suspense
                fallback={null}
              >
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
                  intensity={4}
                />

                <pointLight
                  position={[
                    -5,
                    -2,
                    4,
                  ]}
                  color="#22d3ee"
                  intensity={3}
                />

                <ProjectOrbitScene
                  activeIndex={
                    activeIndex
                  }
                />
              </Suspense>
            </Canvas>
          </div>

          <AnimatePresence
            mode="wait"
          >
            <motion.div
              key={
                activeProject.id
              }
              initial={{
                opacity: 0,
                scale: 0.9,
                rotateY: -8,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                rotateY: 8,
                y: -20,
              }}
              transition={{
                duration: 0.55,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="project-orbit-browser"
            >
              <div className="project-orbit-browser-top">
                <div>
                  <i />
                  <i />
                  <i />
                </div>

                <span>
                  {activeProject.title}
                </span>
              </div>

              <div className="project-orbit-image">
                {activeProject.image ? (
                  <img
                    src={
                      activeProject.image
                    }
                    alt={`${activeProject.title} preview`}
                    loading="lazy"
                  />
                ) : (
                  <FiCode />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence
          mode="wait"
        >
          <motion.article
            key={
              activeProject.id
            }
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: 0.45,
            }}
            className="project-orbit-content"
          >
            <div className="project-orbit-number">
              {String(
                activeIndex + 1
              ).padStart(2, '0')}
            </div>

            <span className="project-orbit-category">
              {activeProject.category ||
                'Full Stack Project'}
            </span>

            <h3>
              {activeProject.title}
            </h3>

            <p>
              {activeProject
                .longDescription ||
                activeProject
                  .description}
            </p>

            <ProjectEngineeringBadge
              project={
                activeProject
              }
            />

            <div className="project-orbit-tech">
              {(
                activeProject.techStack ||
                []
              )
                .slice(0, 7)
                .map(
                  (technology) => (
                    <span
                      key={
                        technology
                      }
                    >
                      {technology}
                    </span>
                  )
                )}
            </div>

            <div className="project-orbit-actions">
              <Link
                to={`/projects/${activeProject.id}`}
              >
                Case Study
                <FiArrowRight />
              </Link>

              {activeProject.demo && (
                <a
                  href={
                    activeProject.demo
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                  <FiExternalLink />
                </a>
              )}

              {activeProject.github && (
                <a
                  href={
                    activeProject.github
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <FiGithub />
                </a>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="project-orbit-selector">
        {safeProjects.map(
          (
            project,
            index
          ) => (
            <button
              key={project.id}
              type="button"
              onClick={() =>
                setActiveIndex(
                  index
                )
              }
              className={
                activeIndex ===
                index
                  ? 'active'
                  : ''
              }
              aria-pressed={
                activeIndex ===
                index
              }
            >
              <span>
                {String(
                  index + 1
                ).padStart(
                  2,
                  '0'
                )}
              </span>

              <strong>
                {project.title}
              </strong>
            </button>
          )
        )}
      </div>
    </section>
  )
}