/* global localStorage */

import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Authorization': 'Token ' + localStorage.token
  }
})
