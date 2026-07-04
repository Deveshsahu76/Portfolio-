import React from 'react'
import { FiExternalLink, FiGithub, FiLayers } from 'react-icons/fi'

export default function ProjectCard({ project }) {
  const tech = project.techStack || project.tags || project.technologies || []
  const liveLink = project.demo || project.live || project.liveLink
  const githubLink = project.github || project.githubLink

  return (
    <article className="soft-card hover-lift group overflow-hidden rounded-[2rem]">
      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-900">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <FiLayers className="text-5xl text-slate-400" />
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950 backdrop-blur-xl dark:bg-slate-950/80 dark:text-white">
          Full Stack
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {project.description || project.longDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tech.slice(0, 5).map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noreferrer" className="btn-primary px-4 py-2 text-sm">
              Live <FiExternalLink />
            </a>
          )}

          {githubLink && (
            <a href={githubLink} target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-sm">
              Code <FiGithub />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}