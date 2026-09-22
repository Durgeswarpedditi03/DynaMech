const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  baseUrl: API_BASE,
  async request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
      const message = typeof payload === 'string' ? payload : payload?.message || 'Request failed';
      throw new Error(message);
    }

    return payload;
  },
  loginCustomer(payload) {
    return this.request('/api/login', { method: 'POST', body: JSON.stringify(payload) });
  },
  registerCustomer(payload) {
    return this.request('/api/register', { method: 'POST', body: JSON.stringify(payload) });
  },
  submitServiceRequest(payload) {
    return this.request('/api/service-request', { method: 'POST', body: JSON.stringify(payload) });
  },
  listSpareParts() {
    return this.request('/api/spare-parts');
  },
  listCustomerRequests(email) {
    return this.request(`/api/my-requests/${encodeURIComponent(email)}`);
  }
};
