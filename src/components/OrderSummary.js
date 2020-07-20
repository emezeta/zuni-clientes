import React, { memo } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import DeliveryDisplay from './DeliveryDisplay'
import ProductsTable from './ProductsTable'

const OrderSummary = ({ delivery, products, onCancel, onConfirm }) => (
  <Card className="p-4">
    <DeliveryDisplay delivery={delivery} />
    <ProductsTable products={products} />
    <Button
      onClick={onConfirm}
      className="col mb-2"
      variant="contained"
      color="secondary"
    >
      REALIZAR LA COMPRA
    </Button>
    <Button
      onClick={onCancel}
      className="col"
      variant="contained"
      color="primary"
    >
      CANCELAR
    </Button>
  </Card>
)

export default memo(OrderSummary)
