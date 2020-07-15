import { useState, useCallback } from 'react'
import mixpanel from 'mixpanel-browser'

export default () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

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
        // mixpanel.track('Login', { success: true })
        return response.ok
      } catch (err) {
        // mixpanel.track('Login', { success: false })
        return false
      }
    },
    [password, phone]
  )

  const onChangePhone = useCallback(({ target: { value } }) => {
    setPhone(value)
  }, [])

  const onChangePassword = useCallback(({ target: { value } }) => {
    setPassword(value)
  }, [])

  return {
    phone,
    password,
    onChangePhone,
    onChangePassword,
    submit,
  }
}
