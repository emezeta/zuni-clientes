import { useState, useCallback } from 'react'
import mixpanel from 'mixpanel-browser'
import { useSnackbar } from 'notistack'

export default () => {
  const [phone, changePhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, changePassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const submit = useCallback(
    async (e) => {
      setLoading(true)
      e.preventDefault()
      const body = JSON.stringify({ phone, password })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          {
            method: 'POST',
            body,
          }
        )

        if (response.status === 401) {
          mixpanel.track('Login', { success: false })
          enqueueSnackbar('Teléfono o contraseña incorrectos', {
            variant: 'error',
          })
        }

        if (response.ok) {
          mixpanel.track('Login', { success: true })
        }

        setLoading(false)
        return response.ok
      } catch (err) {
        console.log(err)
        mixpanel.track('Login', { success: false })
        setLoading(false)
        return false
      }
    },
    [phone, password, enqueueSnackbar]
  )

  return {
    phone,
    password,
    changePhone,
    changePassword,
    submit,
    loading,
  }
}
