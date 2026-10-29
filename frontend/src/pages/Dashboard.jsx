import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard({ user }) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    api.listCustomerRequests()
      .then((customerRequests) => {
        if (isCurrent) setRequests(customerRequests);
      })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const latestRequest = requests[requests.length - 1];

  return (
    <section className="section-shell dashboard-shell">
      <div className="dashboard-topbar">
        <div>
          <div className="eyebrow">Customer dashboard</div>
          <h2>Welcome back, {user.name}!</h2>
        </div>
        <Link to="/service-request" className="btn btn-primary small">New request</Link>
      </div>

      <div className="dashboard-cards">
        <article className="dash-card large">
          <div className="tiny-label">Latest request</div>
          <h3>{latestRequest ? latestRequest.vehicle : 'No requests yet'}</h3>
          {latestRequest && <p className="mini-info">{latestRequest.problem}</p>}
          {latestRequest && <p className="mini-info">{latestRequest.location} · {latestRequest.status}</p>}
        </article>
        <article className="dash-card">
          <div className="tiny-label">Your requests</div>
          <h3>{isLoading ? 'Loading...' : requests.length}</h3>
          <p>Requests submitted</p>
        </article>
        <article className="dash-card">
          <div className="tiny-label">Account</div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </article>
      </div>

      <div className="timeline-box">
        <h3>Service requests</h3>
        {error && <p className="form-error" role="alert">{error}</p>}
        {isLoading && <p>Loading your requests...</p>}
        {!isLoading && !error && requests.length === 0 && <p>You have not submitted any requests yet.</p>}
        {!isLoading && !error && requests.map((request) => (
          <article className="dash-panel" key={request._id}>
            <div className="panel-header"><ArrowRight size={18} /> {request.vehicle} · {request.status}</div>
            <p>{request.category ? `${request.category}: ` : ''}{request.problem}</p>
            <p>{request.location} · {request.urgency || 'Routine'}</p>
          </article>
        ))}
        <div className="quick-links">
          <Link to="/spare-parts">Browse Spare Parts</Link>
        </div>
      </div>
    </section>
  );
}
