import React, { memo } from 'react'

import Tooltip from './Tooltip'

const Disclaimer = () => (
  <div
    className="d-flex flex-column align-items-center justify-content-center py-2"
    style={{
      position: 'sticky',
      top: 0,
      backgroundColor: '#FF9494',
      zIndex: 2000,
    }}
  >
    VERSIÓN DE PRUEBA
    <div className="d-flex justify-content-center">
      <Tooltip
        bottom
        className="text-small text-darkblue"
        tooltip={
          <span>
            <span className="font-italic text-blue">Pedidos</span> está en pleno
            desarrollo. La mejor ayuda es la de quién lo usa. Nos gustaría que
            nos dejaras tus sugerencias o consultas{' '}
            <a href="http://zunimercado.com/sugerencias-ayuda">aquí</a>.
            Gracias!
          </span>
        }
      >
        Tus opiniones son lo que cuenta, ayúdanos a mejorar.
      </Tooltip>
    </div>
  </div>
)

export default memo(Disclaimer)
