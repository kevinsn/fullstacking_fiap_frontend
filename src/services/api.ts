import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fullstacking-fiap-backend.vercel.app'
})

export default api;