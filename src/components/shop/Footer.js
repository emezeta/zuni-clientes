import React, { memo } from 'react'
import cn from 'classnames'

import Button from '@material-ui/core/Button'

const Footer = ({ newProduct, submit, disabled, showSubmit }) => (
  <>
    <div
      className={cn('col-12 order-1 order-md-2', {
        'col-md-8 col-lg-6': !showSubmit,
        'col-md-4 col-lg-3 mb-2': showSubmit,
      })}
    >
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
      <div className="col-12 col-md-4 col-lg-3 order-2 order-md-1">
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
  </>
)

export default memo(Footer)
