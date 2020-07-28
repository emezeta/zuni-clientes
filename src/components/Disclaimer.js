import React, { memo } from 'react'

import Tooltip from './Tooltip'

const Disclaimer = () => (
  <div
    className="d-flex flex-column align-items-center justify-content-center py-2"
    style={{
      top: 0,
      backgroundColor: '#ff644e',
    }}
  >
    VERSIÓN DE PRUEBA
    <div className="d-flex justify-content-center px-4 text-center">
      <Tooltip
        arrow
        interactive
        title={
          <span className="text-justify">
            <span className="font-italic text-blue">Pedidos</span> está en pleno
            desarrollo. La mejor ayuda es la de quién lo usa. Nos gustaría que
            nos dejaras tus sugerencias o consultas
            <a href="http://zunimercado.com/sugerencias-ayuda"> aquí</a>.
            Gracias!
          </span>
        }
      >
        Tu opinión nos interesa, ayúdanos a mejorar.
      </Tooltip>
    </div>
  </div>
)

export default memo(Disclaimer)
