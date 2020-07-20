import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import useSession from '../hooks/useSession'
import useLogin from '../hooks/useLogin'

import LoginBox from '../components/LoginBox'
import Loader from '../components/Loader'

const Login = () => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    session && navigate('/')
  }, [session, navigate])

  const {
    password,
    changePassword,
    phone,
    changePhone,
    submit,
    loading,
  } = useLogin()

  if (loading) return <Loader />

  return (
    <>
      <div className="row">
        <form onSubmit={submit} className="col col-md-6 offset-md-3">
          <LoginBox
            login={{ phone, password }}
            changePhone={changePhone}
            changePassword={changePassword}
          />
          <Button
            variant="contained"
            color="primary"
            className="col mt-4"
            type="submit"
          >
            Acceder
          </Button>
        </form>
      </div>
      <div className="row mt-4">
        <div className="col col-md-6 offset-md-3">
          <Link href="/signup">
            <Button color="primary" className="col">
              Solicitar accesso
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
