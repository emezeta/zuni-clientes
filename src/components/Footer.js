import React from 'react'

import Button from '@material-ui/core/Button'

function Footer({ newProduct, submit, className }) {
  return (
    <div className="d-flex align-items-center flex-column">
      <Button
        onClick={newProduct}
        className="col-9 my-1"
        variant="contained"
        color="primary"
      >
        AGREGAR UN PRODUCTO
      </Button>
      <Button
        onClick={submit}
        className="col-9 my-1"
        variant="contained"
        color="secondary"
      >
        REALIZAR LA COMPRA
      </Button>
    </div>
  )
}

export default Footer
