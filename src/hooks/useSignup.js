import { useState, useCallback, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

import useSession from '../hooks/useSession'

export default () => {
  const [phone, changePhone] = useState('')
  const alert = useAlert()

  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    session && navigate('/')
  }, [session, navigate])

  const submit = useCallback(
    async (e) => {
      e.preventDefault()
      const body = JSON.stringify({ phone })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/signup`,
          {
            method: 'POST',
            body,
          }
        )
        if (response.ok) {
          alert.success('Solicitud realizada con éxito')
          navigate('/login')
        }

        return response.ok
      } catch (err) {
        console.log(err)
        return false
      }
    },
    [phone, alert, navigate]
  )

  return {
    phone,
    changePhone,
    submit,
  }
}
