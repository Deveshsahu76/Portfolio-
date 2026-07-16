import express from 'express'

const router = express.Router()

const GITHUB_API_URL =
  'https://api.github.com'

const CACHE_TIME_MS =
  20 * 60 * 1000

let cachedOverview = null
let cacheExpiresAt = 0

const getGitHubHeaders = () => {
  const headers = {
    Accept:
      'application/vnd.github+json',

    'X-GitHub-Api-Version':
      '2022-11-28',

    'User-Agent':
      'Devesh-Sahu-Portfolio',
  }

  const token = String(
    process.env.GITHUB_TOKEN || ''
  ).trim()

  if (token) {
    headers.Authorization =
      `Bearer ${token}`
  }

  return headers
}

const fetchGitHubJson = async (
  endpoint
) => {
  const controller =
    new AbortController()

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 12000)

  try {
    const response = await fetch(
      `${GITHUB_API_URL}${endpoint}`,
      {
        headers: getGitHubHeaders(),
        signal: controller.signal,
      }
    )

    const result =
      await response
        .json()
        .catch(() => null)

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `GitHub request failed with status ${response.status}.`
      )
    }

    return result
  } finally {
    clearTimeout(timeoutId)
  }
}

const formatEvent = (event) => {
  const repositoryName =
    event?.repo?.name || ''

  const repositoryUrl =
    repositoryName
      ? `https://github.com/${repositoryName}`
      : 'https://github.com/Deveshsahu76'

  const eventType =
    String(event?.type || '')
      .replace(/Event$/, '')

  let title =
    `${eventType} activity`

  let description =
    repositoryName

  if (event?.type === 'PushEvent') {
    const commitCount =
      event?.payload?.commits?.length || 0

    const branch =
      String(
        event?.payload?.ref || ''
      ).replace('refs/heads/', '')

    title =
      `Pushed ${commitCount} ${
        commitCount === 1
          ? 'commit'
          : 'commits'
      }`

    description =
      branch
        ? `${repositoryName} · ${branch}`
        : repositoryName
  }

  if (
    event?.type ===
    'CreateEvent'
  ) {
    const refType =
      event?.payload?.ref_type ||
      'resource'

    title =
      `Created ${refType}`

    description =
      repositoryName
  }

  if (
    event?.type ===
    'PullRequestEvent'
  ) {
    const action =
      event?.payload?.action ||
      'updated'

    title =
      `${action} pull request`

    description =
      repositoryName
  }

  if (
    event?.type ===
    'IssuesEvent'
  ) {
    const action =
      event?.payload?.action ||
      'updated'

    title =
      `${action} issue`

    description =
      repositoryName
  }

  if (
    event?.type ===
    'WatchEvent'
  ) {
    title =
      'Starred repository'

    description =
      repositoryName
  }

  if (
    event?.type ===
    'ForkEvent'
  ) {
    title =
      'Forked repository'

    description =
      repositoryName
  }

  return {
    id: event?.id,
    type: eventType,
    title,
    description,
    repositoryName,
    repositoryUrl,
    createdAt:
      event?.created_at || null,
  }
}

const buildGitHubOverview = async (
  username
) => {
  const encodedUsername =
    encodeURIComponent(username)

  const [
    profile,
    repositories,
    events,
  ] = await Promise.all([
    fetchGitHubJson(
      `/users/${encodedUsername}`
    ),

    fetchGitHubJson(
      `/users/${encodedUsername}/repos?per_page=100&type=owner&sort=updated`
    ),

    fetchGitHubJson(
      `/users/${encodedUsername}/events/public?per_page=15`
    ),
  ])

  const ownRepositories =
    Array.isArray(repositories)
      ? repositories.filter(
          (repository) =>
            !repository.fork
        )
      : []

  const recentRepositories =
    ownRepositories
      .slice(0, 6)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description:
          repository.description || '',
        url: repository.html_url,
        homepage:
          repository.homepage || '',
        language:
          repository.language ||
          'Mixed',
        stars:
          Number(
            repository.stargazers_count ||
              0
          ),
        forks:
          Number(
            repository.forks_count ||
              0
          ),
        updatedAt:
          repository.updated_at,
        pushedAt:
          repository.pushed_at,
      }))

  const totalStars =
    ownRepositories.reduce(
      (total, repository) =>
        total +
        Number(
          repository.stargazers_count ||
            0
        ),
      0
    )

  const totalForks =
    ownRepositories.reduce(
      (total, repository) =>
        total +
        Number(
          repository.forks_count ||
            0
        ),
      0
    )

  const languageCounts = {}

  ownRepositories.forEach(
    (repository) => {
      const language =
        repository.language

      if (!language) return

      languageCounts[language] =
        (languageCounts[language] ||
          0) + 1
    }
  )

  const topLanguages =
    Object.entries(languageCounts)
      .sort(
        (first, second) =>
          second[1] - first[1]
      )
      .slice(0, 5)
      .map(
        ([name, repositoryCount]) => ({
          name,
          repositoryCount,
        })
      )

  const recentActivity =
    Array.isArray(events)
      ? events
          .slice(0, 6)
          .map(formatEvent)
      : []

  const latestRepository =
    recentRepositories[0] || null

  const lastActivityAt =
    recentActivity[0]?.createdAt ||
    latestRepository?.pushedAt ||
    profile.updated_at ||
    null

  return {
    username:
      profile.login || username,

    name:
      profile.name ||
      profile.login ||
      username,

    avatarUrl:
      profile.avatar_url || '',

    profileUrl:
      profile.html_url ||
      `https://github.com/${username}`,

    bio:
      profile.bio || '',

    followers:
      Number(
        profile.followers || 0
      ),

    following:
      Number(
        profile.following || 0
      ),

    publicRepositories:
      Number(
        profile.public_repos || 0
      ),

    totalStars,
    totalForks,
    lastActivityAt,
    latestRepository,
    topLanguages,
    recentRepositories,
    recentActivity,

    updatedAt:
      new Date().toISOString(),
  }
}

router.get(
  '/github/overview',
  async (req, res) => {
    const username = String(
      process.env.GITHUB_USERNAME ||
        'Deveshsahu76'
    ).trim()

    res.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=1200, stale-while-revalidate=86400'
    )

    if (
      cachedOverview &&
      Date.now() < cacheExpiresAt
    ) {
      return res.status(200).json({
        success: true,
        cached: true,
        stale: false,
        data: cachedOverview,
      })
    }

    try {
      const overview =
        await buildGitHubOverview(
          username
        )

      cachedOverview = overview

      cacheExpiresAt =
        Date.now() +
        CACHE_TIME_MS

      return res.status(200).json({
        success: true,
        cached: false,
        stale: false,
        data: overview,
      })
    } catch (error) {
      console.error(
        'GitHub overview error:',
        error.message
      )

      if (cachedOverview) {
        return res.status(200).json({
          success: true,
          cached: true,
          stale: true,

          message:
            'Showing cached GitHub information.',

          data: cachedOverview,
        })
      }

      return res.status(502).json({
        success: false,

        message:
          'GitHub activity is temporarily unavailable.',
      })
    }
  }
)

export default router