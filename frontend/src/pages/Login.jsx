import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const simulatedUser = { name: 'Customer Demo', email: form.email, role: 'customer' };
      onLogin?.(simulatedUser);
      navigate('/dashboard');
    } catch {
      setError('Unable to sign in. Please try again.');
    }
  };

  return (
    <section className="auth-shell section-shell">
      <div className="auth-card">
        <div className="eyebrow">Customer access</div>
        <h2>Welcome back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="auth-footer">Need an account? <Link to="/register">Create one</Link></p>
      </div>
    </section>
  );
}
