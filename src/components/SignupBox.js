import React, { memo } from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'

const SignupBox = ({ className, phone, changePhone, errors }) => (
  <div
    className={cn(
      'bg-white rounded px-4 pb-4 pt-1 d-flex flex-column flex-grow-1 shadow',
      className
    )}
  >
    <TextField
      error={errors.name}
      value={phone}
      onChange={(e) => changePhone(e.target.value)}
      className="my-2"
      label="Teléfono*"
    />
  </div>
)

export default memo(SignupBox)
