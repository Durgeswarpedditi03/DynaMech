import { useEffect, useState } from 'react';
import SparePartCard from '../components/SparePartCard';
import { api } from '../services/api';

export default function SpareParts() {
  const [query, setQuery] = useState('');
  const [spareParts, setSpareParts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    api.listSpareParts()
      .then((parts) => {
        if (isCurrent) setSpareParts(parts);
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

  const filteredParts = spareParts.filter((part) => {
    const searchText = `${part.partName} ${part.description}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  return (
    <section className="section-shell">
      <div className="section-heading split-heading">
        <div>
          <div className="eyebrow">Spare parts</div>
          <h2>Find the Right Spare Parts</h2>
        </div>
      </div>

      <div className="filter-row">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search parts"
          aria-label="Search spare parts"
        />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      {isLoading && <p>Loading spare parts...</p>}
      <div className="part-grid">
        {!isLoading && !error && filteredParts.map((part) => <SparePartCard key={part._id} part={part} />)}
      </div>
      {!isLoading && !error && filteredParts.length === 0 && <p>No spare parts match your search.</p>}
    </section>
  );
}
