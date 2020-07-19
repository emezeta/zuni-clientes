import React, { memo } from 'react'

import Button from '@material-ui/core/Button'

const Footer = ({ newProduct, submit, disabled }) => (
  <div className="mt-auto mb-4 d-flex align-items-center rounded">
    <Button
      disabled={disabled}
      onClick={submit}
      className="col mr-1 mr-md-3 py-md-4"
      color="secondary"
    >
      REALIZAR LA COMPRA
    </Button>
    <Button
      disabled={disabled}
      onClick={newProduct}
      className="col ml-1 ml-md-3 py-md-4"
      color="primary"
    >
      AGREGAR PRODUCTO
    </Button>
  </div>
)

export default memo(Footer)
