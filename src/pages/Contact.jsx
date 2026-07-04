import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiMail, FiPhone, FiSend } from 'react-icons/fi'

export default function Contact() {
  return (
    <main className="section-container">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="badge mb-5">Contact</div>
          <h1 className="page-title">
            Let’s discuss an <span className="gradient-text">internship or project.</span>
          </h1>
          <p className="page-subtitle mt-6">
            For internship opportunities, freelance work, project collaboration or resume discussion, you can contact me directly.
          </p>

          <div className="mt-8 grid gap-3">
            <a href="mailto:deveshsahu567@gmail.com" className="soft-card hover-lift rounded-2xl p-5 font-black">
              <FiMail className="mb-2 text-2xl text-indigo-600" />
              deveshsahu567@gmail.com
            </a>
            <a href="tel:+917607997416" className="soft-card hover-lift rounded-2xl p-5 font-black">
              <FiPhone className="mb-2 text-2xl text-indigo-600" />
              +91 7607997416
            </a>
          </div>
        </div>

        <div className="soft-card rounded-[2rem] p-7">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">Quick Links</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Choose the fastest way to review my profile.
          </p>

          <div className="mt-6 grid gap-3">
            <a href="/recruiter" className="btn-primary">
              Recruiter Hub <FiSend />
            </a>
            <a href="/freelance" className="btn-secondary">
              Freelance Request
            </a>
            <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="btn-secondary">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/devesh-sahu-560608270/" target="_blank" rel="noreferrer" className="btn-secondary">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}