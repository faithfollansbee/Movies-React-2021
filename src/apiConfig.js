let apiUrl
const apiUrls = {
  production: 'https://movies-app-2muv.onrender.com',
  // development: 'http://localhost:4741'
  development: 'http://localhost:4742'

}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
