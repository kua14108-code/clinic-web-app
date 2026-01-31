const API_URL = 'http://localhost:5000/api';

async function apiRequest(path, method = 'GET', body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${path}`, options);
  return response.json();
}
