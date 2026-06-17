import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  const timeline = [
    {year:'2023', title:'College Journey Begins', desc:'Joined Kanpur Institute of Technology (AKTU) — B.Tech IT.'},
    {year:'2023-24', title:'Full-Stack Development', desc:'Built Zerodha Clone, Version Control System, E-Commerce Platform.'},
    {year:'2024', title:'Hackathons & Leadership', desc:'Participated in national hackathons; Organized "Hack to Learn".'}
  ]

  return (
    <div className="pt-20">
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">About Me</h1>
          <p className="text-slate-300 mt-4">Hi, I'm <strong>Devesh Sahu</strong>, a <strong>B.Tech Information Technology student</strong> at <strong>Kanpur Institute of Technology (AKTU)</strong> from <strong>Raebareli, Uttar Pradesh</strong>. I'm an aspiring <strong>Full-Stack Developer</strong> passionate about building impactful digital solutions through clean, scalable code and thoughtful product design.</p>

          <p className="text-slate-300 mt-4">I specialize in <strong>React.js, Node.js, Express.js, MongoDB, JavaScript, SQL, Docker, and Kubernetes</strong>. I've built projects such as a <strong>Zerodha Clone</strong>, a <strong>Version Control System</strong>, and an <strong>E‑Commerce Platform</strong>, gaining hands-on experience with REST APIs, authentication systems, database design, and deployment workflows.</p>

          <h2 className="mt-8 text-2xl font-semibold">Experience & Activities</h2>
          <p className="text-slate-400 mt-2">I actively participate in national-level hackathons, collaborating with teams to deliver innovative solutions under tight deadlines. These events have sharpened my problem-solving, teamwork, and communication skills.</p>

          <p className="text-slate-400 mt-2">I also contribute to the tech community through leadership roles — I organized <strong>"Hack to Learn"</strong>, an online hackathon focused on student learning and collaboration, and I serve as the <strong>Technical Coordinator of Aviothic 2.0</strong>, where I help run technical events and foster innovation on campus.</p>

          <h2 className="mt-8 text-2xl font-semibold">Current Focus</h2>
          <ul className="list-disc list-inside text-slate-400 mt-2">
            <li>Strengthening software engineering fundamentals and system design.</li>
            <li>Building scalable web applications and production-grade services.</li>
            <li>Pursuing opportunities as a Software Engineer / Full-Stack Developer.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">Skills & Projects</h2>
          <p className="text-slate-400 mt-2">Key technologies: <strong>React, Node, Express, MongoDB, SQL, Docker, Kubernetes</strong>. Notable projects include a Zerodha Clone, a Version Control System, and an E‑Commerce Platform demonstrating full-stack capabilities.</p>
        </div>

        <aside className="space-y-4">
          <div className="glass p-4 rounded">
            <h3 className="font-semibold">Education</h3>
            <div className="text-slate-400 text-sm mt-2">Bachelor of Technology (Information Technology) — In progress</div>
          </div>

          <div className="glass p-4 rounded">
            <h3 className="font-semibold">Timeline</h3>
            <div className="mt-3 space-y-4">
              {timeline.map(t=> (
                <div key={t.year} className="flex gap-3 items-start">
                  <div className="w-10 text-sm font-semibold">{t.year}</div>
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-slate-400 text-sm">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </motion.div>
    </div>
  )
}
