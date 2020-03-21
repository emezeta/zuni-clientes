import { useState } from 'react'

const emptyDelivery = {
  date: new Date(),
  payment: '',
  notes: '',
}

export default () => {
  const [delivery, setDelivery] = useState(emptyDelivery)

  const changeDate = date => setDelivery({ ...delivery, date })
  const changePayment = payment => setDelivery({ ...delivery, payment })
  const changeNotes = notes => setDelivery({ ...delivery, notes })

  return { delivery, changeDate, changePayment, changeNotes }
}
