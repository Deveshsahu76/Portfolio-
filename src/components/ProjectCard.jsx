import React from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  FiArrowRight,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLayers,
} from 'react-icons/fi'
import ProjectLiveBadge from './ProjectLiveBadge'
import ProjectEngineeringBadge from './ProjectEngineeringBadge'

export default function ProjectCard({
  project,
}) {
  const tech =
    project.techStack ||
    project.tags ||
    project.technologies ||
    []

  const liveLink =
    project.demo ||
    project.live ||
    project.liveLink

  const githubLink =
    project.github ||
    project.githubLink

  const apkLink =
    project.apk

  return (
    <article className="soft-card hover-lift group overflow-hidden rounded-[2rem]">
      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <FiLayers className="text-5xl text-slate-400" />
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 backdrop-blur-xl dark:bg-slate-950/80 dark:text-white">
          {project.category || 'Full Stack'}
        </div>

        <ProjectLiveBadge
          projectId={project.id}
        />

        {apkLink && (
          <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white shadow-lg">
            APK
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {project.description ||
            project.longDescription}
        </p>

        <ProjectEngineeringBadge
          project={project}
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {tech
            .slice(0, 5)
            .map((item) => (
              <span
                key={item}
                className="badge"
              >
                {item}
              </span>
            ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/projects/${project.id}`}
            className="btn-primary px-4 py-2 text-sm"
          >
            Case Study
            <FiArrowRight />
          </Link>

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-sm"
            >
              Live
              <FiExternalLink />
            </a>
          )}

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-sm"
            >
              Code
              <FiGithub />
            </a>
          )}

          {apkLink && (
            <a
              href={apkLink}
              download
              className="btn-secondary px-4 py-2 text-sm"
            >
              APK
              <FiDownload />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}