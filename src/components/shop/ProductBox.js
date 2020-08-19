import React, { forwardRef, memo } from 'react'
import cn from 'classnames'

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Delete from '@material-ui/icons/Delete'

import useModal from 'hooks/useModal'
import ConfirmationAlert from 'components/common/ConfirmationAlert'

const ProductBox = (
  { className, index, onDelete, product, onChange, errors },
  ref
) => {
  const [showConfirmation, hideConfirmation, confirmationVisible] = useModal()

  const changeName = ({ target: { value: name } }) =>
    onChange({ ...product, name })

  const changeAmount = ({ target: { value: amount } }) =>
    onChange({ ...product, amount })

  const changeDescription = ({ target: { value: description } }) =>
    onChange({ ...product, description })

  return (
    <>
      <Modal open={confirmationVisible}>
        <ConfirmationAlert
          title={`Borrar ${product.name} ${product.amount}?`}
          description="Se eliminará el producto de la órden."
          onCancel={hideConfirmation}
          onConfirm={onDelete}
          confirmText="Borrar"
          cancelText="Cancelar"
        />
      </Modal>
      <Card
        raised
        className={cn('px-4 pb-4 pt-3 d-flex flex-column', className)}
        ref={ref}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span>Producto {index + 1}</span>
          <Button onClick={showConfirmation} color="secondary">
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
      </Card>
    </>
  )
}

export default memo(forwardRef(ProductBox))
