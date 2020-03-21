import { useState } from 'react'

const emptyDelivery = {
  date: null,
  payment: '',
  notes: '',
}

export default () => {
  const [delivery, setDelivery] = useState(emptyDelivery)
  const [deliveryErrors, setErrors] = useState({})

  const changeDate = date => setDelivery({ ...delivery, date })
  const changePayment = payment => setDelivery({ ...delivery, payment })
  const changeNotes = notes => setDelivery({ ...delivery, notes })

  const resetDelivery = () => setDelivery(emptyDelivery)

  const validateDelivery = () => {
    const newErrors = {}
    !delivery.date && (newErrors.date = true)
    !delivery.payment && (newErrors.payment = true)
    setErrors(newErrors)
    console.log(newErrors)
    return newErrors
  }

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
