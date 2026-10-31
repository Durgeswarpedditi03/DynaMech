import { useState } from 'react';
import { Wrench } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY, api } from '../services/api';

export default function SparePartCard({ part }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inStock = part.quantity > 0;

  const handleOrder = async () => {
    if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      await api.createOrder({ partName: part.partName, quantity: 1 });
      setMessage('Order placed successfully.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="part-card">
      <div className="part-art" aria-hidden="true"><Wrench size={34} /></div>
      <div className="part-body">
        <div className="part-label-row">
          <span>Spare part</span>
          <span className={inStock ? 'stock ok' : 'stock warn'}>{inStock ? `${part.quantity} in stock` : 'Out of stock'}</span>
        </div>
        <h3>{part.partName}</h3>
        <p>{part.description}</p>
        <div className="part-buy-row">
          <strong>₹{part.price}</strong>
        </div>
        <button
          type="button"
          className="btn btn-primary small full"
          onClick={handleOrder}
          disabled={!inStock || isSubmitting || Boolean(message)}
        >
          {!inStock ? 'Out of stock' : isSubmitting ? 'Placing order...' : message ? 'Order placed' : 'Order now'}
        </button>
        {message && <p className="form-success" role="status">{message}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    </article>
  );
}
