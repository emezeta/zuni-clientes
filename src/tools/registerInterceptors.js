import fetchIntercept from 'fetch-intercept'

import { ACCESS_TOKEN, SessionUpdateEvent } from '../constants'

fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    const token = window.localStorage.getItem(ACCESS_TOKEN)
    return [
      url,
      {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=UTF-8',
          ...config.headers,
        },
      },
    ]
  },

  response: function (response) {
    if (response.status === 401) {
      window.localStorage.removeItem(ACCESS_TOKEN)
      window.dispatchEvent(SessionUpdateEvent)
    }

    const token = response.headers.get(ACCESS_TOKEN)
    if (token) {
      window.localStorage.setItem(ACCESS_TOKEN, token)
      window.dispatchEvent(SessionUpdateEvent)
    }
    return response
  },
})
