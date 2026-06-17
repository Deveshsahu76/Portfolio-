import React from 'react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects(){
  return (
    <div className="pt-20">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="text-slate-400 mt-2">Selected projects showcasing full-stack abilities and product thinking.</p>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {projects.map(p=> (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
