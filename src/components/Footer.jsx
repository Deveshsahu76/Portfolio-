import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiMail, FiPhone } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="simple-footer">
      <div className="simple-footer-card">
        <div className="simple-footer-main">
          <div>
            <div className="simple-footer-logo">DS</div>

            <h2>Devesh Sahu</h2>

            <p>
              MERN Stack Developer focused on building clean full-stack web apps,
              backend APIs and deployed projects.
            </p>
          </div>

          <div className="simple-footer-links">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="simple-footer-contact">
            <a href="mailto:deveshsahu567@gmail.com">
              <FiMail />
              Email Me
              <FiArrowUpRight />
            </a>

            <a href="tel:+917607997416">
              <FiPhone />
              Call Me
              <FiArrowUpRight />
            </a>

            <div className="simple-footer-socials">
              <a
                href="https://github.com/Deveshsahu76"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/devesh-sahu-560608270/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="simple-footer-bottom">
          <p>© {new Date().getFullYear()} Devesh Sahu</p>
        </div>
      </div>
    </footer>
  )
}