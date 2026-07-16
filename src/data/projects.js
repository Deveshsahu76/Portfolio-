const projects = [
  {
    id: 'queens-arena',
    title: 'Queens Arena',
    category: 'Full Stack + Mobile',
    status: 'live',
    statusLabel: 'Live Project',
    caseStudyUpdated: '2026-07-16',

    description:
      'A mobile-first N-Queens strategy puzzle game with authentication, backend APIs, MongoDB integration and Android APK support.',

    longDescription:
      'Queens Arena turns the classic N-Queens algorithm into an interactive full-stack puzzle experience. It combines game logic, authentication, REST APIs, persistent data, responsive design and Android packaging.',

    problem:
      'The N-Queens problem is usually explained only through code or diagrams. That makes it difficult for many learners to understand queen placement rules and conflicts interactively.',

    solution:
      'I created a visual puzzle game where users place queens on a board, receive validation feedback, progress through the game and use the same application through a web browser or Android APK.',

    impact:
      'This project demonstrates algorithmic thinking together with frontend development, backend integration, authentication, database usage, responsive UI and real deployment.',

    image: '/projects/queens-arena.webp',
    images: [
      '/projects/queens-arena.webp',
    ],

    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Android APK',
      'Render',
      'Vercel',
    ],

    features: [
      'Interactive N-Queens puzzle gameplay',
      'Responsive game board for desktop and mobile',
      'User registration and login flow',
      'JWT based authentication structure',
      'Frontend connected with backend APIs',
      'MongoDB database integration',
      'Installable Android APK',
      'Deployed frontend and backend',
    ],

    github:
      'https://github.com/Deveshsahu76/Queens-Arena',

    demo:
      'https://queens-arena.vercel.app/',

    apk:
      '/apk/Queens-Arena-debug.apk',

    architecture: [
      'User opens the React web application or Android APK',
      'Frontend manages board state, moves and user interactions',
      'Authentication requests are sent to the Express backend',
      'Backend validates requests and handles application logic',
      'MongoDB stores user and gameplay related information',
      'Frontend and backend are deployed as separate services',
    ],

    apiDocs: [
      {
        method: 'POST',
        endpoint: '/api/auth/register',
        description: 'Create a new user account.',
      },
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Authenticate a user and return a session response.',
      },
      {
        method: 'GET',
        endpoint: '/api/auth/me',
        description: 'Fetch the authenticated user profile.',
      },
      {
        method: 'POST',
        endpoint: '/api/game/progress',
        description: 'Save or update gameplay progress.',
      },
    ],

    schema: [
      {
        name: 'User',
        fields: [
          'name',
          'email',
          'password',
          'createdAt',
          'updatedAt',
        ],
      },
      {
        name: 'GameData',
        fields: [
          'userId',
          'score',
          'level',
          'moves',
          'createdAt',
        ],
      },
    ],

    challenges: [
      'Implementing correct queen conflict validation',
      'Keeping the board responsive across screen sizes',
      'Connecting authentication between frontend and backend',
      'Packaging the web application as an Android APK',
    ],

    learnings: [
      'Breaking algorithm logic into reusable UI functions',
      'Managing frontend state for interactive gameplay',
      'Handling authentication and protected API requests',
      'Testing a full-stack project on web and Android',
    ],

    changelog: [
      {
        version: 'v1.4',
        date: 'July 2026',
        title: 'Portfolio case study and deployment proof',
        description:
          'Added structured project documentation, runtime status and recruiter-focused proof.',
      },
      {
        version: 'v1.3',
        date: 'June 2026',
        title: 'Android application support',
        description:
          'Packaged the frontend with Capacitor for Android device testing.',
      },
      {
        version: 'v1.2',
        date: 'June 2026',
        title: 'Backend and authentication',
        description:
          'Connected authentication APIs and MongoDB based data storage.',
      },
      {
        version: 'v1.1',
        date: 'May 2026',
        title: 'Core puzzle experience',
        description:
          'Built the responsive N-Queens board and primary gameplay flow.',
      },
    ],

    roadmap: [
      'Add progressive level management',
      'Add leaderboard and player rankings',
      'Improve gameplay analytics',
      'Add richer celebration and achievement systems',
      'Publish a production Android build',
    ],

    credentials:
      'The APK is available for testing. Android may request permission to install an application from an external source.',
  },

  {
    id: 'zerodha-clone',
    title: 'Zerodha Clone',
    category: 'MERN Dashboard',
    status: 'code-available',
    statusLabel: 'Code Available',
    caseStudyUpdated: '2026-07-16',

    description:
      'A MERN stock trading dashboard clone with authentication, holdings, positions, orders and responsive dashboard interfaces.',

    longDescription:
      'Zerodha Clone is a full-stack trading dashboard project created to practise complex dashboard layouts, protected routes, authentication, financial data presentation and backend API integration.',

    problem:
      'Trading dashboards contain large amounts of data and require clear navigation, protected user flows and responsive layouts without overwhelming the user.',

    solution:
      'I recreated the major dashboard experience with holdings, positions, orders, authentication and reusable UI sections backed by Node.js, Express and MongoDB.',

    impact:
      'The project demonstrates dashboard engineering, authentication flows, protected routes, financial data presentation and full-stack application structure.',

    image:
      '/projects/zerodha-homepage.webp',

    images: [
      '/projects/zerodha-homepage.webp',
      '/projects/zerodha-dashboard.webp',
      '/projects/zerodha-holdings.webp',
    ],

    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'REST API',
      'Vercel',
    ],

    features: [
      'User registration and login flow',
      'Protected dashboard routes',
      'Holdings data presentation',
      'Positions dashboard',
      'Orders section',
      'Responsive navigation and layouts',
      'Backend API integration',
      'Reusable dashboard components',
    ],

    github:
      'https://github.com/Deveshsahu76/Zerodha-Clone',

    demo: '',

    architecture: [
      'User authenticates through the React frontend',
      'Frontend submits credentials to the Express API',
      'Backend validates the user and generates an authentication response',
      'Protected pages request holdings, positions and orders',
      'MongoDB stores user and trading related information',
    ],

    apiDocs: [
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Authenticate a dashboard user.',
      },
      {
        method: 'GET',
        endpoint: '/api/holdings',
        description: 'Fetch user holdings.',
      },
      {
        method: 'GET',
        endpoint: '/api/positions',
        description: 'Fetch current positions.',
      },
      {
        method: 'GET',
        endpoint: '/api/orders',
        description: 'Fetch order history.',
      },
    ],

    schema: [
      {
        name: 'User',
        fields: [
          'name',
          'email',
          'password',
          'createdAt',
        ],
      },
      {
        name: 'Holding',
        fields: [
          'userId',
          'name',
          'qty',
          'avg',
          'price',
          'net',
          'day',
        ],
      },
      {
        name: 'Position',
        fields: [
          'userId',
          'product',
          'name',
          'qty',
          'avg',
          'price',
        ],
      },
      {
        name: 'Order',
        fields: [
          'userId',
          'stockName',
          'qty',
          'price',
          'mode',
          'createdAt',
        ],
      },
    ],

    challenges: [
      'Designing a dense dashboard without making it confusing',
      'Protecting dashboard routes after authentication',
      'Organising financial data into reusable components',
      'Maintaining responsive tables and navigation',
    ],

    learnings: [
      'Building complex dashboard layouts',
      'Creating reusable data presentation components',
      'Managing authentication and protected routes',
      'Separating frontend and backend responsibilities',
    ],

    changelog: [
      {
        version: 'v1.3',
        date: 'July 2026',
        title: 'Detailed case study',
        description:
          'Added architecture, API documentation and database schema presentation.',
      },
      {
        version: 'v1.2',
        date: 'June 2026',
        title: 'Authentication and protected dashboard',
        description:
          'Added user authentication and protected dashboard routes.',
      },
      {
        version: 'v1.1',
        date: 'May 2026',
        title: 'Dashboard modules',
        description:
          'Built holdings, positions and orders interfaces.',
      },
    ],

    roadmap: [
      'Deploy a stable public demo',
      'Add charts and portfolio analytics',
      'Add order creation workflow',
      'Improve loading and empty states',
      'Add automated testing',
    ],

    credentials:
      'The source code is available. Public demo access is not currently enabled.',
  },

  {
    id: 'ecommerce-store',
    title: 'E-Commerce Store',
    category: 'MERN Commerce',
    status: 'live',
    statusLabel: 'Live Project',
    caseStudyUpdated: '2026-07-16',

    description:
      'A full-stack MERN e-commerce application with products, search, cart, authentication, orders and admin-ready architecture.',

    longDescription:
      'E-Commerce Store is a complete shopping application built with React, Node.js, Express and MongoDB. It covers the customer journey from product discovery to cart and order management.',

    problem:
      'An e-commerce application needs to coordinate products, users, cart state, authentication, orders and responsive design through a single clear customer flow.',

    solution:
      'I built a MERN application with product browsing, authentication, cart management, order structure, backend APIs and a responsive shopping interface.',

    impact:
      'The project demonstrates a complete business-oriented full-stack workflow, reusable commerce components, REST APIs and database modelling.',

    image:
      '/projects/ecommerce-homepage.webp',

    images: [
      '/projects/ecommerce-homepage.webp',
    ],

    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'REST API',
      'Razorpay Ready',
      'Vercel',
    ],

    features: [
      'Product listing and product details',
      'Product search and browsing flow',
      'User authentication',
      'Shopping cart management',
      'Order creation structure',
      'Admin-ready product architecture',
      'Payment gateway ready structure',
      'Responsive customer interface',
    ],

    github:
      'https://github.com/Deveshsahu76/E-Commerce-.git',

    demo:
      'https://e-commerce-nu-bay.vercel.app/',

    architecture: [
      'User browses products through the React frontend',
      'Frontend requests product data from REST APIs',
      'Authentication controls user specific actions',
      'Cart state is maintained through the customer journey',
      'Backend handles products, users and orders',
      'MongoDB stores application data',
    ],

    apiDocs: [
      {
        method: 'GET',
        endpoint: '/api/products',
        description: 'Fetch all products.',
      },
      {
        method: 'GET',
        endpoint: '/api/products/:id',
        description: 'Fetch one product.',
      },
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Authenticate a customer.',
      },
      {
        method: 'POST',
        endpoint: '/api/orders',
        description: 'Create a customer order.',
      },
    ],

    schema: [
      {
        name: 'User',
        fields: [
          'name',
          'email',
          'password',
          'isAdmin',
          'createdAt',
        ],
      },
      {
        name: 'Product',
        fields: [
          'name',
          'description',
          'price',
          'category',
          'stock',
          'images',
        ],
      },
      {
        name: 'Order',
        fields: [
          'userId',
          'items',
          'shippingAddress',
          'paymentStatus',
          'totalPrice',
        ],
      },
      {
        name: 'OrderItem',
        fields: [
          'productId',
          'name',
          'qty',
          'price',
          'image',
        ],
      },
    ],

    challenges: [
      'Maintaining cart state across multiple pages',
      'Designing product cards for different screen sizes',
      'Connecting product and order APIs',
      'Structuring database models for commerce data',
    ],

    learnings: [
      'Designing a complete customer purchase journey',
      'Managing shared cart and authentication state',
      'Creating reusable product components',
      'Building REST APIs for business applications',
    ],

    changelog: [
      {
        version: 'v1.4',
        date: 'July 2026',
        title: 'Production UI upgrade',
        description:
          'Improved product presentation, responsive layouts and portfolio documentation.',
      },
      {
        version: 'v1.3',
        date: 'June 2026',
        title: 'Order and cart structure',
        description:
          'Added cart management and order workflow architecture.',
      },
      {
        version: 'v1.2',
        date: 'June 2026',
        title: 'Authentication and APIs',
        description:
          'Connected authentication and product APIs.',
      },
      {
        version: 'v1.1',
        date: 'May 2026',
        title: 'Product experience',
        description:
          'Built product listing and product detail interfaces.',
      },
    ],

    roadmap: [
      'Complete production payment integration',
      'Add customer order tracking',
      'Add product review system',
      'Add stock management dashboard',
      'Add automated API and UI testing',
    ],

    credentials:
      'Admin access is private. Public users can review the customer-facing application.',
  },

  {
    id: 'version-control-system',
    title: 'Version Control System',
    category: 'MERN File Management',
    status: 'in-development',
    statusLabel: 'In Development',
    caseStudyUpdated: '2026-07-16',

    description:
      'A MERN file versioning application where users can create files, maintain history and restore previous versions.',

    longDescription:
      'Version Control System is a MERN project focused on file history and restoration. The application models how multiple versions of a file can be stored, displayed and restored.',

    problem:
      'Users may overwrite important file content without a simple way to view history or restore an earlier version.',

    solution:
      'The project stores file metadata separately from version records so every update can create a recoverable history entry.',

    impact:
      'This project demonstrates backend data modelling, version history logic, restoration workflows and database relationships.',

    image: '',
    images: [],

    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST API',
      'MERN',
    ],

    features: [
      'File creation and update flow',
      'Version history tracking',
      'Previous version restoration',
      'Structured backend API design',
      'MongoDB schema relationships',
      'Clean file management interface',
    ],

    github: '',
    demo: '',

    architecture: [
      'User creates or updates a file',
      'Frontend sends file data to the backend',
      'Backend creates a new version entry',
      'MongoDB stores file metadata and version history',
      'User opens the version list',
      'Selected versions can be restored',
    ],

    apiDocs: [
      {
        method: 'POST',
        endpoint: '/api/files',
        description: 'Create a file record.',
      },
      {
        method: 'PUT',
        endpoint: '/api/files/:id',
        description: 'Update a file and create a new version.',
      },
      {
        method: 'GET',
        endpoint: '/api/files/:id/versions',
        description: 'Fetch version history.',
      },
      {
        method: 'POST',
        endpoint: '/api/files/:id/restore',
        description: 'Restore a selected version.',
      },
    ],

    schema: [
      {
        name: 'File',
        fields: [
          'name',
          'ownerId',
          'currentVersion',
          'createdAt',
          'updatedAt',
        ],
      },
      {
        name: 'Version',
        fields: [
          'fileId',
          'versionNumber',
          'content',
          'createdAt',
        ],
      },
    ],

    challenges: [
      'Keeping current file data consistent with version history',
      'Designing restore logic without deleting newer versions',
      'Modelling relationships between files and versions',
      'Presenting large version histories clearly',
    ],

    learnings: [
      'Designing document history data models',
      'Creating restore and rollback workflows',
      'Separating current state from historical records',
      'Planning backend APIs before implementation',
    ],

    changelog: [
      {
        version: 'v0.3',
        date: 'July 2026',
        title: 'Case study and architecture',
        description:
          'Documented the planned API, schemas and restoration workflow.',
      },
      {
        version: 'v0.2',
        date: 'June 2026',
        title: 'Database structure',
        description:
          'Designed File and Version data models.',
      },
      {
        version: 'v0.1',
        date: 'June 2026',
        title: 'Project concept',
        description:
          'Defined the core version history and restore use case.',
      },
    ],

    roadmap: [
      'Complete frontend file editor',
      'Add user authentication',
      'Implement version comparison',
      'Add file sharing permissions',
      'Deploy a public demonstration',
    ],

    credentials:
      'This project is currently under development. Architecture and planned APIs are available for review.',
  },
]

export default projects