import React from 'react'
import skills from '../data/skills'
import SkillCard from '../components/SkillCard'

export default function Skills(){
  return (
    <div className="pt-20">
      <h1 className="text-3xl font-bold">Skills</h1>
      <p className="text-slate-400 mt-2">Languages, frameworks and tools I use regularly.</p>

      <section className="mt-6 grid gap-4">
        <h2 className="text-xl font-semibold">Languages</h2>
        <div className="flex flex-wrap gap-4">
          {skills.languages.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
        </div>

        <h2 className="text-xl font-semibold mt-4">Frontend</h2>
        <div className="flex flex-wrap gap-4">
          {skills.frontend.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
        </div>

        <h2 className="text-xl font-semibold mt-4">Backend</h2>
        <div className="flex flex-wrap gap-4">
          {skills.backend.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
        </div>

        <h2 className="text-xl font-semibold mt-4">Databases</h2>
        <div className="flex flex-wrap gap-4">
          {skills.databases.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
        </div>

        <h2 className="text-xl font-semibold mt-4">Tools</h2>
        <div className="flex flex-wrap gap-4">
          {skills.tools.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
        </div>
      </section>
    </div>
  )
}
