import { useCallback } from 'react'

export default () =>
  useCallback(async (order) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(order),
      })
      return response.ok
    } catch (err) {
      return false
    }
  }, [])
