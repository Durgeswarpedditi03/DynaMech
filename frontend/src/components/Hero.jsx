import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-copy">
        <div className="eyebrow">Smart vehicle assistance</div>
        <h1>Your Vehicle Stops.<br />We Get You Moving.</h1>
        <p>Get instant roadside assistance, connect with the right mechanic, diagnose vehicle problems, and find compatible spare parts — all in one intelligent platform.</p>
        <div className="hero-actions">
          <Link to="/service-request" className="btn btn-primary">Request a Mechanic <ArrowRight size={16} /></Link>
          <Link to="/spare-parts" className="btn btn-secondary">Explore Spare Parts</Link>
        </div>
        <div className="hero-stats">
          <div><strong>2.4K+</strong><span>Roadside assists</span></div>
          <div><strong>4.9/5</strong><span>Customer rating</span></div>
          <div><strong>24/7</strong><span>Support network</span></div>
        </div>
      </div>

      <div className="hero-visual-wrap">
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img className="hero-photo" src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=85" alt="Mechanic working on a vehicle in a workshop" />
          <div className="hero-photo-caption"><span className="status-dot" /> Mechanics available nearby <ShieldCheck size={15} /></div>
        </motion.div>
      </div>
    </section>
  );
}
