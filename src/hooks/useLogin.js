import { useState, useCallback } from 'react'
import mixpanel from 'mixpanel-browser'
import { useAlert } from 'react-alert'

export default () => {
  const [phone, changePhone] = useState('')
  const [password, changePassword] = useState('')
  const alert = useAlert()

  const submit = useCallback(
    async (e) => {
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
        mixpanel.track('Login', { success: true })

        if (response.status === 401) {
          alert.error('Teléfono o contraseña incorrectos')
          await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
            method: 'POST',
            body,
          })
        }

        return response.ok
      } catch (err) {
        console.log(err)
        mixpanel.track('Login', { success: false })
        return false
      }
    },
    [password, phone, alert]
  )

  return {
    phone,
    password,
    changePhone,
    changePassword,
    submit,
  }
}
