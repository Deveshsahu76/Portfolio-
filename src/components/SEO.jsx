import React from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://deveshsahuportfolio.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

const PRIVATE_PATHS = [
  '/admin',
  '/admin-requests',
  '/analytics',
]

const isPrivateRoute = (path) => {
  return PRIVATE_PATHS.some(
    (privatePath) =>
      path === privatePath || path.startsWith(`${privatePath}/`)
  )
}

const getAbsoluteImageUrl = (image) => {
  if (!image) return DEFAULT_IMAGE

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  const normalizedImage = image.startsWith('/') ? image : `/${image}`

  return `${SITE_URL}${normalizedImage}`
}

export default function SEO({
  title = 'Devesh Sahu | MERN Stack Developer',
  description = 'Devesh Sahu is a MERN Stack Developer building responsive and deployable web applications with React, Node.js, Express, MongoDB and REST APIs.',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema,
  noIndex = false,
  keywords = 'Devesh Sahu, MERN Stack Developer, React Developer, Node.js Developer, Full Stack Developer, Software Developer Portfolio, Web Developer India',
}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const canonicalUrl =
    normalizedPath === '/'
      ? `${SITE_URL}/`
      : `${SITE_URL}${normalizedPath}`

  const shouldNoIndex = noIndex || isPrivateRoute(normalizedPath)

  const robotsContent = shouldNoIndex
    ? 'noindex, nofollow, noarchive, nosnippet'
    : 'index, follow, max-image-preview:large'

  const socialImage = getAbsoluteImageUrl(image)

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Devesh Sahu" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Devesh Sahu Portfolio" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={title} />

      <meta name="theme-color" content="#0f172a" />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}