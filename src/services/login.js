import axios from 'axios';

const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const register = async (formData) => {
  const response = await axios.post('/api/users', formData);
  return response.data;
};

export default { login, register };
