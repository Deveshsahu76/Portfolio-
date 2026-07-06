const siteUrl = 'https://deveshsahuportfolio.vercel.app'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Devesh Sahu',
  url: siteUrl,
  image: `${siteUrl}/profile-image.png`,
  jobTitle: 'MERN Stack Developer',
  email: 'mailto:deveshsahu567@gmail.com',
  telephone: '+91-7607997416',
  sameAs: [
    'https://github.com/Deveshsahu76',
    'https://www.linkedin.com/in/devesh-sahu-560608270/',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Kanpur Institute of Technology',
  },
  knowsAbout: [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JavaScript',
    'REST APIs',
    'JWT Authentication',
    'Full Stack Development',
    'MERN Stack Development',
    'Frontend Development',
    'Backend Development',
    'Data Structures and Algorithms',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Devesh Sahu Portfolio',
  url: siteUrl,
  description:
    'Personal brand platform and developer portfolio of Devesh Sahu, MERN Stack Developer.',
  publisher: personSchema,
}

export const portfolioOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Devesh Sahu Developer Portfolio',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  founder: personSchema,
}

export const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [personSchema, websiteSchema, portfolioOrganizationSchema],
}

export const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects by Devesh Sahu',
  url: `${siteUrl}/projects`,
  description:
    'Full-stack MERN projects by Devesh Sahu including Queens Arena, E-Commerce Store, Zerodha Clone and Version Control System.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SoftwareSourceCode',
        name: 'Queens Arena',
        programmingLanguage: ['JavaScript', 'React', 'Node.js'],
        url: `${siteUrl}/projects`,
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'E-Commerce Store',
        programmingLanguage: ['JavaScript', 'React', 'Node.js'],
        url: `${siteUrl}/projects`,
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'Zerodha Clone',
        programmingLanguage: ['JavaScript', 'React', 'Node.js'],
        url: `${siteUrl}/projects`,
      },
    ],
  },
}

export const recruiterSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'Recruiter Hub | Devesh Sahu',
  url: `${siteUrl}/recruiter`,
  description:
    'Recruiter-ready profile of Devesh Sahu with resume, skills, projects, education and contact details.',
  mainEntity: personSchema,
}

export const freelanceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Freelance Web Development Services by Devesh Sahu',
  provider: personSchema,
  areaServed: 'India',
  url: `${siteUrl}/freelance`,
  serviceType: [
    'Portfolio Website Development',
    'Business Website Development',
    'MERN Stack Development',
    'React Development',
    'Node.js API Development',
    'Dashboard Development',
    'E-Commerce Website Development',
  ],
}