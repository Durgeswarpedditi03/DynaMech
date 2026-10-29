import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Register({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await api.registerCustomer(form);
      onLogin?.(result.user, result.token);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-shell section-shell">
      <div className="auth-card">
        <div className="eyebrow">Create account</div>
        <h2>Join DynaMech</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Full name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Creating account...' : 'Create account'}</button>
        </form>
        <p className="auth-footer">Already a member? <Link to="/login">Login here</Link></p>
      </div>
    </section>
  );
}
