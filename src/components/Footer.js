import React, { memo } from 'react'

import Button from '@material-ui/core/Button'

const Footer = ({ newProduct, submit, disabled, showSubmit }) => (
  <div className="row mb-4">
    <div className="col-12 col-md-6 offset-md-3">
      <Button
        variant="contained"
        disabled={disabled}
        onClick={newProduct}
        className="w-100"
        color="secondary"
      >
        AGREGAR PRODUCTO
      </Button>
    </div>
    {!!showSubmit && (
      <div className="col-12 mt-2 col-md-6 offset-md-3">
        <Button
          variant="contained"
          disabled={disabled}
          onClick={submit}
          className="w-100"
          color="primary"
        >
          REALIZAR ORDEN
        </Button>
      </div>
    )}
  </div>
)

export default memo(Footer)
