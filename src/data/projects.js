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
    features: [
      'JWT authentication and protected routes',
      'Holdings, positions and orders dashboard',
      'Responsive trading dashboard UI',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bootstrap'],
    github: 'https://github.com/Deveshsahu76/zerodha-clone-',
    demo: 'https://zerodha-clone-frontend-7qlg.onrender.com/',
    image: zerodhaHomepage,
    images: [zerodhaHomepage, zerodhaDashboard, zerodhaHoldings],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    type: 'MERN App',
    status: 'Live',
    description:
      'A full-stack e-commerce platform with authentication, product listing, cart management, orders and payment-ready architecture.',
    features: [
      'User authentication and protected routes',
      'Product listing, cart and order flow',
      'Admin/payment integration-ready structure',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'JWT'],
    github: 'https://github.com/Deveshsahu76/E-Commerce-.git',
    demo: 'https://e-commerce-nu-bay.vercel.app/',
    image: ecommerceHomepage,
    images: [ecommerceHomepage],
  },
  {
    id: 'vcs',
    title: 'Web Version Control System',
    type: 'Full Stack',
    status: 'Case Study',
    description:
      'A web-based version control system for tracking, storing and restoring file versions through a simple UI.',
    features: [
      'File version history workflow',
      'Restore previous file versions',
      'Backend APIs for version records',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Deveshsahu76',
    demo: '',
    image: '',
  },
];

export default projects;