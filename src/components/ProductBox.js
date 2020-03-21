import React, { forwardRef } from 'react'

import Delete from '@material-ui/icons/Delete'
import cn from 'classnames'

import TextField from '@material-ui/core/TextField'

function ProductBox({ className, index, onDelete, product, onChange }, ref) {
  const handleDelete = () =>
    window.confirm(`Quiere borrar el producto ${index + 1}?`) && onDelete()

  const changeName = ({ target: { value: name } }) =>
    onChange({ ...product, name })

  const changeAmount = ({ target: { value: amount } }) =>
    onChange({ ...product, amount })

  const changeDescription = ({ target: { value: description } }) =>
    onChange({ ...product, description })

  return (
    <div
      className={cn(
        'bg-white rounded px-4 pb-4 pt-3 d-flex flex-column',
        className
      )}
      ref={ref}
    >
      <div className="d-flex justify-content-center position-relative">
        <span className="align-self-center">Producto {index + 1}</span>
        <Delete
          style={{ position: 'absolute', right: 0 }}
          onClick={handleDelete}
        />
      </div>
      <TextField
        value={product.name}
        onChange={changeName}
        className="my-2"
        label="Nombre de producto*"
      />
      <TextField
        value={product.amount}
        onChange={changeAmount}
        className="my-2"
        label="Cantidad*"
        type="number"
      />
      <TextField
        value={product.description}
        multiline
        onChange={changeDescription}
        className="my-2"
        label="Descripción"
      />
    </div>
  )
}

export default forwardRef(ProductBox)
