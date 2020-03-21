import React from 'react'

import cn from 'classnames'

import TextField from '@material-ui/core/TextField'
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

function DeliveryBox({
  className,
  delivery,
  changeDate,
  changeNotes,
  changePayment,
}) {
  return (
    <div
      className={cn(
        'bg-white rounded px-4 pb-4 pt-3 d-flex flex-column',
        className
      )}
    >
      <span className="align-self-center">Información de la entrega</span>
      <MuiPickersUtilsProvider utils={DateUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Fecha"
          format="DD/MM/YYYY"
          value={delivery.date}
          onChange={changeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Horario preferido*"
          className="my-2"
          value={delivery.time}
          onChange={changeDate}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />

        <FormControl>
          <InputLabel id="payment">Método de pago*</InputLabel>
          <Select
            labelId="payment"
            value={delivery.payment}
            onChange={e => changePayment(e.target.value)}
            className="my-2"
          >
            <MenuItem value="cash">Efectivo</MenuItem>
            <MenuItem value="pos">POS móvil (en la entrega)</MenuItem>
            <MenuItem value="other">Otro (aclarar en notas)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={delivery.notes}
          onChange={e => changeNotes(e.target.value)}
          className="my-2"
          label="Notas*"
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default DeliveryBox
