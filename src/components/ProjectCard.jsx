import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

export default function ProjectCard({project}){
  return (
    <motion.article whileHover={{scale:1.02}} className="glass p-4 rounded-lg border border-white/5">
      <div className="h-44 bg-gradient-to-br from-white/3 to-white/2 rounded-md flex items-center justify-center overflow-hidden">
        <img src={project.image} alt={project.title} className="object-cover h-full w-full" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
      <p className="text-slate-300 mt-2 text-sm">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map(t=> (
          <span key={t} className="text-xs bg-white/5 px-2 py-1 rounded">{t}</span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white flex items-center gap-2"><FaGithub/> GitHub</a>
        <a href={project.demo||'#'} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-2"><FaExternalLinkAlt/> Live Demo</a>
      </div>
    </motion.article>
  )
}
