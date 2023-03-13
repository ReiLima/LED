import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default api