import { useState, useCallback, useEffect } from 'react'

import { isEmpty } from '../helpers'

const emptyClient = {
  name: '',
  phone: '',
  address: '',
}

export default () => {
  const [client, setClient] = useState(emptyClient)
  const [clientErrors, setErrors] = useState({})

  useEffect(() => {
    try {
      const localClient = JSON.parse(window.localStorage.getItem('client'))
      localClient && setClient(localClient)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const changeName = useCallback((name) => setClient({ ...client, name }), [
    client,
  ])

  const changePhone = useCallback((phone) => setClient({ ...client, phone }), [
    client,
  ])

  const changeAddress = useCallback(
    (address) => setClient({ ...client, address }),
    [client]
  )

  const validateClient = useCallback(() => {
    const newErrors = {}
    !client.name && (newErrors.name = true)
    !client.phone && (newErrors.phone = true)
    !client.address && (newErrors.address = true)
    setErrors(newErrors)
    return isEmpty(newErrors)
  }, [client])

  return {
    client,
    changePhone,
    changeName,
    changeAddress,
    validateClient,
    clientErrors,
  }
}
