import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import mixpanel from 'mixpanel-browser'
import { useSnackbar } from 'notistack'

export default () => {
  const [phone, changePhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, changePassword] = useState('')
  const [newPassword, changeNewPassword] = useState('')
  const [newPasswordConfirmation, changeNewPasswordConfirmation] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const submit = useCallback(
    async (e) => {
      setLoading(true)
      e.preventDefault()
      const body = JSON.stringify({
        password,
        newPassword,
        newPasswordConfirmation,
      })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/update-password`,
          {
            method: 'POST',
            body,
          }
        )

        if (response.status === 401) {
          mixpanel.track('Change Password', { success: false })
          enqueueSnackbar('Contraseña incorrecta', {
            variant: 'error',
          })
        }

        if (response.ok) {
          enqueueSnackbar('Contraseña cambiada', {
            variant: 'success',
          })
          mixpanel.track('Change Password', { success: true })
          navigate('/')
        }

        setLoading(false)
        return response.ok
      } catch (err) {
        console.log(err)
        mixpanel.track('Change Password', { success: false })
        setLoading(false)
        return false
      }
    },
    [navigate, password, newPassword, newPasswordConfirmation, enqueueSnackbar]
  )

  return {
    phone,
    password,
    changePhone,
    newPassword,
    changeNewPassword,
    newPasswordConfirmation,
    changeNewPasswordConfirmation,
    changePassword,
    submit,
    loading,
  }
}
