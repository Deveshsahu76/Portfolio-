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
  MathUtils,
} from 'three'
import {
  FiActivity,
  FiCode,
  FiGithub,
  FiLayers,
  FiZap,
} from 'react-icons/fi'
import useAdaptive3D from '../../hooks/useAdaptive3D'
import useEngineeringDashboard from '../../hooks/useEngineeringDashboard'

const categoryColors = {
  Frontend: '#22d3ee',
  Backend: '#ff7a18',
  Database: '#10b981',
  Tools: '#8b5cf6',
  Core: '#f43f5e',
}

const getNodePosition = (
  index,
  total
) => {
  const safeTotal =
    Math.max(total, 1)

  const angle =
    (
      index /
      safeTotal
    ) *
    Math.PI *
    2

  const radius =
    index % 2 === 0
      ? 2.25
      : 2.9

  return [
    Math.cos(angle) *
      radius,

    Math.sin(
      angle * 1.7
    ) * 1.05,

    Math.sin(angle) *
      radius,
  ]
}

function SkillNode({
  skill,
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

  const color =
    categoryColors[
      skill.category
    ] || '#22d3ee'

  const position =
    getNodePosition(
      index,
      total
    )

  useFrame(
    (
      state,
      delta
    ) => {
      if (!nodeRef.current) {
        return
      }

      const targetScale =
        selected
          ? 1.34
          : hovered
            ? 1.16
            : 1

      nodeRef.current.scale.x =
        MathUtils.damp(
          nodeRef.current.scale.x,
          targetScale,
          6,
          delta
        )

      nodeRef.current.scale.y =
        MathUtils.damp(
          nodeRef.current.scale.y,
          targetScale,
          6,
          delta
        )

      nodeRef.current.scale.z =
        MathUtils.damp(
          nodeRef.current.scale.z,
          targetScale,
          6,
          delta
        )

      nodeRef.current.rotation.y +=
        delta *
        (
          0.3 +
          index * 0.012
        )

      nodeRef.current.position.y =
        position[1] +
        Math.sin(
          state.clock.elapsedTime *
            (
              0.65 +
              index * 0.025
            ) +
            index
        ) *
          0.08
    }
  )

  return (
    <Float
      speed={
        0.9 +
        index * 0.04
      }
      rotationIntensity={0.2}
      floatIntensity={0.35}
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
          <icosahedronGeometry
            args={[
              selected
                ? 0.3
                : 0.23,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#07111c"
            metalness={0.7}
            roughness={0.22}
            emissive={color}
            emissiveIntensity={
              selected
                ? 1.7
                : hovered
                  ? 1.25
                  : 0.82
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
                ? 0.5
                : 0.4,
              0.012,
              8,
              70,
            ]}
          />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={
              selected
                ? 0.95
                : 0.48
            }
          />
        </mesh>

        <Html
          center
          distanceFactor={8}
          position={[
            0,
            -0.52,
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
                ? 'skill3d-node-label active'
                : 'skill3d-node-label'
            }
          >
            {skill.name}
          </span>
        </Html>
      </group>
    </Float>
  )
}

function SkillUniverseScene({
  skills,
  activeIndex,
  onSelect,
}) {
  const universeRef =
    useRef(null)

  useFrame(
    (
      state,
      delta
    ) => {
      if (!universeRef.current) {
        return
      }

      universeRef.current.rotation.y +=
        delta * 0.055

      universeRef.current.rotation.x =
        MathUtils.damp(
          universeRef.current
            .rotation.x,

          state.pointer.y *
            0.08,

          3,
          delta
        )

      universeRef.current.rotation.z =
        MathUtils.damp(
          universeRef.current
            .rotation.z,

          state.pointer.x *
            -0.04,

          3,
          delta
        )
    }
  )

  return (
    <group ref={universeRef}>
      <Float
        speed={0.8}
        rotationIntensity={0.22}
        floatIntensity={0.35}
      >
        <group>
          <mesh>
            <icosahedronGeometry
              args={[
                0.92,
                2,
              ]}
            />

            <meshStandardMaterial
              color="#06111c"
              wireframe
              emissive="#22d3ee"
              emissiveIntensity={0.78}
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
                1.4,
                0.025,
                8,
                120,
              ]}
            />

            <meshBasicMaterial
              color="#ff7a18"
              transparent
              opacity={0.55}
            />
          </mesh>

          <mesh
            rotation={[
              0.8,
              0.4,
              0.2,
            ]}
          >
            <torusGeometry
              args={[
                1.72,
                0.015,
                8,
                130,
              ]}
            />

            <meshBasicMaterial
              color="#8b5cf6"
              transparent
              opacity={0.38}
            />
          </mesh>
        </group>
      </Float>

      {skills.map(
        (
          skill,
          index
        ) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            index={index}
            total={skills.length}
            selected={
              index ===
              activeIndex
            }
            onSelect={onSelect}
          />
        )
      )}

      <Sparkles
        count={55}
        scale={[
          9,
          6,
          8,
        ]}
        size={2}
        speed={0.18}
        opacity={0.6}
        color="#22d3ee"
      />
    </group>
  )
}

