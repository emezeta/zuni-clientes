import React from 'react'

import useLogin from '../hooks/useLogin'

const Login = () => {
  const {
    password,
    onChangePassword,
    phone,
    onChangePhone,
    submit,
  } = useLogin()

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={onChangePhone} value={phone} />
        <input onChange={onChangePassword} value={password} />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
