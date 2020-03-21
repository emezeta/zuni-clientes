import React from 'react'

import Button from '@material-ui/core/Button'

function Footer({ newProduct, submit, className }) {
  return (
    <div
      className="d-flex align-items-center flex-column bg-white py-4"
      style={{ position: 'sticky', bottom: 0, borderTop: '1px solid gray' }}
    >
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
