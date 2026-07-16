import React, {
  useEffect,
  useState,
} from 'react'
import {
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiSave,
  FiSettings,
} from 'react-icons/fi'
import {
  clearAvailabilityCache,
} from '../../hooks/useAvailability'

const getApiUrl = () => {
  if (
    typeof window !==
    'undefined'
  ) {
    const local =
      window.location.hostname ===
        'localhost' ||
      window.location.hostname ===
        '127.0.0.1'

    if (local) {
      return 'http://localhost:5000'
    }
  }

  return (
    import.meta.env.VITE_API_URL ||
    'https://portfolio-backend-4b9u.onrender.com'
  )
}

const defaultForm = {
  status: 'available',

  internship: true,
  freelance: true,
  interview: true,

  joiningTime:
    'Within 7 days',

  location: 'India',

  workModes:
    'Remote, Hybrid, On-site',

  preferredRoles:
    'Full Stack, Frontend, Backend',
}

const arrayFromInput = (
  value
) => {
  return value
    .split(',')
    .map((item) =>
      item.trim()
    )
    .filter(Boolean)
}

export default function AvailabilityManager({
  adminKey,
}) {
  const [form, setForm] =
    useState(defaultForm)

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] =
    useState('')

  const fetchAvailability =
    async () => {
      setLoading(true)

      try {
        const response =
          await fetch(
            `${getApiUrl()}/api/profile/availability`
          )

        const result =
          await response.json()

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              'Unable to load availability.'
          )
        }

        const data =
          result.data

        setForm({
          status:
            data.status ||
            'available',

          internship:
            Boolean(
              data.internship
            ),

          freelance:
            Boolean(
              data.freelance
            ),

          interview:
            Boolean(
              data.interview
            ),

          joiningTime:
            data.joiningTime ||
            'Within 7 days',

          location:
            data.location ||
            'India',

          workModes:
            (
              data.workModes ||
              []
            ).join(', '),

          preferredRoles:
            (
              data.preferredRoles ||
              []
            ).join(', '),
        })

        setMessage(
          'Availability loaded.'
        )
      } catch (error) {
        setMessage(
          error.message ||
            'Unable to load availability.'
        )
      } finally {
        setLoading(false)
      }
    }

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target

    setForm((current) => ({
      ...current,

      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))
  }

  const saveAvailability =
    async () => {
      if (!adminKey) {
        setMessage(
          'Please save admin key first.'
        )

        return
      }

      setLoading(true)

      setMessage(
        'Saving availability...'
      )

      try {
        const response =
          await fetch(
            `${getApiUrl()}/api/profile/availability`,
            {
              method: 'PUT',

              headers: {
                'Content-Type':
                  'application/json',

                'x-admin-key':
                  adminKey,
              },

              body:
                JSON.stringify({
                  status:
                    form.status,

                  internship:
                    form.internship,

                  freelance:
                    form.freelance,

                  interview:
                    form.interview,

                  joiningTime:
                    form.joiningTime,

                  location:
                    form.location,

                  workModes:
                    arrayFromInput(
                      form.workModes
                    ),

                  preferredRoles:
                    arrayFromInput(
                      form.preferredRoles
                    ),
                }),
            }
          )

        const result =
          await response.json()

        if (!response.ok) {
          throw new Error(
            result?.message ||
              'Unable to save availability.'
          )
        }

        clearAvailabilityCache()

        setMessage(
          'Availability updated across the portfolio.'
        )
      } catch (error) {
        setMessage(
          error.message ||
            'Unable to save availability.'
        )
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchAvailability()
  }, [])

  return (
    <section className="admin-profile-control">
      <div className="admin-profile-control-head">
        <div>
          <span>
            <FiSettings />
            Availability Manager
          </span>

          <h2>
            Control your public
            availability
          </h2>

          <p>
            Home, About aur Recruiter
            pages par ye information
            automatically update hogi.
          </p>
        </div>

        <button
          type="button"
          onClick={
            fetchAvailability
          }
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="admin-profile-form">
        <label>
          <FiCheckCircle />
          Current Status

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="available">
              Available
            </option>

            <option value="limited">
              Limited Availability
            </option>

            <option value="unavailable">
              Not Available
            </option>
          </select>
        </label>

        <label>
          <FiClock />
          Joining Time

          <input
            name="joiningTime"
            value={
              form.joiningTime
            }
            onChange={handleChange}
            placeholder="Within 7 days"
          />
        </label>

        <label>
          <FiMapPin />
          Location

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="India"
          />
        </label>

        <label>
          <FiBriefcase />
          Work Modes

          <input
            name="workModes"
            value={form.workModes}
            onChange={handleChange}
            placeholder="Remote, Hybrid, On-site"
          />
        </label>

        <label className="admin-profile-wide">
          Preferred Roles

          <input
            name="preferredRoles"
            value={
              form.preferredRoles
            }
            onChange={handleChange}
            placeholder="Full Stack, Frontend, Backend"
          />
        </label>
      </div>

      <div className="admin-profile-checkboxes">
        <label>
          <input
            type="checkbox"
            name="internship"
            checked={
              form.internship
            }
            onChange={handleChange}
          />

          Available for Internship
        </label>

        <label>
          <input
            type="checkbox"
            name="freelance"
            checked={
              form.freelance
            }
            onChange={handleChange}
          />

          Available for Freelance
        </label>

        <label>
          <input
            type="checkbox"
            name="interview"
            checked={
              form.interview
            }
            onChange={handleChange}
          />

          Available for Interview
        </label>
      </div>

      <button
        type="button"
        onClick={
          saveAvailability
        }
        disabled={loading}
        className="admin-profile-save"
      >
        <FiSave />

        {loading
          ? 'Saving...'
          : 'Save Availability'}
      </button>

      {message && (
        <div className="admin-profile-message">
          <FiCheckCircle />
          {message}
        </div>
      )}
    </section>
  )
}