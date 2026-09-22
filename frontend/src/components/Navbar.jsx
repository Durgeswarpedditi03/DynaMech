import { useEffect, useState } from 'react';
import { Menu, X, ShieldCheck, Wrench } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Mechanics', to: '/mechanics' },
  { label: 'Spare Parts', to: '/spare-parts' },
  { label: 'About', to: '/about' }
];

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar container">
        <NavLink to="/" className="brand-mark" aria-label="DynaMech home">
          <span className="brand-icon"><Wrench size={16} /></span>
          <span>DynaMech</span>
        </NavLink>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <NavLink to="/dashboard" className="btn btn-ghost">Dashboard</NavLink>
              <button type="button" className="btn btn-ghost" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-ghost">Login</NavLink>
              <NavLink to="/register" className="btn btn-ghost">Register</NavLink>
            </>
          )}
          <NavLink to="/service-request" className="btn btn-primary">Request Service</NavLink>
        </div>

        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div className="nav-secure"><ShieldCheck size={14} /> Trusted mechanics & verified support</div>
    </header>
  );
}
