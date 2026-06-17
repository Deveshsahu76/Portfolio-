import React from 'react'
import TypingEffect from '../components/TypingEffect'
import { motion } from 'framer-motion'
import projects from '../data/projects'
import profileImg from '../assets/portfolioimage.png'

export default function Home(){
  return (
    <div className="pt-20">
      <section className="min-h-[80vh] flex items-center">
        <div className="max-w-2xl">
          <motion.div initial={{x:-20,opacity:0}} animate={{x:0,opacity:1}} className="space-y-6">
            <div className="text-slate-400">Hello, I'm</div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">Devesh Sahu</h1>
            <div className="text-2xl md:text-3xl text-slate-300"><TypingEffect words={["Full-Stack Developer","IT Student","Building Scalable Web Apps"]} /></div>
            <p className="text-slate-400 max-w-xl">I build modern, scalable web applications and enjoy solving real-world problems. I'm currently exploring AI-powered apps and competitive programming.</p>

            <div className="flex gap-3 mt-4">
              <a href="#projects" className="px-5 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-black font-semibold">View Projects</a>
            </div>

            <div className="mt-8 flex gap-4">
              <div className="glass p-4 text-center rounded">
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-slate-400 text-sm">Projects Completed</div>
              </div>
              <div className="glass p-4 text-center rounded">
                <div className="text-2xl font-bold">React • Node</div>
                <div className="text-slate-400 text-sm">Technologies</div>
              </div>
            </div>
          </motion.div>
        </div>

          <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} className="ml-auto hidden md:flex items-center justify-center">
            <div className="w-96 h-96 rounded-3xl glass flex items-center justify-center shadow-2xl" style={{perspective:1200}}>
              <motion.div
                className="w-full h-full rounded-3xl overflow-hidden"
                whileHover={{ rotateX: 6, rotateY: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              >
                <img
                  src={profileImg}
                  alt="Devesh Sahu"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
      </section>

      <section id="projects" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Highlighted Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map(p=> (
            <div key={p.id}>
              <img src={p.image} alt={p.title} className="rounded-lg w-full h-48 object-cover" />
              <div className="mt-2">
                <div className="font-semibold">{p.title}</div>
                <div className="text-slate-400 text-sm">{p.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
