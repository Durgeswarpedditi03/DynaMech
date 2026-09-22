import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ServiceRequest from './pages/ServiceRequest';
import Mechanics from './pages/Mechanics';
import SpareParts from './pages/SpareParts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [authUser, setAuthUser] = useState(null);

  const handleLogin = (user) => setAuthUser({ ...user, role: user.role || 'customer' });
  const handleLogout = () => setAuthUser(null);

  return (
    <div className="app-shell">
      <Navbar user={authUser} onLogout={handleLogout} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<ProtectedRoute authUser={authUser} requiredRole="customer"><Dashboard /></ProtectedRoute>} />
          <Route path="/service-request" element={<ServiceRequest />} />
          <Route path="/mechanics" element={<Mechanics />} />
          <Route path="/spare-parts" element={<SpareParts />} />
          <Route path="/about" element={<section className="section-shell"><div className="section-heading"><div className="eyebrow">About</div><h2>Built for modern mobility care</h2></div><p className="muted-copy">DynaMech connects customers with trusted mechanics and dependable spare-parts support for everyday vehicle issues.</p></section>} />
          <Route path="/how-it-works" element={<section className="section-shell"><div className="section-heading"><div className="eyebrow">Process</div><h2>How it works</h2></div><p className="muted-copy">Report the problem, share the location, match with a mechanic, and get your vehicle repaired with confidence.</p></section>} />
          <Route path="/services" element={<section className="section-shell"><div className="section-heading"><div className="eyebrow">Services</div><h2>Reliable help for every road situation</h2></div><p className="muted-copy">From battery issues to breakdown assistance and spare-part support, DynaMech is designed for daily reliability.</p></section>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
