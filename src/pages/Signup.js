import React from 'react'
import Button from '@material-ui/core/Button'

import useSignup from 'hooks/useSignup'

import SignupBox from 'components/auth/SignupBox'

const Signup = () => {
  const { phone, changePhone, submit } = useSignup()

  return (
    <div className="row justify-content-center">
      <form onSubmit={submit} className="col col-md-8 col-lg-6">
        <SignupBox phone={phone} changePhone={changePhone} errors={{}} />
        <Button
          variant="contained"
          color="primary"
          className="col mt-4"
          type="submit"
        >
          Solicitar acceso
        </Button>
      </form>
    </div>
  )
}

export default Signup
