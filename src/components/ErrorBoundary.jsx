import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 py-12 text-white">
          <div className="max-w-xl rounded-[28px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
            <h1 className="text-3xl font-semibold mb-4">Something went wrong.</h1>
            <p className="text-slate-300 mb-6">An unexpected error occurred while loading the page. Please refresh or try again later.</p>
            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-200">
              {this.state.error?.message ?? 'Unknown error'}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
