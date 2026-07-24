import React from 'react'
import {
  FiAlertTriangle,
  FiRefreshCw,
} from 'react-icons/fi'

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, information) {
    console.error('Portfolio runtime error:', error, information)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className="error-boundary-page" role="alert">
        <section className="error-boundary-card">
          <div className="error-boundary-icon">
            <FiAlertTriangle />
          </div>

          <span>Application Recovery</span>

          <h1>This page could not load correctly.</h1>

          <p>
            A temporary interface error occurred. Reload the page to continue
            using the portfolio.
          </p>

          <div className="error-boundary-actions">
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              <FiRefreshCw />
              Reload Page
            </button>

            <a href="/">Return Home</a>
          </div>
        </section>
      </main>
    )
  }
}
