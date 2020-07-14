import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import mixpanel from 'mixpanel-browser'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const options = {
  position: 'bottom center',
  offset: '100px',
  timeout: 5000,
  transition: 'fade',
}

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
