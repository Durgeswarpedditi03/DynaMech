const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const AUTH_TOKEN_KEY = 'dynamech-token';
export const AUTH_USER_KEY = 'dynamech-user';

let sparePartsRequest;

export const api = {
  baseUrl: API_BASE,
  async request(path, options = {}) {
    const { headers = {}, ...requestOptions } = options;
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const response = await fetch(`${API_BASE}${path}`, {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
      }
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
    if (!sparePartsRequest) {
      sparePartsRequest = this.request('/api/spare-parts').catch((error) => {
        sparePartsRequest = null;
        throw error;
      });
    }

    return sparePartsRequest;
  },
  createOrder(payload) {
    return this.request('/api/orders', { method: 'POST', body: JSON.stringify(payload) })
      .then((result) => {
        sparePartsRequest = null;
        return result;
      });
  },
  listCustomerRequests() {
    return this.request('/api/my-requests');
  }
};
