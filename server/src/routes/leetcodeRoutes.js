import express from 'express'

const router = express.Router()

const LEETCODE_GRAPHQL_URL =
  'https://leetcode.com/graphql/'

const CACHE_TIME_MS =
  30 * 60 * 1000

let cachedStats = null
let cacheExpiryTime = 0

const getSolvedCount = (
  submissionStats,
  difficulty
) => {
  const selectedStat = submissionStats.find(
    (item) =>
      String(item?.difficulty || '').toLowerCase() ===
      difficulty.toLowerCase()
  )

  return Number(selectedStat?.count || 0)
}

const fetchLeetCodeStats = async (username) => {
  const controller =
    new AbortController()

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 12000)

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username

        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `

  try {
    const response = await fetch(
      LEETCODE_GRAPHQL_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Accept:
            'application/json',

          Origin:
            'https://leetcode.com',

          Referer:
            `https://leetcode.com/u/${username}/`,

          'User-Agent':
            'Mozilla/5.0 Portfolio LeetCode Stats',

          'x-requested-with':
            'XMLHttpRequest',
        },

        body: JSON.stringify({
          query,

          variables: {
            username,
          },
        }),

        signal: controller.signal,
      }
    )

    if (!response.ok) {
      throw new Error(
        `LeetCode request failed: ${response.status}`
      )
    }

    const result =
      await response.json()

    if (
      Array.isArray(result?.errors) &&
      result.errors.length > 0
    ) {
      throw new Error(
        result.errors[0]?.message ||
          'LeetCode returned an error.'
      )
    }

    const matchedUser =
      result?.data?.matchedUser

    if (!matchedUser) {
      throw new Error(
        'LeetCode profile not found.'
      )
    }

    const submissionStats =
      matchedUser?.submitStats
        ?.acSubmissionNum || []

    const totalSolved =
      getSolvedCount(
        submissionStats,
        'All'
      )

    const easySolved =
      getSolvedCount(
        submissionStats,
        'Easy'
      )

    const mediumSolved =
      getSolvedCount(
        submissionStats,
        'Medium'
      )

    const hardSolved =
      getSolvedCount(
        submissionStats,
        'Hard'
      )

    return {
      username:
        matchedUser.username ||
        username,

      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,

      profileUrl:
        `https://leetcode.com/u/${username}/`,

      updatedAt:
        new Date().toISOString(),
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

router.get(
  '/leetcode/stats',
  async (req, res) => {
    const username = String(
      process.env.LEETCODE_USERNAME ||
        'deveshsahu567'
    ).trim()

    res.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400'
    )

    if (
      cachedStats &&
      Date.now() < cacheExpiryTime
    ) {
      return res.status(200).json({
        success: true,
        cached: true,
        stale: false,
        data: cachedStats,
      })
    }

    try {
      const stats =
        await fetchLeetCodeStats(
          username
        )

      cachedStats = stats

      cacheExpiryTime =
        Date.now() +
        CACHE_TIME_MS

      return res.status(200).json({
        success: true,
        cached: false,
        stale: false,
        data: stats,
      })
    } catch (error) {
      console.error(
        'LeetCode stats error:',
        error.message
      )

      if (cachedStats) {
        return res.status(200).json({
          success: true,
          cached: true,
          stale: true,

          message:
            'Showing cached LeetCode statistics.',

          data: cachedStats,
        })
      }

      return res.status(502).json({
        success: false,

        message:
          'LeetCode statistics are temporarily unavailable.',
      })
    }
  }
)

export default router