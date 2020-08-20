import React from 'react'
import Button from '@material-ui/core/Button'

import useChangePassword from 'hooks/useChangePassword'

import NavBar from 'components/common/NavBar'
import ChangePasswordBox from 'components/auth/ChangePasswordBox'
import Loader from 'components/common/Loader'

const Login = () => {
  const {
    password,
    changePassword,
    newPassword,
    changeNewPassword,
    newPasswordConfirmation,
    changeNewPasswordConfirmation,
    submit,
    loading,
  } = useChangePassword()

  if (loading) return <Loader />

  return (
    <>
      <NavBar />
      <div className="row justify-content-center">
        <form onSubmit={submit} className="col col-md-8 col-lg-6">
          <ChangePasswordBox
            errors={{}}
            passwordForm={{ password, newPassword, newPasswordConfirmation }}
            changePassword={changePassword}
            changeNewPassword={changeNewPassword}
            changeNewPasswordConfirmation={changeNewPasswordConfirmation}
          />
          <Button
            variant="contained"
            color="primary"
            className="col mt-4"
            type="submit"
          >
            Cambiar contraseña
          </Button>
        </form>
      </div>
    </>
  )
}

export default Login
