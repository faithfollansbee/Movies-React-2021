import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'materialize-css/dist/css/materialize.min.css'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))