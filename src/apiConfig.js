let apiUrl
const apiUrls = {
  // production: 'https://mongodb+srv://admin:adminpassword@moviecluster.kozvt.mongodb.net/Movies?retryWrites=true&w=majority',
  production: 'https://lit-shelf-55632.herokuapp.com',
  // production: 'https://aqueous-atoll-85096.herokuapp.com',
  // development: 'http://localhost:4741'
  development: 'http://localhost:4742'

}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
