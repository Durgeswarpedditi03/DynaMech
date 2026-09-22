import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin?.({ name: form.name, email: form.email, role: 'customer' });
    navigate('/dashboard');
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
          <button type="submit" className="btn btn-primary">Create account</button>
        </form>
        <p className="auth-footer">Already a member? <Link to="/login">Login here</Link></p>
      </div>
    </section>
  );
}
