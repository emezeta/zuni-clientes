import React, { memo } from 'react'
import cn from 'classnames'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const ClientBox = ({
  className,
  client,
  changeName,
  changePhone,
  changeAddress,
  errors,
}) => (
  <Card
    className={cn('px-4 pb-4 pt-3 d-flex flex-column flex-grow-1', className)}
  >
    <span className="align-self-center">Información del cliente</span>
    <TextField
      error={errors.name}
      value={client.name}
      onChange={(e) => changeName(e.target.value)}
      className="my-2"
      label="Nombre*"
    />
    <TextField
      error={errors.phone}
      value={client.phone}
      onChange={(e) => changePhone(e.target.value)}
      className="my-2"
      label="Telefono*"
      type="number"
    />
    <TextField
      error={errors.address}
      value={client.address}
      onChange={(e) => changeAddress(e.target.value)}
      className="my-2"
      label="Dirección*"
    />
  </Card>
)

export default memo(ClientBox)
