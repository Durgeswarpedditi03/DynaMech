import { useEffect, useState } from 'react';
import { Menu, X, ShieldCheck, Wrench } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Mechanics', to: '/mechanics' },
  { label: 'Spare parts', to: '/spare-parts' },
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
          {user ? (
            <>
              <NavLink to="/dashboard" className="nav-item" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <button type="button" className="nav-item nav-logout" onClick={() => { setMenuOpen(false); onLogout(); }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-item" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className="nav-item" onClick={() => setMenuOpen(false)}>Register</NavLink>
            </>
          )}
        </div>

        <button type="button" className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div className="nav-secure"><ShieldCheck size={14} /> Trusted mechanics & verified support</div>
    </header>
  );
}
