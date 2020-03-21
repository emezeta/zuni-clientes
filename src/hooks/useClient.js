import { useState } from 'react'
import produce from 'immer'

const emptyClient = {
  name: '',
  phone: '',
  address: '',
}

export default () => {
  const [client, setClient] = useState(emptyClient)
  const [clientErrors, setErrors] = useState({})

  const mutateClient = fn => setClient(produce(client, fn))

  const changeName = newName =>
    mutateClient(draft => void (draft.name = newName))

  const changePhone = newPhone =>
    mutateClient(draft => void (draft.phone = newPhone))

  const changeAddress = newAddress =>
    mutateClient(draft => void (draft.address = newAddress))

  const validateClient = () => {
    const newErrors = {}
    !client.name && (newErrors.name = true)
    !client.phone && (newErrors.phone = true)
    !client.address && (newErrors.address = true)
    setErrors(newErrors)
    return newErrors
  }

  return {
    client,
    changePhone,
    changeName,
    changeAddress,
    validateClient,
    clientErrors,
  }
}
