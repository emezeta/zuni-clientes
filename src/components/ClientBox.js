import React from 'react'

import cn from 'classnames'

import Input from '@material-ui/core/Input'

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
      <Input
        onChange={e => changeName(e.target.value)}
        className="my-2"
        placeholder="Nombre*"
        d="my-input"
      />
      <Input
        onChange={e => changePhone(e.target.value)}
        className="my-2"
        placeholder="Telefono*"
        d="my-input"
      />
      <Input
        onChange={e => changeAddress(e.target.value)}
        className="my-2"
        placeholder="Dirección*"
        d="my-input"
      />
    </div>
  )
}

export default ClientBox
