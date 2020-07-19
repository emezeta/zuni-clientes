import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import useSession from '../hooks/useSession'

export default () => {
  const [phone, changePhone] = useState('')
  const { enqueueSnackbar } = useSnackbar()

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
          enqueueSnackbar('Solicitud realizada con éxito', {
            variant: 'success',
          })
          navigate('/login')
        }

        return response.ok
      } catch (err) {
        console.log(err)
        return false
      }
    },
    [phone, enqueueSnackbar, navigate]
  )

  return {
    phone,
    changePhone,
    submit,
  }
}
