import { Star } from 'lucide-react';
import { mechanics } from '../data/mockData';

export default function Mechanics() {
  return (
    <section className="section-shell">
      <div className="section-heading">
        <div className="eyebrow">Mechanics</div>
        <h2>Find Reliable Mechanics</h2>
      </div>
      <div className="mechanic-grid full-width">
        {mechanics.map((mechanic) => (
          <article key={mechanic.id} className="mechanic-card large-card">
            <div className="mechanic-header">
              <img src={mechanic.avatar} alt={mechanic.name} />
              <div>
                <h3>{mechanic.name}</h3>
                <span className="verified-badge">{mechanic.verified ? '✓ Verified Mechanic' : 'New Partner'}</span>
              </div>
            </div>
            <div className="meta-row"><strong>Skills:</strong> {mechanic.skills.join(' • ')}</div>
            <div className="meta-row"><strong>Vehicle types:</strong> {mechanic.vehicleTypes.join(' • ')}</div>
            <div className="metrics-row">
              <span><Star size={14} fill="currentColor" /> {mechanic.rating}</span>
              <span>{mechanic.jobs} jobs</span>
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
  );
}
