import React, { memo } from 'react'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const OrderSummary = ({
  onCancel,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => (
  <Dialog
    open
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {onCancel && (
        <Button onClick={onCancel} color="primary">
          {cancelText}
        </Button>
      )}
      {onConfirm && (
        <Button
          onClick={() => {
            onConfirm()
            onCancel()
          }}
          color="primary"
        >
          {confirmText}
        </Button>
      )}
    </DialogActions>
  </Dialog>
)

export default memo(OrderSummary)
