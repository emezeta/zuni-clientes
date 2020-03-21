import React from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'

function ClientBox({
  className,
  client,
  changeName,
  changePhone,
  changeAddress,
}) {
  return (
    <div
      className={cn(
        'bg-white rounded px-4 pb-4 pt-3 d-flex flex-column',
        className
      )}
    >
      <span className="align-self-center">Información del cliente</span>
      <TextField
        onChange={e => changeName(e.target.value)}
        className="my-2"
        label="Nombre*"
      />
      <TextField
        onChange={e => changePhone(e.target.value)}
        className="my-2"
        label="Telefono*"
        type="number"
      />
      <TextField
        onChange={e => changeAddress(e.target.value)}
        className="my-2"
        label="Dirección*"
      />
    </div>
  )
}

export default ClientBox
