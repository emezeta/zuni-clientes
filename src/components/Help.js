import React from 'react'
import { confirmAlert } from 'react-confirm-alert'

import Button from '@material-ui/core/Button'
import ConfirmationAlert from '../components/ConfirmationAlert'

const TestingGuide = ({ className }) => (
  <Button
    className={className}
    variant="outlined"
    color="primary"
    onClick={() =>
      confirmAlert({
        // eslint-disable-next-line react/display-name
        customUI: ({ onClose }) => (
          <ConfirmationAlert
            onConfirm={onClose}
            confirmText="Entendido"
            title="Ayuda"
            description={
              <div>
                Tendrás que completar todos los datos que la aplicación pide.
                Verás que algunos ya están cargados, podés dejarlos así o
                modificarlos. A medida que lo uses, notarás que hay datos que
                permanecen y ya no tendrás que volver a ingresarlos. Por ahora
                todos los datos pueden ser falsos, no dudes en hacer o repetir
                muchos pedidos ¡estamos en pruebas! Preguntá todo lo que quieras
                <a href="https://zunimercado.com/sugerencias-ayuda"> aquí</a> o
                al <a href="sms://+598 92 235 005">092 235 005</a> por whatsapp.
                Te responderemos por whastapp, mail o un mensaje de texto,
                dejanos información de contacto para que podamos hacerlo!
              </div>
            }
          />
        ),
      })
    }
  >
    Ayuda
  </Button>
)

export default TestingGuide
