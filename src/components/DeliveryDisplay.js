import React, { memo } from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateUtils from '@date-io/dayjs'

import Tooltip from './Tooltip'

const payment = {
  cash: 'Efectivo',
  pos: 'POS móvil (en la entrega)',
  account: 'Cuenta cliente',
  other: 'Otro (aclarar en notas)',
}

const DeliveryDisplay = ({ className, delivery }) => (
  <div
    className={cn('px-4 pb-4 pt-3 d-flex flex-column flex-grow-1', className)}
  >
    <span className="align-self-center">Información de la entrega</span>
    <MuiPickersUtilsProvider utils={DateUtils}>
      <KeyboardDatePicker
        InputProps={{
          readOnly: true,
        }}
        disablePast
        margin="normal"
        id="date-picker-dialog"
        label="Fecha*"
        format="DD/MM/YYYY"
        value={delivery.deliveryDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />

      <KeyboardTimePicker
        minutesStep={5}
        disablePast
        InputProps={{
          readOnly: true,
        }}
        margin="normal"
        id="time-picker"
        label={
          <Tooltip title="Es una guía para organizar los trayectos de entregas. Es opcional, pero puede ser muy útil. No es un compromiso de entrega a una hora precisa, intentaremos acercarnos en lo posible.">
            Horario de entrega*
          </Tooltip>
        }
        className="my-2"
        value={delivery.deliveryDate}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
    <div>
      <TextField
        label="Método de pago"
        className={delivery.payment === 'account' ? 'pr-2 w-50' : 'w-100'}
        value={payment[delivery.payment]}
        InputProps={{
          readOnly: true,
        }}
      />
      {delivery.payment === 'account' && (
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={delivery.account}
          className="w-50"
          label="Número de cuenta*"
        />
      )}
    </div>

    {delivery.notes && (
      <TextField value={delivery.notes} className="my-2" label="Notas" />
    )}
  </div>
)

export default memo(DeliveryDisplay)
