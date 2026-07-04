import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import RecruiterHub from './pages/RecruiterHub';
import Freelance from './pages/Freelance';
import AdminRequests from './pages/AdminRequests';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/recruiter" element={<RecruiterHub />} />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-requests" element={<AdminRequests />} />
      </Routes>
    </MainLayout>
  );
}