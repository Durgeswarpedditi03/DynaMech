import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { mechanics, spareParts } from '../data/mockData';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section-shell smart-assist">
        <div className="section-heading left-align">
          <div className="eyebrow">Smart assistance</div>
          <h2>Smart Assistance for Your Vehicle</h2>
        </div>
        <div className="smart-flow">
          {['Customer uploads vehicle/problem image', 'System analyzes the problem', 'Problem category identified', 'Suitable mechanics found', 'Customer gets assistance'].map((item, index) => (
            <div key={item} className="flow-item">
              <div className="flow-badge">{index + 1}</div>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="muted-copy">DynaMech can be extended with AI-based vehicle problem classification for smarter recommendations and faster customer support.</p>
      </section>

      <section className="section-shell">
        <div className="section-heading split-heading">
          <div>
            <div className="eyebrow">Find reliable mechanics</div>
            <h2>Find Reliable Mechanics</h2>
          </div>
          <Link to="/mechanics" className="text-link">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="mechanic-grid">
          {mechanics.map((mechanic) => (
            <article key={mechanic.id} className="mechanic-card">
              <div className="mechanic-header">
                <img src={mechanic.avatar} alt={mechanic.name} />
                <div>
                  <h3>{mechanic.name}</h3>
                  <span className="verified-badge">{mechanic.verified ? '✓ Verified Mechanic' : 'New Partner'}</span>
                </div>
              </div>
              <div className="meta-row">
                <span>{mechanic.vehicleTypes.join(' • ')}</span>
              </div>
              <div className="metrics-row">
                <span><Star size={14} fill="currentColor" /> {mechanic.rating}</span>
                <span>{mechanic.jobs} Jobs Completed</span>
              </div>
              <div className="availability-row">
                <span className={mechanic.available ? 'status available' : 'status offline'}>{mechanic.available ? 'Available Now' : 'Offline'}</span>
                <span>{mechanic.distance}</span>
              </div>
              <div className="card-actions">
                <button className="btn btn-ghost small">View Profile</button>
                <button className="btn btn-primary small">Request Mechanic</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell reliability-box">
        <div className="section-heading">
          <div className="eyebrow">Reliability</div>
          <h2>Mechanic Reliability Score</h2>
        </div>
        <div className="reliability-layout">
          <div className="score-ring">
            <div className="score-core">
              <strong>92</strong>
              <span>/100</span>
            </div>
          </div>
          <div className="score-factors">
            {['Customer ratings', 'Completed jobs', 'Response time', 'Acceptance rate', 'Verification', 'Service history'].map((item) => (
              <div key={item} className="factor-item"><span className="dot" />{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading split-heading">
          <div>
            <div className="eyebrow">Marketplace</div>
            <h2>Find the Right Spare Parts</h2>
          </div>
          <Link to="/spare-parts" className="text-link">Open market <ArrowRight size={16} /></Link>
        </div>
        <div className="part-grid">
          {spareParts.map((part) => (
            <article key={part.id} className="part-card">
              <img src={part.image} alt={part.name} />
              <div className="part-body">
                <div className="part-label-row"><span>{part.category}</span><span>⭐ {part.rating}</span></div>
                <h3>{part.name}</h3>
                <p>{part.compatibility}</p>
                <div className="part-buy-row">
                  <strong>₹{part.price}</strong>
                  <span className={part.inStock ? 'stock ok' : 'stock warn'}>{part.inStock ? 'In Stock' : 'Low Stock'}</span>
                </div>
                <button className="btn btn-primary small full">Add to Cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell why-box">
        <div className="section-heading">
          <div className="eyebrow">Why choose us</div>
          <h2>Built for modern vehicle support</h2>
        </div>
        <div className="why-grid">
          {[
            ['Verified network', 'Connected to trusted mechanics and service professionals.'],
            ['Fast response', 'Quick help for breakdowns, flat tyres, battery issues, and immediate repair requests.'],
            ['Smart matching', 'Vehicle-specific support based on location, skills, and reliability.'],
            ['One platform', 'Mechanics, service requests, and spare parts all in one place.']
          ].map(([title, text]) => (
            <div key={title} className="why-item">
              <div className="mini-icon"><ShieldCheck size={18} /></div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell stats-panel">
        <div className="stats-row">
          {[
            ['9.5K+', 'Customers served'],
            ['92%', 'Average satisfaction'],
            ['14 min', 'Average response'],
            ['300+', 'Verified mechanics']
          ].map(([value, label]) => (
            <div key={label} className="stat-box">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell cta-panel">
        <div>
          <div className="eyebrow">Ready to move</div>
          <h2>Need a mechanic or a spare part? DynaMech is ready.</h2>
        </div>
        <Link to="/service-request" className="btn btn-primary">Request Service</Link>
      </section>
    </>
  );
}
