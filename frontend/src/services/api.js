const BASE_URL = 'http://localhost:4000/api';

async function request(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${url}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const auth = {
  register: (body) => request('/users/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body) => request('/users/login',    { method: 'POST', body: JSON.stringify(body) }),
};

export const spareParts = {
  getAll:  ()     => request('/spareparts'),
  create: (body) => request('/spareparts', { method: 'POST', body: JSON.stringify(body) }),
  remove: (id)   => request(`/spareparts/${id}`, { method: 'DELETE' }),
};

export const stockIn = {
  getAll:  ()     => request('/stockin'),
  create: (body) => request('/stockin', { method: 'POST', body: JSON.stringify(body) }),
};

export const stockOut = {
  getAll:  ()     => request('/stockout'),
  create: (body) => request('/stockout', { method: 'POST', body: JSON.stringify(body) }),
};
