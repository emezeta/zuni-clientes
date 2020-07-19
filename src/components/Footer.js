import React, { memo } from 'react'

import Button from '@material-ui/core/Button'

const Footer = ({ newProduct, submit, disabled }) => (
  <div className="row">
    <div className="col col-md-6 offset-md-3 mb-4">
      <Button
        disabled={disabled}
        onClick={submit}
        className="col-6 py-3"
        color="secondary"
      >
        REALIZAR LA COMPRA
      </Button>
      <Button
        disabled={disabled}
        onClick={newProduct}
        className="col-6 py-3"
        color="primary"
      >
        AGREGAR PRODUCTO
      </Button>
    </div>
  </div>
)

export default memo(Footer)