export default function SkillUniverse3D({
  skills = [],
}) {
  const visual =
    useAdaptive3D()

  const engineering =
    useEngineeringDashboard()

  const visibleSkills =
    useMemo(
      () =>
        Array.isArray(skills)
          ? skills.slice(0, 12)
          : [],
      [skills]
    )

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  if (
    visibleSkills.length === 0
  ) {
    return null
  }

  const activeSkill =
    visibleSkills[
      activeIndex
    ] ||
    visibleSkills[0]

  const ActiveIcon =
    activeSkill.icon ||
    FiCode

  const liveLanguages =
    engineering.data
      .topLanguages
      .slice(0, 5)

  return (
    <section className="skills-universe-section">
      <div className="skills-universe-heading">
        <div>
          <span>
            <FiZap />
            Interactive Skill Universe
          </span>

          <h2>
            Technologies connected
            like an engineering
            ecosystem.
          </h2>

          <p>
            Select a technology to
            review where it is used,
            its current learning level
            and supporting project
            evidence.
          </p>
        </div>

        <div className="skills-universe-source">
          <FiGithub />

          <div>
            <strong>
              GitHub language data
            </strong>

            <span>
              {engineering.status ===
              'live'
                ? 'Live repository sync'
                : engineering.status ===
                    'cached'
                  ? 'Cached repository data'
                  : 'Repository data syncing'}
            </span>
          </div>
        </div>
      </div>

      <div className="skills-universe-grid">
        <div className="skills-universe-stage">
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
                fov: 45,
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
                      1.45,
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
                  intensity={4}
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

                <SkillUniverseScene
                  skills={
                    visual.lowQuality
                      ? visibleSkills.slice(
                          0,
                          8
                        )
                      : visibleSkills
                  }
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
            <div className="skills-universe-static">
              <FiLayers />

              <strong>
                MERN Technology
                Ecosystem
              </strong>

              <span>
                Reduced-motion view
              </span>
            </div>
          )}
        </div>

        <article className="skills-universe-info">
          <div className="skills-universe-info-top">
            <div>
              <ActiveIcon />
            </div>

            <span>
              {activeSkill.category}
            </span>
          </div>

          <h3>
            {activeSkill.name}
          </h3>

          <p>
            {activeSkill.desc}
          </p>

          <div className="skills-universe-level">
            <div>
              <span>
                Self-assessed
                confidence
              </span>

              <strong>
                {activeSkill.level}%
              </strong>
            </div>

            <div>
              <i
                style={{
                  width:
                    `${activeSkill.level}%`,
                }}
              />
            </div>

            <small>
              {activeSkill.status}
            </small>
          </div>

          <div className="skills-universe-proof">
            <strong>
              Used in
            </strong>

            <div>
              {(
                activeSkill.usedIn ||
                []
              ).map(
                (project) => (
                  <span key={project}>
                    {project}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="skills-universe-selector">
            {visibleSkills.map(
              (
                skill,
                index
              ) => (
                <button
                  key={skill.name}
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
                  {skill.name}
                </button>
              )
            )}
          </div>
        </article>
      </div>

      <div className="skills-universe-live">
        <div>
          <FiActivity />

          <div>
            <span>
              Live repository
              languages
            </span>

            <strong>
              Usage calculated from
              GitHub repositories
            </strong>
          </div>
        </div>

        <section>
          {liveLanguages.map(
            (language) => (
              <article
                key={language.name}
              >
                <div>
                  <strong>
                    {language.name}
                  </strong>

                  <span>
                    {
                      language.percentage
                    }%
                  </span>
                </div>

                <div>
                  <i
                    style={{
                      width:
                        `${Math.max(
                          language.percentage,
                          2
                        )}%`,
                    }}
                  />
                </div>
              </article>
            )
          )}

          {liveLanguages.length ===
            0 && (
            <p>
              GitHub language data is
              currently syncing.
            </p>
          )}
        </section>
      </div>
    </section>
  )
}