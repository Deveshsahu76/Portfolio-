import zerodhaDashboard from '../assets/projects/Zerodha-Dashboard.png'
import zerodhaHoldings from '../assets/projects/Zerodha-Holdings.png'
import zerodhaHomepage from '../assets/projects/Zerodha-Homepage.png'
import ecommerceHomepage from '../assets/projects/ecommerceHomepage.png'
import queensArena from '../assets/projects/queensArena.png'

const projects = [
  {
    id: 'queens-arena',
    title: 'Queens Arena',
    description:
      'A mobile-first N-Queens strategy puzzle game with user login, deployed backend APIs, MongoDB database integration and Android APK support.',
    longDescription:
      'Queens Arena is a full-stack strategy puzzle game based on the classic N-Queens problem. The project includes a frontend game interface, backend APIs, authentication flow, MongoDB database connection and an installable Android APK for real device testing.',
    image: queensArena,
    images: [queensArena],
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Android APK',
      'Render',
      'Vercel',
    ],
    features: [
      'N-Queens based strategy puzzle gameplay',
      'User login and authentication flow',
      'Backend APIs connected with frontend',
      'MongoDB database integration',
      'Render deployed backend',
      'Vercel deployed frontend',
      'Installable Android APK for mobile testing',
    ],
    github: 'https://github.com/Deveshsahu76/Queens-Arena',
    demo: 'https://queens-arena.vercel.app/',
    apk: '/apk/Queens-Arena-debug.apk',
    architecture: [
      'User opens Queens Arena frontend',
      'Frontend sends login and gameplay requests to backend APIs',
      'Backend handles authentication, validation and game-related requests',
      'MongoDB stores user and gameplay related data',
      'Android APK allows testing the game on real mobile devices',
    ],
    apiDocs: [
      {
        method: 'POST',
        endpoint: '/api/auth/register',
        description: 'Create a new user account',
      },
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Login user and return authentication response',
      },
      {
        method: 'GET',
        endpoint: '/api/auth/me',
        description: 'Fetch logged-in user profile',
      },
    ],
    schema: [
      {
        name: 'User',
        fields: ['name', 'email', 'password', 'createdAt', 'updatedAt'],
      },
      {
        name: 'GameData',
        fields: ['userId', 'score', 'level', 'moves', 'createdAt'],
      },
    ],
    credentials:
      'APK is available for testing. If Android shows an unknown-source warning, allow install from trusted source for testing only.',
  },
  {
    id: 'zerodha-clone',
    title: 'Zerodha Clone',
    description:
      'A MERN-based stock trading dashboard clone with authentication, holdings, positions, orders and a responsive dashboard experience.',
    longDescription:
      'Zerodha Clone is a full-stack trading dashboard project built with React, Node.js, Express and MongoDB. It includes authentication, protected routes, dashboard sections, holdings, positions and order-related flows.',
    image: zerodhaHomepage,
    images: [zerodhaHomepage, zerodhaDashboard, zerodhaHoldings],
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
      'User login and authentication',
      'Protected dashboard routes',
      'Holdings and positions view',
      'Orders section',
      'Responsive dashboard UI',
      'Backend API integration',
    ],
    github: 'https://github.com/Deveshsahu76/Zerodha-Clone',
    demo: '',
    architecture: [
      'User logs in from React frontend',
      'Frontend sends authentication request to backend',
      'Backend validates user and returns JWT token',
      'Protected dashboard fetches holdings, positions and orders',
      'MongoDB stores users and trading-related data',
    ],
    apiDocs: [
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Login user and return token',
      },
      {
        method: 'GET',
        endpoint: '/api/holdings',
        description: 'Fetch user holdings',
      },
      {
        method: 'GET',
        endpoint: '/api/positions',
        description: 'Fetch user positions',
      },
      {
        method: 'GET',
        endpoint: '/api/orders',
        description: 'Fetch user orders',
      },
    ],
    schema: [
      {
        name: 'User',
        fields: ['name', 'email', 'password', 'createdAt'],
      },
      {
        name: 'Holding',
        fields: ['userId', 'name', 'qty', 'avg', 'price', 'net', 'day'],
      },
      {
        name: 'Position',
        fields: ['userId', 'product', 'name', 'qty', 'avg', 'price'],
      },
      {
        name: 'Order',
        fields: ['userId', 'stockName', 'qty', 'price', 'mode', 'createdAt'],
      },
    ],
    credentials: 'Demo access can be shared on request.',
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Store',
    description:
      'A full-stack MERN e-commerce web app with product listing, cart, orders, authentication and payment gateway ready structure.',
    longDescription:
      'E-Commerce Store is a MERN stack shopping application built with React, Node.js, Express and MongoDB. It includes product listing, cart flow, authentication, order management and payment gateway ready architecture.',
    image: ecommerceHomepage,
    images: [ecommerceHomepage],
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Razorpay Ready',
      'Vercel',
    ],
    features: [
      'Product listing and product details',
      'User authentication',
      'Cart management',
      'Order flow',
      'Backend APIs',
      'Payment gateway ready structure',
      'Responsive UI',
    ],
    github: 'https://github.com/Deveshsahu76/E-Commerce-.git',
    demo: 'https://e-commerce-nu-bay.vercel.app/',
    architecture: [
      'User browses products on React frontend',
      'Frontend communicates with backend APIs',
      'Backend handles products, users, cart and orders',
      'MongoDB stores product, user and order data',
      'Payment gateway structure is ready for integration',
    ],
    apiDocs: [
      {
        method: 'GET',
        endpoint: '/api/products',
        description: 'Fetch all products',
      },
      {
        method: 'GET',
        endpoint: '/api/products/:id',
        description: 'Fetch single product details',
      },
      {
        method: 'POST',
        endpoint: '/api/auth/login',
        description: 'Login user',
      },
      {
        method: 'POST',
        endpoint: '/api/orders',
        description: 'Create new order',
      },
    ],
    schema: [
      {
        name: 'User',
        fields: ['name', 'email', 'password', 'isAdmin', 'createdAt'],
      },
      {
        name: 'Product',
        fields: ['name', 'description', 'price', 'category', 'stock', 'images'],
      },
      {
        name: 'Order',
        fields: ['userId', 'items', 'shippingAddress', 'paymentStatus', 'totalPrice'],
      },
      {
        name: 'OrderItem',
        fields: ['productId', 'name', 'qty', 'price', 'image'],
      },
    ],
    credentials: 'Admin access is not public. Demo access can be shared on request.',
  },
  {
    id: 'version-control-system',
    title: 'Version Control System',
    description:
      'A MERN-based file versioning system where users can upload files, maintain versions and restore previous versions.',
    longDescription:
      'Version Control System is a MERN stack project focused on file version management. It allows users to manage file history and restore previous versions through a structured backend and database design.',
    image: '',
    images: [],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'MERN'],
    features: [
      'File version management',
      'Version history tracking',
      'Restore previous version flow',
      'Backend API structure',
      'MongoDB schema design',
      'Clean frontend interface',
    ],
    github: '',
    demo: '',
    architecture: [
      'User uploads or updates a file',
      'Backend creates a new version entry',
      'MongoDB stores file metadata and version history',
      'User can view history and restore old versions',
    ],
    apiDocs: [
      {
        method: 'POST',
        endpoint: '/api/files',
        description: 'Upload or create a file record',
      },
      {
        method: 'GET',
        endpoint: '/api/files/:id/versions',
        description: 'Fetch file version history',
      },
      {
        method: 'POST',
        endpoint: '/api/files/:id/restore',
        description: 'Restore selected file version',
      },
    ],
    schema: [
      {
        name: 'File',
        fields: ['name', 'ownerId', 'currentVersion', 'createdAt'],
      },
      {
        name: 'Version',
        fields: ['fileId', 'versionNumber', 'content', 'createdAt'],
      },
    ],
    credentials: 'Project code/demo can be shared on request.',
  },
]

export default projects