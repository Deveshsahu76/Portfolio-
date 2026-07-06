const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function createSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `session_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function getSessionId() {
  if (typeof window === 'undefined') return 'server-session'

  const key = 'devesh_portfolio_session_id'
  const existing = localStorage.getItem(key)

  if (existing) return existing

  const sessionId = createSessionId()
  localStorage.setItem(key, sessionId)
  return sessionId
}

export function getDeviceType() {
  if (typeof navigator === 'undefined') return 'unknown'

  const width = window.innerWidth

  if (width <= 640) return 'mobile'
  if (width <= 1024) return 'tablet'
  return 'desktop'
}

export function getBrowserName() {
  if (typeof navigator === 'undefined') return 'unknown'

  const ua = navigator.userAgent

  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Edge')) return 'Edge'

  return 'Other'
}

export function trackEvent(eventType, metadata = {}) {
  if (typeof window === 'undefined') return

  const payload = {
    sessionId: getSessionId(),
    eventType,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer || '',
    source: 'portfolio',
    device: getDeviceType(),
    browser: getBrowserName(),
    metadata,
  }

  const endpoint = `${API_URL}/api/analytics/track`

  try {
    const blob = new Blob([JSON.stringify(payload)], {
      type: 'application/json',
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, blob)
      return
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => {})
  }
}