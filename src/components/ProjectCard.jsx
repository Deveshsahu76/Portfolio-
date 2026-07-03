import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

function valid(link) {
  return link && link !== '#'
}

export default function ProjectCard({ project, compact = false }) {
  const gallery = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : []

  const [activeImage, setActiveImage] = useState(0)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="card-3d glass-3d group flex h-full flex-col overflow-hidden rounded-[2rem]"
    >
      <div className="relative min-h-[235px] overflow-hidden bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 p-4">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
        <div className="absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-cyan-300/30 blur-2xl" />

        {gallery.length > 0 ? (
          <>
            <img
              src={gallery[activeImage]}
              alt={`${project.title} preview`}
              className="relative h-[210px] w-full rounded-[1.4rem] object-cover object-top shadow-2xl ring-1 ring-white/25 transition duration-500 group-hover:scale-[1.04] sm:h-[230px]"
            />

            {!compact && gallery.length > 1 && (
              <div className="absolute bottom-5 left-5 right-5 flex gap-2 overflow-x-auto rounded-2xl bg-black/25 p-2 backdrop-blur-xl">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-12 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImage === index
                        ? 'scale-105 border-white'
                        : 'border-white/20 opacity-75 hover:opacity-100'
                    }`}
                    aria-label={`Show ${project.title} image ${index + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="relative min-h-[210px] rounded-[1.4rem] bg-white/90 p-4 shadow-2xl ring-1 ring-white/30 dark:bg-slate-950/80">
            <div className="mb-5 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="space-y-4">
              <div className="h-5 w-2/3 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 rounded-2xl bg-violet-100 shadow-inner dark:bg-violet-500/20" />
                <div className="h-16 rounded-2xl bg-blue-100 shadow-inner dark:bg-blue-500/20" />
                <div className="h-16 rounded-2xl bg-cyan-100 shadow-inner dark:bg-cyan-500/20" />
              </div>
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-4/5 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
              {project.title}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
            {project.type}
          </span>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
            {project.status}
          </span>
        </div>

        <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          {project.title}
        </h3>

        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {!compact && (
          <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-900/10 bg-white/65 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {valid(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-sm"
            >
              <FaGithub /> GitHub
            </a>
          )}

          {valid(project.demo) && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-4 py-2 text-sm"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}