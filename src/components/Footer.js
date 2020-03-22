import React, { memo } from 'react'

import Button from '@material-ui/core/Button'

const Footer = ({ newProduct, submit, disabled }) => (
  <div
    className="mt-auto mb-4 d-flex align-items-center py-2 rounded"
    style={{
      position: 'sticky',
      bottom: 0,
    }}
  >
    <Button
      disabled={disabled}
      onClick={newProduct}
      className="col mr-1 mr-md-3 py-md-4"
      variant="contained"
      color="primary"
    >
      AGREGAR PRODUCTO
    </Button>
    <Button
      disabled={disabled}
      onClick={submit}
      className="col ml-1 ml-md-3 py-md-4"
      variant="contained"
      color="secondary"
    >
      REALIZAR LA COMPRA
    </Button>
  </div>
)

export default memo(Footer)
