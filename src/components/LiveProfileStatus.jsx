import React from 'react'
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiFileText,
  FiMapPin,
  FiMonitor,
  FiUsers,
} from 'react-icons/fi'
import useAvailability from '../hooks/useAvailability'
import useResumeUrl from '../hooks/useResumeUrl'
import ResumeLink from './ResumeLink'

const getAvailableFor = (
  availability
) => {
  const values = []

  if (
    availability.internship
  ) {
    values.push('Internship')
  }

  if (
    availability.freelance
  ) {
    values.push('Freelance')
  }

  if (
    availability.interview
  ) {
    values.push('Interview')
  }

  return values
}

const formatDate = (
  dateValue
) => {
  if (!dateValue) {
    return 'Recently updated'
  }

  try {
    return new Intl.DateTimeFormat(
      'en-IN',
      {
        dateStyle: 'medium',
      }
    ).format(
      new Date(dateValue)
    )
  } catch {
    return 'Recently updated'
  }
}

export function AvailabilityPill() {
  const { data } =
    useAvailability()

  return (
    <div
      className={`premium-status-pill live-availability-pill ${data.status}`}
      title={`Current status: ${data.statusLabel}`}
    >
      <span />
      {data.statusLabel}
    </div>
  )
}

export function AvailabilityLabel() {
  const { data } =
    useAvailability()

  return data.statusLabel
}

export function AvailabilityRoles() {
  const { data } =
    useAvailability()

  const roles =
    getAvailableFor(data)

  return (
    roles.join(' + ') ||
    'Currently unavailable'
  )
}

export function RecruiterAvailabilityList() {
  const { data } =
    useAvailability()

  const roles =
    getAvailableFor(data)

  const items = [
    {
      label:
        'Current Status',

      value:
        data.statusLabel,
    },

    {
      label: 'Joining',

      value:
        data.joiningTime,
    },

    {
      label:
        'Available For',

      value:
        roles.join(', ') ||
        'Not available',
    },

    {
      label: 'Work Mode',

      value:
        data.workModes
          .join(' / ') ||
        'Flexible',
    },

    {
      label: 'Location',

      value:
        data.location,
    },
  ]

  return (
    <>
      {items.map((item) => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </>
  )
}

export default function LiveProfileStatus() {
  const availability =
    useAvailability()

  const resume =
    useResumeUrl()

  const availableFor =
    getAvailableFor(
      availability.data
    )

  return (
    <section className="profilelive-section">
      <div className="profilelive-heading">
        <div>
          <span className="profilelive-kicker">
            <i />
            Live Profile Status
          </span>

          <h2>
            Current availability and
            recruiter-ready resume.
          </h2>

          <p>
            This information is synced
            from the portfolio admin
            dashboard.
          </p>
        </div>

        <div
          className={`profilelive-status ${availability.data.status}`}
        >
          <i />

          {
            availability.data
              .statusLabel
          }
        </div>
      </div>

      <div className="profilelive-grid">
        <article>
          <FiBriefcase />

          <span>
            Available For
          </span>

          <strong>
            {availableFor.join(
              ' · '
            ) ||
              'Currently unavailable'}
          </strong>
        </article>

        <article>
          <FiClock />

          <span>
            Joining Time
          </span>

          <strong>
            {
              availability.data
                .joiningTime
            }
          </strong>
        </article>

        <article>
          <FiMonitor />

          <span>
            Work Mode
          </span>

          <strong>
            {availability.data
              .workModes
              .join(' · ') ||
              'Flexible'}
          </strong>
        </article>

        <article>
          <FiMapPin />

          <span>
            Location
          </span>

          <strong>
            {
              availability.data
                .location
            }
          </strong>
        </article>
      </div>

      <div className="profilelive-resume">
        <div className="profilelive-resume-icon">
          <FiFileText />
        </div>

        <div>
          <span>
            Latest Resume
          </span>

          <strong>
            Version {resume.version}
          </strong>

          <small>
            Updated{' '}
            {formatDate(
              resume.updatedAt
            )}
          </small>
        </div>

        <ResumeLink className="profilelive-resume-button">
          <FiDownload />
          Open Resume
        </ResumeLink>
      </div>

      <div className="profilelive-trust">
        <div>
          <FiCheckCircle />
          Live availability
        </div>

        <div>
          <FiCalendar />
          Interview ready
        </div>

        <div>
          <FiUsers />
          Recruiter friendly
        </div>
      </div>
    </section>
  )
}