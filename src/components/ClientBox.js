import React from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'

const ClientBox = ({
  className,
  client,
  changeName,
  changePhone,
  changeAddress,
}) => (
  <div
    className={cn(
      'bg-white rounded px-4 pb-4 pt-3 d-flex flex-column flex-grow-1',
      className
    )}
  >
    <span className="align-self-center">Información del cliente</span>
    <TextField
      value={client.name}
      onChange={e => changeName(e.target.value)}
      className="my-2"
      label="Nombre*"
    />
    <TextField
      value={client.phone}
      onChange={e => changePhone(e.target.value)}
      className="my-2"
      label="Telefono*"
      type="number"
    />
    <TextField
      value={client.address}
      onChange={e => changeAddress(e.target.value)}
      className="my-2"
      label="Dirección*"
    />
  </div>
)

export default ClientBox
