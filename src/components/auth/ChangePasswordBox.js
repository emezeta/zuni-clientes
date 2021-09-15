import React, { memo } from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const ChangePasswordBox = ({
  className,
  passwordForm,
  changePassword,
  changeNewPassword,
  changeNewPasswordConfirmation,
  errors,
}) => (
  <Card className={cn('px-4 pb-4 pt-1 d-flex flex-column', className)}>
    <TextField
      error={errors.password}
      value={passwordForm.password}
      onChange={(e) => changePassword(e.target.value)}
      className="my-2"
      type="password"
      label="Contraseña actual*"
    />
    <TextField
      error={errors.newPassword}
      value={passwordForm.newPassword}
      onChange={(e) => changeNewPassword(e.target.value)}
      className="my-2"
      type="password"
      label="Contraseña nueva*"
    />
    <TextField
      error={errors.newPasswordConfirmation}
      value={passwordForm.newPasswordConfirmation}
      onChange={(e) => changeNewPasswordConfirmation(e.target.value)}
      className="my-2"
      type="password"
      label="Confirmar nueva contraseña*"
    />
  </Card>
)

export default memo(ChangePasswordBox)
