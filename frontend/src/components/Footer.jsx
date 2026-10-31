import { Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand-mark">
            <span className="brand-icon"><Cog size={16} /></span>
            <span>DynaMech</span>
          </div>
          <p>Smart roadside assistance and spare-parts solutions for modern mobility.</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About DynaMech</Link></li>
            <li><Link to="/services">Our services</Link></li>
            <li><Link to="/how-it-works">How it works</Link></li>
          </ul>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/mechanics">Find a mechanic</Link></li>
            <li><Link to="/spare-parts">Spare parts</Link></li>
            <li><Link to="/service-request">Request assistance</Link></li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Create an account</Link></li>
            <li><Link to="/dashboard">Customer dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 DynaMech</span>
        <span>Built for smooth vehicle support</span>
      </div>
    </footer>
  );
}
