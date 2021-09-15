import React, { memo } from 'react'
import cn from 'classnames'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const LoginBox = ({
  className,
  login,
  changePassword,
  changePhone,
  errors,
}) => (
  <Card className={cn('px-4 pb-4 pt-1 d-flex flex-column', className)}>
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
  </Card>
)

export default memo(LoginBox)
