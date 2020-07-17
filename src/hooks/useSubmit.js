import { useCallback } from 'react'
import mixpanel from 'mixpanel-browser'

export default () =>
  useCallback(async (order) => {
    mixpanel.track('Order made')

    window.localStorage.setItem('lastOrder', JSON.stringify(order.products))
    window.localStorage.setItem('payment', JSON.stringify(order.payment))
    window.localStorage.setItem('account', JSON.stringify(order.account))
    const body = JSON.stringify({
      ...order,
      date: new Date(),
    })

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body,
      })
      return response.ok
    } catch (err) {
      return false
    }
  }, [])
