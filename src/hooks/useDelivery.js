import { useState, useCallback } from 'react'

import { isEmpty } from '../helpers'

const emptyDelivery = {
  date: null,
  payment: '',
  notes: '',
}

export default () => {
  const [delivery, setDelivery] = useState(emptyDelivery)
  const [deliveryErrors, setErrors] = useState({})

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

  const resetDelivery = useCallback(() => setDelivery(emptyDelivery), [])

  const validateDelivery = useCallback(() => {
    const newErrors = {}
    !delivery.date && (newErrors.date = true)
    !delivery.payment && (newErrors.payment = true)
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
    deliveryErrors,
  }
}
