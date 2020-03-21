import React from 'react'

import Delete from '@material-ui/icons/Delete'
import cn from 'classnames'

import Input from '@material-ui/core/Input'

function ProductBox({ className, index, onDelete, product, onChange }) {
  const handleDelete = () =>
    window.confirm(`Quiere borrar el producto ${index + 1}?`) && onDelete()

  return (
    <div
      className={cn(
        'bg-white rounded px-4 pb-4 pt-3 d-flex flex-column',
        className
      )}
    >
      <div className="d-flex justify-content-center position-relative">
        <span className="align-self-center">Producto {index + 1}</span>
        <Delete
          style={{ position: 'absolute', right: 0 }}
          onClick={handleDelete}
        />
      </div>
      <Input className="my-2" placeholder="Nombre de producto*" d="my-input" />
      <Input className="my-2" placeholder="Cantidad*" d="my-input" />
      <Input className="my-2" placeholder="Descripción" d="my-input" />
    </div>
  )
}

export default ProductBox
