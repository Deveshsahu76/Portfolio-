import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'

function inferEventType(element) {
  const manualTrack = element.getAttribute('data-track')

  if (manualTrack) return manualTrack

  const href = element.getAttribute('href') || ''
  const text = element.textContent?.toLowerCase() || ''

  if (href.includes('resume.pdf')) return 'resume_download'
  if (href.startsWith('mailto:')) return 'contact_email_click'
  if (href.includes('wa.me') || href.includes('whatsapp')) return 'whatsapp_click'
  if (href.includes('/recruiter')) return 'recruiter_cta_click'
  if (href.includes('/freelance')) return 'freelance_cta_click'
  if (href.includes('github.com')) return 'github_click'
  if (href.includes('linkedin.com')) return 'linkedin_click'
  if (text.includes('resume')) return 'resume_download'
  if (text.includes('hire')) return 'hire_cta_click'

  if (href.startsWith('http')) return 'external_link_click'

  return 'interaction_click'
}

export default function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      trackEvent('page_view', {
        url: window.location.href,
      })
    }, 350)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest('a, button')

      if (!target) return

      const eventType = inferEventType(target)

      trackEvent(eventType, {
        text: target.textContent?.trim().slice(0, 120) || '',
        href: target.getAttribute('href') || '',
        ariaLabel: target.getAttribute('aria-label') || '',
      })
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      const navigation = performance.getEntriesByType('navigation')?.[0]

      if (!navigation) return

      trackEvent('performance_snapshot', {
        loadTime: Math.round(navigation.loadEventEnd - navigation.startTime),
        domContentLoaded: Math.round(
          navigation.domContentLoadedEventEnd - navigation.startTime
        ),
      })
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad, { once: true })
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return null
}