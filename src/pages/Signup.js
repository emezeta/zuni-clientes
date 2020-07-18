import React from 'react'
import Button from '@material-ui/core/Button'

import useSignup from '../hooks/useSignup'

import SignupBox from '../components/SignupBox'

const Signup = () => {
  const { phone, changePhone, submit } = useSignup()

  return (
    <div className="container d-flex flex-grow-1 flex-column mt-4">
      <div className="row">
        <form onSubmit={submit} className="col col-md-6 offset-md-3">
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
    </div>
  )
}

export default Signup
