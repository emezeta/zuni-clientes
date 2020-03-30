import { useState, useCallback, useEffect } from 'react'

import { isEmpty } from '../helpers'

const in3hours = new Date()
in3hours.setHours(in3hours.getHours() + 3)

const emptyDelivery = {
  date: in3hours,
  payment: '',
  notes: '',
  account: '',
}

export default () => {
  const [delivery, setDelivery] = useState(emptyDelivery)
  const [deliveryErrors, setErrors] = useState({})

  useEffect(() => {
    const payment = JSON.parse(window.localStorage.getItem('payment'))
    payment && setDelivery({ ...emptyDelivery, payment })
  }, [])

  const changeDate = useCallback((date) => setDelivery({ ...delivery, date }), [
    delivery,
  ])

  const changePayment = useCallback(
    (payment) => setDelivery({ ...delivery, payment }),
    [delivery]
  )
  const changeNotes = useCallback(
    (notes) => setDelivery({ ...delivery, notes }),
    [delivery]
  )
  const changeAccount = useCallback(
    (account) => setDelivery({ ...delivery, account }),
    [delivery]
  )

  const resetDelivery = useCallback(() => setDelivery(emptyDelivery), [])

  const validateDelivery = useCallback(() => {
    const newErrors = {}
    !delivery.date && (newErrors.date = true)
    !delivery.payment && (newErrors.payment = true)
    delivery.payment === 'account' &&
      !delivery.account &&
      (newErrors.account = true)
    setErrors(newErrors)
    return isEmpty(newErrors)
  }, [delivery])

  return {
    delivery,
    changeDate,
    changePayment,
    changeNotes,
    resetDelivery,
    validateDelivery,
    changeAccount,
    deliveryErrors,
  }
}
