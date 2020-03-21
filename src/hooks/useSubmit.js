import { useCallback } from 'react'

export default () =>
  useCallback(async order => {
    const response = await fetch('https://zuni-api.herokuapp.com/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(order),
    })
    return response.ok
  }, [])
