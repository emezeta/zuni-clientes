import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useSession from '../hooks/useSession'
import useLogin from '../hooks/useLogin'

const Login = () => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    session && navigate('/')
  }, [session, navigate])

  const {
    password,
    onChangePassword,
    phone,
    onChangePhone,
    submit,
  } = useLogin()

  return (
    <form onSubmit={submit}>
      <input onChange={onChangePhone} value={phone} />
      <input onChange={onChangePassword} value={password} />
      <button type="submit">login</button>
    </form>
  )
}

export default Login
