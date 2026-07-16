import express from 'express'

const router = express.Router()

const GITHUB_API_URL =
  'https://api.github.com'

const CACHE_TIME_MS =
  30 * 60 * 1000

const MAX_LANGUAGE_REPOSITORIES = 8
const MAX_BUILD_REPOSITORIES = 8

let cachedDashboard = null
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

  const token =
    String(
      process.env.GITHUB_TOKEN ||
        ''
    ).trim()

  if (token) {
    headers.Authorization =
      `Bearer ${token}`
  }

  return headers
}

const fetchGitHubJson = async (
  endpoint,
  {
    optional = false,
  } = {}
) => {
  const controller =
    new AbortController()

  const timeoutId =
    setTimeout(() => {
      controller.abort()
    }, 15000)

  try {
    const response =
      await fetch(
        `${GITHUB_API_URL}${endpoint}`,
        {
          headers:
            getGitHubHeaders(),

          signal:
            controller.signal,
        }
      )

    const result =
      await response
        .json()
        .catch(() => null)

    if (!response.ok) {
      if (optional) {
        return null
      }

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

const fetchOptionalGitHubJson =
  async (endpoint) => {
    try {
      return await fetchGitHubJson(
        endpoint,
        {
          optional: true,
        }
      )
    } catch {
      return null
    }
  }

const getDaysSince = (
  dateValue
) => {
  if (!dateValue) {
    return Number.POSITIVE_INFINITY
  }

  const time =
    new Date(dateValue).getTime()

  if (Number.isNaN(time)) {
    return Number.POSITIVE_INFINITY
  }

  return Math.max(
    0,
    Math.floor(
      (Date.now() - time) /
        86400000
    )
  )
}

const getDevelopmentStatus = (
  repository
) => {
  if (repository.archived) {
    return {
      state: 'archived',
      label: 'Archived',
      description:
        'Repository is archived.',
    }
  }

  const days =
    getDaysSince(
      repository.pushed_at
    )

  if (days <= 7) {
    return {
      state: 'active',
      label: 'Active Development',
      description:
        'Updated within the last 7 days.',
    }
  }

  if (days <= 30) {
    return {
      state: 'maintained',
      label: 'Maintained',
      description:
        'Updated within the last 30 days.',
    }
  }

  if (days <= 180) {
    return {
      state: 'stable',
      label: 'Stable',
      description:
        'No recent changes, but the repository is maintained.',
    }
  }

  return {
    state: 'dormant',
    label: 'Dormant',
    description:
      'No code push during the last 180 days.',
  }
}

const normalizeBuildStatus = (
  payload
) => {
  if (!payload) {
    return {
      state: 'unavailable',
      label: 'Build Unavailable',
      conclusion: null,
      workflowName: '',
      branch: '',
      url: '',
      updatedAt: null,
    }
  }

  const run =
    Array.isArray(
      payload.workflow_runs
    )
      ? payload.workflow_runs[0]
      : null

  if (!run) {
    return {
      state: 'no-workflow',
      label: 'No Workflow',
      conclusion: null,
      workflowName: '',
      branch: '',
      url: '',
      updatedAt: null,
    }
  }

  if (
    run.status !==
    'completed'
  ) {
    return {
      state: 'running',
      label: 'Build Running',
      conclusion:
        run.conclusion || null,

      workflowName:
        run.name || 'GitHub Actions',

      branch:
        run.head_branch || '',

      url:
        run.html_url || '',

      updatedAt:
        run.updated_at || null,
    }
  }

  if (
    run.conclusion ===
    'success'
  ) {
    return {
      state: 'passing',
      label: 'Build Passing',
      conclusion:
        run.conclusion,

      workflowName:
        run.name || 'GitHub Actions',

      branch:
        run.head_branch || '',

      url:
        run.html_url || '',

      updatedAt:
        run.updated_at || null,
    }
  }

  if (
    [
      'failure',
      'timed_out',
      'action_required',
      'startup_failure',
    ].includes(
      run.conclusion
    )
  ) {
    return {
      state: 'failing',
      label: 'Build Failed',
      conclusion:
        run.conclusion,

      workflowName:
        run.name || 'GitHub Actions',

      branch:
        run.head_branch || '',

      url:
        run.html_url || '',

      updatedAt:
        run.updated_at || null,
    }
  }

  return {
    state: 'completed',
    label: 'Build Completed',
    conclusion:
      run.conclusion || null,

    workflowName:
      run.name || 'GitHub Actions',

    branch:
      run.head_branch || '',

    url:
      run.html_url || '',

    updatedAt:
      run.updated_at || null,
  }
}

const extractRecentCommits = (
  events
) => {
  if (!Array.isArray(events)) {
    return []
  }

  const commits = []

  events.forEach((event) => {
    if (
      event?.type !==
      'PushEvent'
    ) {
      return
    }

    const repositoryFullName =
      event?.repo?.name || ''

    const branch =
      String(
        event?.payload?.ref ||
          ''
      ).replace(
        'refs/heads/',
        ''
      )

    const eventCommits =
      Array.isArray(
        event?.payload?.commits
      )
        ? event.payload.commits
        : []

    eventCommits.forEach(
      (commit) => {
        const sha =
          commit?.sha || ''

        if (!sha) return

        const message =
          String(
            commit?.message ||
              'Repository update'
          )
            .split('\n')[0]
            .trim()

        commits.push({
          sha,

          shortSha:
            sha.slice(0, 7),

          message,

          repositoryFullName,

          repositoryName:
            repositoryFullName
              .split('/')
              .pop() || '',

          repositoryUrl:
            repositoryFullName
              ? `https://github.com/${repositoryFullName}`
              : '',

          url:
            repositoryFullName
              ? `https://github.com/${repositoryFullName}/commit/${sha}`
              : '',

          branch,

          author:
            commit?.author?.name ||
            commit?.author?.email ||
            '',

          createdAt:
            event?.created_at ||
            null,
        })
      }
    )
  })

  const uniqueCommits =
    Array.from(
      new Map(
        commits.map(
          (commit) => [
            commit.sha,
            commit,
          ]
        )
      ).values()
    )

  return uniqueCommits
    .sort(
      (first, second) =>
        new Date(
          second.createdAt || 0
        ) -
        new Date(
          first.createdAt || 0
        )
    )
    .slice(0, 15)
}

const buildLanguageAnalytics = (
  repositories,
  languagePayloads
) => {
  const bytesByLanguage = {}
  const repositoriesByLanguage = {}

  repositories.forEach(
    (repository, index) => {
      const payload =
        languagePayloads[index]

      if (
        !payload ||
        typeof payload !==
          'object'
      ) {
        return
      }

      Object.entries(
        payload
      ).forEach(
        ([language, bytes]) => {
          const safeBytes =
            Number(bytes || 0)

          if (safeBytes <= 0) {
            return
          }

          bytesByLanguage[language] =
            (
              bytesByLanguage[
                language
              ] || 0
            ) + safeBytes

          if (
            !repositoriesByLanguage[
              language
            ]
          ) {
            repositoriesByLanguage[
              language
            ] = new Set()
          }

          repositoriesByLanguage[
            language
          ].add(
            repository.full_name
          )
        }
      )
    }
  )

  let source =
    'github-language-bytes'

  if (
    Object.keys(
      bytesByLanguage
    ).length === 0
  ) {
    source =
      'repository-primary-language'

    repositories.forEach(
      (repository) => {
        const language =
          repository.language

        if (!language) return

        bytesByLanguage[language] =
          (
            bytesByLanguage[
              language
            ] || 0
          ) + 1

        if (
          !repositoriesByLanguage[
            language
          ]
        ) {
          repositoriesByLanguage[
            language
          ] = new Set()
        }

        repositoriesByLanguage[
          language
        ].add(
          repository.full_name
        )
      }
    )
  }

  const total =
    Object.values(
      bytesByLanguage
    ).reduce(
      (sum, value) =>
        sum +
        Number(value || 0),
      0
    )

  const languages =
    Object.entries(
      bytesByLanguage
    )
      .sort(
        (first, second) =>
          second[1] - first[1]
      )
      .slice(0, 8)
      .map(
        ([name, bytes]) => ({
          name,

          bytes,

          percentage:
            total > 0
              ? Number(
                  (
                    (bytes / total) *
                    100
                  ).toFixed(1)
                )
              : 0,

          repositoryCount:
            repositoriesByLanguage[
              name
            ]?.size || 0,
        })
      )

  return {
    source,
    languages,
  }
}

const buildEngineeringDashboard =
  async (username) => {
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
        `/users/${encodedUsername}/repos?per_page=100&type=owner&sort=pushed`
      ),

      fetchGitHubJson(
        `/users/${encodedUsername}/events/public?per_page=100`
      ),
    ])

    const ownRepositories =
      Array.isArray(repositories)
        ? repositories
            .filter(
              (repository) =>
                !repository.fork
            )
            .sort(
              (first, second) =>
                new Date(
                  second.pushed_at ||
                    second.updated_at ||
                    0
                ) -
                new Date(
                  first.pushed_at ||
                    first.updated_at ||
                    0
                )
            )
        : []

    const languageRepositories =
      ownRepositories
        .filter(
          (repository) =>
            !repository.archived &&
            Number(
              repository.size || 0
            ) > 0
        )
        .slice(
          0,
          MAX_LANGUAGE_REPOSITORIES
        )

    const buildRepositories =
      ownRepositories
        .filter(
          (repository) =>
            !repository.archived
        )
        .slice(
          0,
          MAX_BUILD_REPOSITORIES
        )

    const [
      languagePayloads,
      buildPayloads,
    ] = await Promise.all([
      Promise.all(
        languageRepositories.map(
          (repository) =>
            fetchOptionalGitHubJson(
              `/repos/${repository.full_name}/languages`
            )
        )
      ),

      Promise.all(
        buildRepositories.map(
          (repository) =>
            fetchOptionalGitHubJson(
              `/repos/${repository.full_name}/actions/runs?per_page=1`
            )
        )
      ),
    ])

    const languageAnalytics =
      buildLanguageAnalytics(
        languageRepositories,
        languagePayloads
      )

    const buildMap =
      new Map()

    buildRepositories.forEach(
      (repository, index) => {
        buildMap.set(
          repository.full_name
            .toLowerCase(),

          normalizeBuildStatus(
            buildPayloads[index]
          )
        )
      }
    )

    const recentCommits =
      extractRecentCommits(
        events
      )

    const repositoryData =
      ownRepositories
        .slice(0, 20)
        .map((repository) => {
          const developmentStatus =
            getDevelopmentStatus(
              repository
            )

          return {
            id:
              repository.id,

            name:
              repository.name,

            fullName:
              repository.full_name,

            description:
              repository.description ||
              '',

            url:
              repository.html_url,

            homepage:
              repository.homepage ||
              '',

            primaryLanguage:
              repository.language ||
              'Mixed',

            defaultBranch:
              repository.default_branch ||
              'main',

            stars:
              Number(
                repository
                  .stargazers_count ||
                  0
              ),

            forks:
              Number(
                repository
                  .forks_count ||
                  0
              ),

            openIssues:
              Number(
                repository
                  .open_issues_count ||
                  0
              ),

            archived:
              Boolean(
                repository.archived
              ),

            pushedAt:
              repository.pushed_at ||
              null,

            updatedAt:
              repository.updated_at ||
              null,

            developmentStatus,

            build:
              buildMap.get(
                repository.full_name
                  .toLowerCase()
              ) || {
                state:
                  'not-checked',

                label:
                  'Not Checked',

                conclusion:
                  null,

                workflowName: '',
                branch: '',
                url: '',
                updatedAt: null,
              },
          }
        })

    const activeCandidates =
      repositoryData.filter(
        (repository) =>
          !repository.archived
      )

    const nonPortfolioCandidates =
      activeCandidates.filter(
        (repository) =>
          ![
            'portfolio',
            'portfolio-',
          ].includes(
            repository.name
              .toLowerCase()
          )
      )

    const currentlyBuilding =
      nonPortfolioCandidates[0] ||
      activeCandidates[0] ||
      null

    const currentRepository =
      currentlyBuilding
        ? {
            ...currentlyBuilding,

            latestCommit:
              recentCommits.find(
                (commit) =>
                  commit
                    .repositoryFullName
                    .toLowerCase() ===
                  currentlyBuilding
                    .fullName
                    .toLowerCase()
              ) || null,
          }
        : null

    const commitsLast30Days =
      recentCommits.filter(
        (commit) =>
          getDaysSince(
            commit.createdAt
          ) <= 30
      ).length

    const summary = {
      publicRepositories:
        Number(
          profile.public_repos ||
            ownRepositories.length
        ),

      activeRepositories:
        repositoryData.filter(
          (repository) =>
            repository
              .developmentStatus
              .state === 'active'
        ).length,

      maintainedRepositories:
        repositoryData.filter(
          (repository) =>
            [
              'active',
              'maintained',
            ].includes(
              repository
                .developmentStatus
                .state
            )
        ).length,

      passingBuilds:
        repositoryData.filter(
          (repository) =>
            repository.build.state ===
            'passing'
        ).length,

      failingBuilds:
        repositoryData.filter(
          (repository) =>
            repository.build.state ===
            'failing'
        ).length,

      repositoriesWithWorkflows:
        repositoryData.filter(
          (repository) =>
            ![
              'no-workflow',
              'unavailable',
              'not-checked',
            ].includes(
              repository.build.state
            )
        ).length,

      commitsLast30Days,

      languageCount:
        languageAnalytics
          .languages.length,
    }

    return {
      username:
        profile.login ||
        username,

      name:
        profile.name ||
        profile.login ||
        username,

      profileUrl:
        profile.html_url ||
        `https://github.com/${username}`,

      avatarUrl:
        profile.avatar_url ||
        '',

      summary,

      currentlyBuilding:
        currentRepository,

      topLanguages:
        languageAnalytics
          .languages,

      languageSource:
        languageAnalytics.source,

      recentCommits,

      repositories:
        repositoryData,

      checkedAt:
        new Date().toISOString(),
    }
  }

router.get(
  '/engineering/dashboard',
  async (req, res) => {
    const username =
      String(
        process.env
          .GITHUB_USERNAME ||
          'Deveshsahu76'
      ).trim()

    res.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400'
    )

    if (
      cachedDashboard &&
      Date.now() <
        cacheExpiresAt
    ) {
      return res
        .status(200)
        .json({
          success: true,
          cached: true,
          stale: false,
          data:
            cachedDashboard,
        })
    }

    try {
      const dashboard =
        await buildEngineeringDashboard(
          username
        )

      cachedDashboard =
        dashboard

      cacheExpiresAt =
        Date.now() +
        CACHE_TIME_MS

      return res
        .status(200)
        .json({
          success: true,
          cached: false,
          stale: false,
          data: dashboard,
        })
    } catch (error) {
      console.error(
        'Engineering dashboard error:',
        error.message
      )

      if (cachedDashboard) {
        return res
          .status(200)
          .json({
            success: true,
            cached: true,
            stale: true,

            message:
              'Showing cached engineering information.',

            data:
              cachedDashboard,
          })
      }

      return res
        .status(502)
        .json({
          success: false,

          message:
            'Live engineering data is temporarily unavailable.',
        })
    }
  }
)

export default router