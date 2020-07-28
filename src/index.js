import React from 'react'
import { render, hydrate } from 'react-dom'
import mixpanel from 'mixpanel-browser'

import { version } from '../package.json'
import './tools/registerInterceptors'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

if (!process.env.REACT_APP_MIXPANEL_TOKEN) {
  mixpanel.track = () => {}
  mixpanel.people = {}
  mixpanel.people.set = () => {}
  mixpanel.identify = () => {}
} else {
  mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN)
  mixpanel.register({
    version,
  })
}

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
