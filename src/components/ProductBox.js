import React, { forwardRef, memo } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import Delete from '@material-ui/icons/Delete'
import cn from 'classnames'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import ConfirmationAlert from './ConfirmationAlert'

const ProductBox = (
  { className, index, onDelete, product, onChange, errors },
  ref
) => {
  const changeName = ({ target: { value: name } }) =>
    onChange({ ...product, name })

  const changeAmount = ({ target: { value: amount } }) =>
    onChange({ ...product, amount })

  const changeDescription = ({ target: { value: description } }) =>
    onChange({ ...product, description })

  const handleDelete = () =>
    confirmAlert({
      // eslint-disable-next-line react/display-name
      customUI: ({ onClose }) => (
        <ConfirmationAlert
          title={`Borrar ${product.name} ${product.amount}?`}
          description="Se eliminará el producto de la órden."
          onCancel={onClose}
          onConfirm={onDelete}
          confirmText="Borrar"
          cancelText="Cancelar"
        />
      ),
    })
  // window.confirm(`Quiere borrar el producto ${index + 1}?`) && onDelete()

  return (
    <div
      className={cn(
        'bg-white rounded px-4 pb-4 pt-3 d-flex flex-column shadow',
        className
      )}
      ref={ref}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span>Producto {index + 1}</span>
        <Button onClick={handleDelete} color="secondary">
          <Delete className="mr-2" />
          Borrar
        </Button>
      </div>
      <TextField
        error={errors?.name}
        value={product.name}
        onChange={changeName}
        className="my-2"
        label="Nombre de producto*"
      />
      <TextField
        error={errors?.amount}
        value={product.amount}
        onChange={changeAmount}
        className="my-2"
        label="Cantidad*"
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

export default memo(forwardRef(ProductBox))
