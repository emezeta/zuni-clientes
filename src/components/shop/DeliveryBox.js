import React, { memo } from 'react'

import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateUtils from '@date-io/dayjs'

import Tooltip from 'components/common/Tooltip'

const DeliveryBox = ({
  className,
  delivery,
  changeDate,
  changeNotes,
  changeAccount,
  changePayment,
  errors,
}) => (
  <div className={className}>
    <Card className="px-4 pb-4 pt-3 d-flex flex-column w-100">
      <span className="align-self-center">Información de la entrega</span>
      <MuiPickersUtilsProvider utils={DateUtils}>
        <KeyboardDatePicker
          disablePast
          error={errors.deliveryDate}
          margin="normal"
          id="date-picker-dialog"
          label="Fecha*"
          format="DD/MM/YYYY"
          value={delivery.deliveryDate}
          onChange={changeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          minutesStep={5}
          disablePast
          error={errors.deliveryDate}
          margin="normal"
          id="time-picker"
          label={
            <Tooltip
              arrow
              title="Es una guía para organizar los trayectos de entregas. Es opcional, pero puede ser muy útil. No es un compromiso de entrega a una hora precisa, intentaremos acercarnos en lo posible."
            >
              Horario de entrega*
            </Tooltip>
          }
          className="my-2"
          value={delivery.deliveryDate}
          onChange={changeDate}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />

        <div className="">
          <FormControl
            className={delivery.payment === 'account' ? 'pr-2 w-50' : 'w-100'}
          >
            <InputLabel id="payment">Método de pago*</InputLabel>
            <Select
              error={errors.payment}
              labelId="payment"
              value={delivery.payment}
              onChange={(e) => changePayment(e.target.value)}
            >
              <MenuItem value="cash">Efectivo</MenuItem>
              <MenuItem value="pos">POS móvil (en la entrega)</MenuItem>
              <MenuItem value="account">Cuenta cliente</MenuItem>
              <MenuItem value="other">Otro (aclarar en notas)</MenuItem>
            </Select>
          </FormControl>

          {delivery.payment === 'account' && (
            <TextField
              error={errors.account}
              value={delivery.account}
              onChange={(e) => changeAccount(e.target.value)}
              className="w-50"
              label="Número de cuenta*"
            />
          )}
        </div>

        <TextField
          value={delivery.notes}
          onChange={(e) => changeNotes(e.target.value)}
          className="my-2"
          label="Notas"
        />
      </MuiPickersUtilsProvider>
    </Card>
  </div>
)

export default memo(DeliveryBox)
