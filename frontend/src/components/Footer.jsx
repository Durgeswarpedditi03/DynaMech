import { Cog } from 'lucide-react';

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
            <li>About</li>
            <li>Services</li>
            <li>Pricing</li>
            <li>Partners</li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Help Centre</li>
            <li>Contact</li>
            <li>Roadside</li>
            <li>Safety</li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>X / Twitter</li>
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
