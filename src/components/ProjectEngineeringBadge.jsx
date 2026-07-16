import React from 'react'
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiGitBranch,
  FiXCircle,
} from 'react-icons/fi'
import useEngineeringDashboard from '../hooks/useEngineeringDashboard'

const developmentClasses = {
  active:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',

  maintained:
    'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300',

  stable:
    'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',

  dormant:
    'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',

  archived:
    'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
}

const buildClasses = {
  passing:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',

  failing:
    'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',

  running:
    'bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300',

  completed:
    'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',

  'no-workflow':
    'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400',

  unavailable:
    'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',

  'not-checked':
    'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400',
}

const getRepositoryName = (
  githubUrl
) => {
  if (!githubUrl) {
    return ''
  }

  return String(githubUrl)
    .replace(/\/+$/, '')
    .split('/')
    .pop()
    .replace(/\.git$/i, '')
    .toLowerCase()
}

export default function ProjectEngineeringBadge({
  project,
}) {
  const engineering =
    useEngineeringDashboard()

  const repositoryName =
    getRepositoryName(
      project?.github
    )

  if (!repositoryName) {
    return null
  }

  const repository =
    engineering.data.repositories.find(
      (item) =>
        item.name.toLowerCase() ===
        repositoryName
    )

  if (!repository) {
    if (
      engineering.status ===
      'loading'
    ) {
      return (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-500 dark:bg-white/5 dark:text-slate-400">
          <FiActivity className="animate-pulse" />
          GitHub syncing
        </div>
      )
    }

    return null
  }

  const development =
    repository
      .developmentStatus

  const build =
    repository.build

  const DevelopmentIcon =
    development.state ===
    'active'
      ? FiActivity
      : FiClock

  const BuildIcon =
    build.state ===
    'passing'
      ? FiCheckCircle
      : build.state ===
          'failing'
        ? FiXCircle
        : FiGitBranch

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <a
        href={repository.url}
        target="_blank"
        rel="noreferrer"
        title={
          development.description
        }
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${
          developmentClasses[
            development.state
          ] ||
          developmentClasses.stable
        }`}
      >
        <DevelopmentIcon />
        {development.label}
      </a>

      <a
        href={
          build.url ||
          repository.url
        }
        target="_blank"
        rel="noreferrer"
        title={
          build.workflowName ||
          build.label
        }
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${
          buildClasses[
            build.state
          ] ||
          buildClasses[
            'not-checked'
          ]
        }`}
      >
        <BuildIcon />
        {build.label}
      </a>
    </div>
  )
}