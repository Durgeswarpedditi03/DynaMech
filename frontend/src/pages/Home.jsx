import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SparePartCard from '../components/SparePartCard';
import { api } from '../services/api';

export default function Home() {
  const [spareParts, setSpareParts] = useState([]);
  const [partsError, setPartsError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    api.listSpareParts()
      .then((parts) => {
        if (isCurrent) setSpareParts(parts);
      })
      .catch((error) => {
        if (isCurrent) setPartsError(error.message);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

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
            <div className="eyebrow">Marketplace</div>
            <h2>Find the Right Spare Parts</h2>
          </div>
          <Link to="/spare-parts" className="text-link">Open market <ArrowRight size={16} /></Link>
        </div>
        {partsError && <p className="form-error" role="alert">{partsError}</p>}
        {!partsError && spareParts.length === 0 && <p>Loading spare parts...</p>}
        <div className="part-grid">
          {spareParts.slice(0, 6).map((part) => <SparePartCard key={part._id} part={part} />)}
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

    </>
  );
}
