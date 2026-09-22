import { useMemo, useState } from 'react';
import { spareParts } from '../data/mockData';

export default function SpareParts() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(spareParts.map((part) => part.category))], []);

  const filteredParts = spareParts.filter((part) => {
    const matchesQuery = part.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || part.category === category;
    return matchesQuery && matchesCategory;
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
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search parts" />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>

      <div className="part-grid">
        {filteredParts.map((part) => (
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
  );
}
