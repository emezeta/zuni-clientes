import React, { memo } from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const ForgotPasswordBox = ({ className, phone, changePhone, errors }) => (
  <Card className={cn('px-4 pb-4 pt-1 d-flex flex-column', className)}>
    <TextField
      error={errors.phone}
      value={phone}
      onChange={(e) => changePhone(e.target.value)}
      className="my-2"
      type="phone"
      label="Teléfono*"
    />
  </Card>
)

export default memo(ForgotPasswordBox)
