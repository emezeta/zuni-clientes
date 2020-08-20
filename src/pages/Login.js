import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import useSession from 'hooks/useSession'
import useLogin from 'hooks/useLogin'

import LoginBox from 'components/auth/LoginBox'
import Loader from 'components/common/Loader'

const Login = () => {
  const [session] = useSession()
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
      <div className="row justify-content-center">
        <form onSubmit={submit} className="col col-md-8 col-lg-6">
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
      <div className="row justify-content-center mt-2">
        <div className="col col-md-8 col-lg-6">
          <Link href="/signup">
            <Button color="secondary" className="col">
              Solicitar accesso
            </Button>
          </Link>
          <Link href="/forgot-password">
            <Button color="secondary" className="col">
              Olvidé mi contraseña
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
