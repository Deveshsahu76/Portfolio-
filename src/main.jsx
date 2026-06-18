import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import ErrorBoundary from './components/ErrorBoundary'

if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error('Global Error:', e.error || e.message || e)
  })

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise:', e.reason || e)
  })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
