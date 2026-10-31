import { useState } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mechanics } from '../data/mockData';

export default function Mechanics() {
  const [selectedMechanic, setSelectedMechanic] = useState(null);

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
              <button type="button" className="btn btn-ghost small" onClick={() => setSelectedMechanic(mechanic)}>View Profile</button>
              <Link to="/service-request" className="btn btn-primary small">Request Mechanic</Link>
            </div>
          </article>
        ))}
      </div>
      {selectedMechanic && (
        <div className="profile-overlay" onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedMechanic(null);
        }}>
          <section className="profile-dialog" role="dialog" aria-modal="true" aria-labelledby="mechanic-profile-title">
            <button type="button" className="profile-close" aria-label="Close profile" onClick={() => setSelectedMechanic(null)}>×</button>
            <div className="mechanic-header">
              <img src={selectedMechanic.avatar} alt="" />
              <div>
                <h3 id="mechanic-profile-title">{selectedMechanic.name}</h3>
                <span className="verified-badge">{selectedMechanic.verified ? '✓ Verified Mechanic' : 'New Partner'}</span>
              </div>
            </div>
            <p><strong>Skills:</strong> {selectedMechanic.skills.join(' • ')}</p>
            <p><strong>Vehicles:</strong> {selectedMechanic.vehicleTypes.join(' • ')}</p>
            <p><strong>Rating:</strong> {selectedMechanic.rating} · {selectedMechanic.jobs} completed jobs</p>
            <p><strong>Availability:</strong> {selectedMechanic.available ? 'Available now' : 'Currently offline'} · {selectedMechanic.distance} away</p>
          </section>
        </div>
      )}
    </section>
  );
}
