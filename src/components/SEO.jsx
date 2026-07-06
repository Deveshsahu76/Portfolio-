import React from 'react'
import { Helmet } from 'react-helmet-async'

const siteUrl = 'https://deveshsahuportfolio.vercel.app'
const defaultImage = `${siteUrl}/og-image.png`

export default function SEO({
  title = 'Devesh Sahu | MERN Stack Developer',
  description = 'Devesh Sahu is a MERN Stack Developer and B.Tech IT student building full-stack web apps with React, Node.js, Express, MongoDB, APIs and deployment.',
  path = '/',
  image = defaultImage,
  type = 'website',
  schema,
}) {
  const canonicalUrl = `${siteUrl}${path}`

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Devesh Sahu, MERN Stack Developer, React Developer, Node.js Developer, Full Stack Developer, B.Tech IT, Software Developer Portfolio, Web Developer India"
      />
      <meta name="author" content="Devesh Sahu" />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Devesh Sahu Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#0f172a" />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}