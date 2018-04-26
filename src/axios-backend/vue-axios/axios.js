/* global localStorage */

import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:8000/';

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': 'Token ' + localStorage.token
  }
})
