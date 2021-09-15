import React, { memo } from 'react'
import cn from 'classnames'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import DeliveryDisplay from 'components/shop/DeliveryDisplay'
import ProductsTable from 'components/shop/ProductsTable'

const OrderSummary = ({
  delivery,
  products,
  onCancel,
  onConfirm,
  className,
}) => (
  <div
    className={cn(
      className,
      'col col-md-8 offset-md-2 col-lg-6 offset-lg-3 d-flex flex-column'
    )}
  >
    <Card className="p-5 mt-auto mb-auto container">
      <DeliveryDisplay delivery={delivery} />
      <ProductsTable products={products} />
      <div className="row">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <Button
            onClick={onCancel}
            className="col"
            variant="contained"
            color="primary"
          >
            CANCELAR
          </Button>
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <Button
            onClick={onConfirm}
            className="col"
            variant="contained"
            color="secondary"
          >
            REALIZAR ORDEN
          </Button>
        </div>
      </div>
    </Card>
  </div>
)

export default memo(OrderSummary)
