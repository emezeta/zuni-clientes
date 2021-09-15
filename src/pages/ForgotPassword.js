import React from 'react'
import Button from '@material-ui/core/Button'

import useForgotPassword from 'hooks/useForgotPassword'

import ForgotPasswordBox from 'components/auth/ForgotPasswordBox'
import Loader from 'components/common/Loader'

const ForgotPassword = () => {
  const { submit, loading, phone, changePhone } = useForgotPassword()

  if (loading) return <Loader />

  return (
    <>
      <div className="row justify-content-center">
        <form onSubmit={submit} className="col col-md-8 col-lg-6">
          <ForgotPasswordBox
            errors={{}}
            forgotPasswordForm={{ phone }}
            changePhone={changePhone}
          />
          <Button
            variant="contained"
            color="primary"
            className="col mt-4"
            type="submit"
          >
            Solicitar contraseña
          </Button>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
