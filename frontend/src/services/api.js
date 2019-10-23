import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/v1'
      : 'https://launchdevs.com/v1',
});

export default api;
