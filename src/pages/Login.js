import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import useSession from '../hooks/useSession'
import useLogin from '../hooks/useLogin'

import LoginBox from '../components/LoginBox'

const Login = () => {
  const session = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    session && navigate('/')
  }, [session, navigate])

  const { password, changePassword, phone, changePhone, submit } = useLogin()

  return (
    <div className="container d-flex flex-grow-1 flex-column mt-4">
      <div className="row">
        <form onSubmit={submit} className="col col-md-6 offset-md-3">
          <LoginBox
            login={{ phone, password }}
            changePhone={changePhone}
            changePassword={changePassword}
            errors={{}}
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
          <Button
            color="primary"
            onClick={() => navigate('/signup')}
            className="col"
            type="submit"
          >
            Solicitar accesso
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
