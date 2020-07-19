import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import mixpanel from 'mixpanel-browser'
import { BrowserRouter } from 'react-router-dom'

import './tools/registerInterceptors'
import './index.css'
import App from './App'
import SessionProvider from './components/SessionProvider'
import * as serviceWorker from './serviceWorker'

// const options = {
//   position: 'bottom center',
//   offset: '100px',
//   timeout: 5000,
//   transition: 'fade',
// }

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)
if (!process.env.REACT_APP_MIXPANEL_TOKEN) mixpanel.track = () => {}

ReactDOM.render(
  <SessionProvider>
    <BrowserRouter>
      <SnackbarProvider class="mb-5">
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </SessionProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
