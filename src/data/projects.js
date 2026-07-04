import zerodhaDashboard from '../assets/projects/Zerodha-Dashboard.png';
import zerodhaHoldings from '../assets/projects/Zerodha-Holdings.png';
import zerodhaHomepage from '../assets/projects/Zerodha-homepage.png';
import ecommerceHomepage from '../assets/projects/ecommerceHomepage.png';

const projects = [
  {
    id: 'zerodha',
    title: 'Zerodha Clone',
    type: 'MERN + JWT',
    status: 'Live',
    description:
      'A full-stack trading dashboard inspired by Zerodha with authentication, holdings, positions, orders and protected dashboard routes.',
    longDescription:
      'Zerodha Clone is a full-stack stock trading dashboard project built to understand authentication, protected routes, dashboard UI, holdings, positions and order management workflows. It focuses on real-world trading platform UI structure and backend API integration.',
    features: [
      'JWT authentication and protected routes',
      'Holdings, positions and orders dashboard',
      'Responsive trading dashboard UI',
      'Clean dashboard layout inspired by real trading platforms',
      'Backend API integration for portfolio data',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bootstrap'],
    github: 'https://github.com/Deveshsahu76/zerodha-clone-',
    demo: 'https://zerodha-clone-frontend-7qlg.onrender.com/',
    demoVideo: '',
    image: zerodhaHomepage,
    images: [zerodhaHomepage, zerodhaDashboard, zerodhaHoldings],
    architecture: [
      'User',
      'React Frontend',
      'Express Backend',
      'JWT Auth',
      'MongoDB',
    ],
    apiDocs: [
      { method: 'POST', endpoint: '/api/auth/register', description: 'Register a new user' },
      { method: 'POST', endpoint: '/api/auth/login', description: 'Login user and return JWT token' },
      { method: 'GET', endpoint: '/api/auth/me', description: 'Get logged-in user details' },
      { method: 'GET', endpoint: '/api/holdings', description: 'Get holdings data' },
      { method: 'GET', endpoint: '/api/positions', description: 'Get positions data' },
      { method: 'GET', endpoint: '/api/orders', description: 'Get order history' },
      { method: 'POST', endpoint: '/api/orders', description: 'Place a new order' },
    ],
    schema: [
      {
        name: 'User',
        fields: ['name', 'email', 'password', 'createdAt'],
      },
      {
        name: 'Holding',
        fields: ['userId', 'stockName', 'quantity', 'averagePrice', 'currentPrice'],
      },
      {
        name: 'Position',
        fields: ['userId', 'stockName', 'quantity', 'buyPrice', 'sellPrice'],
      },
      {
        name: 'Order',
        fields: ['userId', 'stockName', 'orderType', 'quantity', 'price', 'status'],
      },
    ],
    credentials: [
      {
        role: 'Demo User',
        note: 'Use live demo directly. Demo credentials can be added after creating a safe test account.',
      },
      {
        role: 'Admin Access',
        note: 'Admin access available on request. Real private credentials are not shared publicly.',
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    type: 'MERN App',
    status: 'Live',
    description:
      'A full-stack e-commerce platform with authentication, product listing, cart management, orders and payment-ready architecture.',
    longDescription:
      'E-Commerce Store is a MERN stack shopping platform built with product browsing, authentication, cart management, order flow and payment-ready backend structure. It demonstrates practical full-stack development, REST APIs, database integration and responsive UI.',
    features: [
      'User authentication and protected routes',
      'Product listing, cart and order flow',
      'Admin/payment integration-ready structure',
      'Responsive shopping experience',
      'REST API based backend architecture',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'JWT'],
    github: 'https://github.com/Deveshsahu76/E-Commerce-.git',
    demo: 'https://e-commerce-nu-bay.vercel.app/',
    demoVideo: '',
    image: ecommerceHomepage,
    images: [ecommerceHomepage],
    architecture: [
      'User',
      'React Frontend',
      'Redux State',
      'Express API',
      'MongoDB',
    ],
    apiDocs: [
      { method: 'POST', endpoint: '/api/auth/register', description: 'Register a new user' },
      { method: 'POST', endpoint: '/api/auth/login', description: 'Login user' },
      { method: 'GET', endpoint: '/api/auth/me', description: 'Get current user profile' },
      { method: 'GET', endpoint: '/api/products', description: 'Get all products' },
      { method: 'GET', endpoint: '/api/products/:id', description: 'Get single product details' },
      { method: 'POST', endpoint: '/api/orders', description: 'Create new order' },
      { method: 'GET', endpoint: '/api/orders/my-orders', description: 'Get logged-in user orders' },
    ],
    schema: [
      {
        name: 'User',
        fields: ['name', 'email', 'password', 'role', 'createdAt'],
      },
      {
        name: 'Product',
        fields: ['name', 'description', 'price', 'category', 'stock', 'images', 'rating'],
      },
      {
        name: 'Order',
        fields: ['userId', 'items', 'shippingAddress', 'totalPrice', 'paymentStatus', 'orderStatus'],
      },
      {
        name: 'OrderItem',
        fields: ['productId', 'name', 'quantity', 'price', 'image'],
      },
    ],
    credentials: [
      {
        role: 'Demo User',
        note: 'Create a test account from signup page or use public demo flow.',
      },
      {
        role: 'Admin Access',
        note: 'Admin access available on request. Do not publish real admin credentials.',
      },
    ],
  },
  {
    id: 'vcs',
    title: 'Web Version Control System',
    type: 'Full Stack',
    status: 'Case Study',
    description:
      'A web-based version control system for tracking, storing and restoring file versions through a simple UI.',
    longDescription:
      'A full-stack web version control project focused on storing file version records, tracking changes and restoring previous versions through a clean web interface.',
    features: [
      'File version history workflow',
      'Restore previous file versions',
      'Backend APIs for version records',
      'Simple and clean user interface',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Deveshsahu76',
    demo: '',
    demoVideo: '',
    image: '',
    images: [],
    architecture: [
      'User',
      'React Frontend',
      'Express API',
      'Version Records',
      'MongoDB',
    ],
    apiDocs: [
      { method: 'POST', endpoint: '/api/files/upload', description: 'Upload a new file version' },
      { method: 'GET', endpoint: '/api/files', description: 'Get all file records' },
      { method: 'GET', endpoint: '/api/files/:id/versions', description: 'Get version history' },
      { method: 'POST', endpoint: '/api/files/:id/restore', description: 'Restore previous version' },
    ],
    schema: [
      {
        name: 'File',
        fields: ['filename', 'ownerId', 'currentVersion', 'createdAt'],
      },
      {
        name: 'Version',
        fields: ['fileId', 'versionNumber', 'contentUrl', 'changes', 'createdAt'],
      },
    ],
    credentials: [
      {
        role: 'Access',
        note: 'Demo access will be added after deployment.',
      },
    ],
  },
];

export default projects;