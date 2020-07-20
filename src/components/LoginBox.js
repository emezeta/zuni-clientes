import React, { memo } from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'

const LoginBox = ({
  className,
  login,
  changePassword,
  changePhone,
  errors,
}) => (
  <div
    className={cn(
      'bg-white rounded px-4 pb-4 pt-1 d-flex flex-column flex-grow-1 shadow',
      className
    )}
  >
    <TextField
      type="tel"
      value={login.phone}
      onChange={(e) => changePhone(e.target.value)}
      className="my-2"
      label="Teléfono*"
    />
    <TextField
      value={login.password}
      onChange={(e) => changePassword(e.target.value)}
      className="my-2"
      label="Contraseña*"
      type="password"
    />
  </div>
)

export default memo(LoginBox)
