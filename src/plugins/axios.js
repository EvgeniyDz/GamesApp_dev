import axios from 'axios'
import notify from './pnotify'
import qs from 'qs'

axios.defaults.paramsSerializer = params => {
  return qs.stringify(params)
}

// Request interceptor
axios.interceptors.request.use(request => {
  request.headers = {
    'x-rapidapi-hos': 'rawg-video-games-database.p.rapidapi.com',
    'x-rapidapi-key': '0cb09984b7msh8da7946b53116b2p100409jsn2b71542652a3'
  }

  // request.headers.x-rapidapi-host = `rawg-video-games-database.p.rapidapi.com`
  // request.headers.x-rapidapi-key = `0cb09984b7msh8da7946b53116b2p100409jsn2b71542652a3`

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  if (error.response) {
    const { status } = error.response

    if (status !== 422) {
      notify(error.response.statusText, error.response.data.message, 'danger')
    }
  }

  return Promise.reject(error)
})

export default axios
