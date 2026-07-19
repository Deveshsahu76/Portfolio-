import React from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  motion,
} from 'framer-motion'
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCode,
  FiDownload,
  FiGitCommit,
  FiGithub,
  FiMapPin,
  FiTerminal,
  FiZap,
} from 'react-icons/fi'
import {
  FaLinkedin,
} from 'react-icons/fa'
import HomeCommandCenter3D from './three/HomeCommandCenter3D'
import ResumeLink from './ResumeLink'
import {
  AvailabilityPill,
} from './LiveProfileStatus'
import useEngineeringDashboard from '../hooks/useEngineeringDashboard'

const formatRelativeTime = (
  dateValue
) => {
  if (!dateValue) {
    return 'Syncing'
  }

  const timestamp =
    new Date(
      dateValue
    ).getTime()

  if (
    Number.isNaN(timestamp)
  ) {
    return 'Recently'
  }

  const minutes =
    Math.floor(
      (
        Date.now() -
        timestamp
      ) /
        60000
    )

  if (minutes < 1) {
    return 'Just now'
  }

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours =
    Math.floor(
      minutes / 60
    )

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days =
    Math.floor(
      hours / 24
    )

  if (days < 30) {
    return `${days}d ago`
  }

  return new Intl.DateTimeFormat(
    'en-IN',
    {
      dateStyle: 'medium',
    }
  ).format(
    new Date(dateValue)
  )
}

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.72,
      ease: [
        0.22,
        1,
        0.36,
        1,
      ],
    },
  },
}

export default function CinematicHomeHero({
  profileImage,
}) {
  const engineering =
    useEngineeringDashboard()

  const current =
    engineering.data
      .currentlyBuilding

  const summary =
    engineering.data.summary

  const showMetric = (
    value
  ) => {
    if (
      engineering.status ===
        'loading' &&
      Number(value || 0) === 0
    ) {
      return '—'
    }

    return Number(
      value || 0
    )
  }

  return (
    <section className="cinematic-hero">
      <div className="cinematic-hero-grid">
        <motion.div
          initial="hidden"
          animate="visible"
          className="cinematic-hero-copy"
        >
          <motion.div
            variants={reveal}
            className="cinematic-availability-row"
          >
            <AvailabilityPill />

            <span>
              B.Tech IT · 2027
            </span>
          </motion.div>

          <motion.div
            variants={reveal}
            className="cinematic-eyebrow"
          >
            <FiTerminal />
            MERN STACK DEVELOPER
          </motion.div>

          <motion.h1
            variants={reveal}
          >
            <span>DEVESH</span>
            <strong>SAHU</strong>
          </motion.h1>

          <motion.p
            variants={reveal}
            className="cinematic-hero-role"
          >
            Building interactive,
            deployable full-stack
            products with React,
            Node.js and MongoDB.
          </motion.p>

          <motion.div
            variants={reveal}
            className="cinematic-hero-actions"
          >
            <Link
              to="/projects"
              className="cinematic-primary-button"
            >
              Explore Projects
              <FiArrowRight />
            </Link>

            <Link
              to="/recruiter"
              className="cinematic-secondary-button"
            >
              <FiCalendar />
              Recruiter Hub
            </Link>

            <ResumeLink className="cinematic-icon-button">
              <FiDownload />
              <span>Resume</span>
            </ResumeLink>
          </motion.div>

          <motion.div
            variants={reveal}
            className="cinematic-social-row"
          >
            <a
              href="https://github.com/Deveshsahu76"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/devesh-sahu-560608270/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <span>
              <FiMapPin />
              India
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="cinematic-command-stage"
        >
          <div className="cinematic-stage-glow" />

          <HomeCommandCenter3D />

          <div className="cinematic-profile-composition">
            <div className="cinematic-profile-ring" />

            <img
              src={profileImage}
              alt="Devesh Sahu, MERN Stack Developer"
              loading="eager"
              fetchPriority="high"
            />

            <div className="cinematic-profile-label">
              <span>
                Developer Profile
              </span>

              <strong>
                Full Stack
              </strong>
            </div>
          </div>

          <div className="cinematic-live-terminal">
            <div className="cinematic-terminal-top">
              <div>
                <i />
                <i />
                <i />
              </div>

              <span>
                LIVE DEVELOPMENT
              </span>
            </div>

            <div className="cinematic-terminal-command">
              <FiCode />

              <div>
                <span>
                  Currently building
                </span>

                <strong>
                  {current?.name ||
                    'GitHub syncing'}
                </strong>
              </div>
            </div>

            <div className="cinematic-terminal-update">
              <FiGitCommit />

              <p>
                {current
                  ?.latestCommit
                  ?.message ||
                  current
                    ?.description ||
                  'Fetching current repository activity.'}
              </p>
            </div>

            <small>
              Updated{' '}
              {formatRelativeTime(
                current?.pushedAt
              )}
            </small>
          </div>

          <div className="cinematic-floating-chip cinematic-floating-chip-one">
            <FiZap />
            React UI
          </div>

          <div className="cinematic-floating-chip cinematic-floating-chip-two">
            <FiBriefcase />
            Recruiter Ready
          </div>
        </motion.div>
      </div>

      <div className="cinematic-live-metrics">
        <article>
          <span>
            Repositories
          </span>

          <strong>
            {showMetric(
              summary
                .publicRepositories
            )}
          </strong>
        </article>

        <article>
          <span>
            Active Projects
          </span>

          <strong>
            {showMetric(
              summary
                .activeRepositories
            )}
          </strong>
        </article>

        <article>
          <span>
            Recent Commits
          </span>

          <strong>
            {showMetric(
              summary
                .commitsLast30Days
            )}
          </strong>
        </article>

        <article>
          <span>
            Data Source
          </span>

          <strong className="cinematic-live-word">
            {engineering.status ===
            'live'
              ? 'LIVE'
              : engineering.status ===
                  'cached'
                ? 'CACHED'
                : 'SYNC'}
          </strong>
        </article>
      </div>
    </section>
  )
}