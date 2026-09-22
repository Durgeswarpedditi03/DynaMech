import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, MapPinned, ShieldCheck, Wrench } from 'lucide-react';
import { serviceTimeline } from '../data/mockData';

export default function Dashboard() {
  return (
    <section className="section-shell dashboard-shell">
      <div className="dashboard-topbar">
        <div>
          <div className="eyebrow">Customer dashboard</div>
          <h2>Welcome back!</h2>
        </div>
        <Link to="/service-request" className="btn btn-primary small">New request</Link>
      </div>

      <div className="dashboard-cards">
        <article className="dash-card large">
          <div className="tiny-label">Active request</div>
          <h3>Bike not starting</h3>
          <div className="mini-info"><MapPinned size={16} /> HSR Layout, Bengaluru</div>
          <div className="mini-info"><Wrench size={16} /> Assigned: Arjun Kumar</div>
          <div className="mini-info"><Gauge size={16} /> Status: Mechanic on the way</div>
        </article>
        <article className="dash-card">
          <div className="tiny-label">Vehicle</div>
          <h3>Royal Enfield Classic 350</h3>
          <p>Service due in 3 months</p>
        </article>
        <article className="dash-card">
          <div className="tiny-label">Mechanic</div>
          <h3>Arjun Kumar</h3>
          <p>Verified • 4.8 rating</p>
        </article>
      </div>

      <div className="timeline-box">
        <h3>Request progress</h3>
        <div className="timeline">
          {serviceTimeline.map((stage, index) => (
            <div key={stage} className={`timeline-node ${index === 3 ? 'active' : ''}`}>
              <span className="timeline-dot" />
              <span>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-panel">
          <div className="panel-header"><ShieldCheck size={18} /> Service summary</div>
          <ul>
            <li>Request created: 9:15 AM</li>
            <li>Route assigned: 9:40 AM</li>
            <li>Expected arrival: 10:20 AM</li>
          </ul>
        </div>
        <div className="dash-panel">
          <div className="panel-header"><ArrowRight size={18} /> Quick actions</div>
          <div className="quick-links">
            <Link to="/my-requests">My Requests</Link>
            <Link to="/spare-parts">Spare Parts</Link>
            <Link to="/orders">Orders</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
