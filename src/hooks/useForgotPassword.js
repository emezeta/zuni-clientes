import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import mixpanel from 'mixpanel-browser'
import { useSnackbar } from 'notistack'

export default () => {
  const [phone, changePhone] = useState('')
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const submit = useCallback(
    async (e) => {
      setLoading(true)
      e.preventDefault()
      const body = JSON.stringify({
        phone,
      })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
          {
            method: 'POST',
            body,
          }
        )

        if (response.ok) {
          enqueueSnackbar('Recibirás un mensaje de texto', {
            variant: 'success',
          })
          mixpanel.track('Change Password', { success: true })
          navigate('/login')
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
    [navigate, phone, enqueueSnackbar]
  )

  return {
    phone,
    changePhone,
    submit,
    loading,
  }
}
