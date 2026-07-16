import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'

const isLocalDevelopment =
  typeof window !== 'undefined' &&
  (
    window.location.hostname ===
      'localhost' ||
    window.location.hostname ===
      '127.0.0.1'
  )

const API_URL =
  isLocalDevelopment
    ? 'http://localhost:5000'
    : (
        import.meta.env.VITE_API_URL ||
        'https://portfolio-backend-4b9u.onrender.com'
      )

const fallbackStats = {
  totalSolved: 170,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,

  profileUrl:
    'https://leetcode.com/u/deveshsahu567/',
}

export default function HomeStats() {
  const [
    leetcodeStats,
    setLeetcodeStats,
  ] = useState(fallbackStats)

  const [
    isLiveData,
    setIsLiveData,
  ] = useState(false)

  useEffect(() => {
    const controller =
      new AbortController()

    const loadStats = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/leetcode/stats`,
          {
            signal:
              controller.signal,
          }
        )

        const result =
          await response.json()

        if (
          !response.ok ||
          !result?.success ||
          !result?.data
        ) {
          throw new Error(
            result?.message ||
              'Failed to load LeetCode statistics.'
          )
        }

        setLeetcodeStats({
          totalSolved:
            Number(
              result.data.totalSolved ||
                0
            ),

          easySolved:
            Number(
              result.data.easySolved ||
                0
            ),

          mediumSolved:
            Number(
              result.data.mediumSolved ||
                0
            ),

          hardSolved:
            Number(
              result.data.hardSolved ||
                0
            ),

          profileUrl:
            result.data.profileUrl ||
            fallbackStats.profileUrl,
        })

        setIsLiveData(true)
      } catch (error) {
        if (
          error.name !==
          'AbortError'
        ) {
          console.error(
            'LeetCode stats error:',
            error.message
          )
        }
      }
    }

    loadStats()

    return () => {
      controller.abort()
    }
  }, [])

  const stats = useMemo(
    () => [
      {
        value: '4+',
        label: 'Projects shipped',
      },

      {
        value:
          `${leetcodeStats.totalSolved}+`,

        label:
          'LeetCode solved',

        href:
          leetcodeStats.profileUrl,

        title:
          isLiveData
            ? `Easy: ${leetcodeStats.easySolved} | Medium: ${leetcodeStats.mediumSolved} | Hard: ${leetcodeStats.hardSolved}`
            : 'Open LeetCode profile',
      },

      {
        value: 'MERN',
        label: 'Primary stack',
      },

      {
        value: 'Live',
        label: 'Deployments',
      },
    ],

    [
      isLiveData,
      leetcodeStats,
    ]
  )

  return (
    <section className="premium-stats-strip">
      {stats.map((stat) => {
        if (stat.href) {
          return (
            <a
              key={stat.label}
              href={stat.href}
              target="_blank"
              rel="noreferrer"
              title={stat.title}
              className="premium-stat-card"
              aria-label={`${stat.value} ${stat.label}`}
            >
              <strong>
                {stat.value}
              </strong>

              <span>
                {stat.label}
              </span>
            </a>
          )
        }

        return (
          <div
            key={stat.label}
            className="premium-stat-card"
          >
            <strong>
              {stat.value}
            </strong>

            <span>
              {stat.label}
            </span>
          </div>
        )
      })}
    </section>
  )
}