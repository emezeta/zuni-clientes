import React from 'react'

import Button from '@material-ui/core/Button'
import { Modal } from '@material-ui/core'

import useModal from 'hooks/useModal'

import ConfirmationAlert from 'components/common/ConfirmationAlert'

const TestingGuide = ({ className }) => {
  const [showHelp, hideHelp, helpVisible] = useModal()

  return (
    <>
      <Modal onClose={hideHelp} open={helpVisible}>
        <ConfirmationAlert
          onConfirm={hideHelp}
          confirmText="Entendido"
          title="Ayuda"
          description={
            <div>
              Tendrás que completar todos los datos que la aplicación pide.
              Verás que algunos ya están cargados, podés dejarlos así o
              modificarlos. A medida que lo uses, notarás que hay datos que
              permanecen y ya no tendrás que volver a ingresarlos. 
              No dudes en preguntar todo lo que quieras saber, estamos para
              ayudarte.
              <a href="https://zunimercado.com.uy/sugerencias-ayuda">
                {' '}
                aquí
              </a> WhatsApp <a href="https://wa.me/59892235005">092 235 005</a>. 
              Te responderemos por whastapp, mail o un mensaje de
              texto, dejanos tu información de contacto para que podamos hacerlo!
            </div>
          }
        />
      </Modal>
      <div className={className}>
        <Button
          className="w-100"
          variant="contained"
          color="primary"
          onClick={showHelp}
        >
          Ayuda para pruebas
        </Button>
      </div>
    </>
  )
}

export default TestingGuide
