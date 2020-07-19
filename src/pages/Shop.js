import React, { useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Button from '@material-ui/core/Button'
import { useSnackbar } from 'notistack'

import useProducts from '../hooks/useProducts'
import useDelivery from '../hooks/useDelivery'
import useSubmit from '../hooks/useSubmit'
import useScrollToError from '../hooks/useScrollToError'

import ConfirmationAlert from '../components/ConfirmationAlert'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import DeliveryBox from '../components/DeliveryBox'
import ProductBox from '../components/ProductBox'
import OrderSummary from '../components/OrderSummary'
import Help from '../components/Help'

const App = () => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const {
    products,
    newProduct,
    removeProduct,
    changeProduct,
    resetProducts,
    validateProducts,
    repeatOrder,
    productErrors,
  } = useProducts()

  const {
    delivery,
    changeDate,
    changePayment,
    changeAccount,
    changeNotes,
    resetDelivery,
    validateDelivery,
    deliveryErrors,
  } = useDelivery()

  const handleNewProduct = async () => {
    await newProduct()
    scrollToBottom()
  }

  const lastProductRef = useRef()
  const containerRef = useRef()

  useScrollToError(containerRef, productErrors, productErrors)

  const scrollToBottom = () =>
    lastProductRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

  const makeOrder = useSubmit()

  const valid = () => {
    const deliveryErrors = validateDelivery()
    const productErrors = validateProducts()
    return deliveryErrors && productErrors
  }

  const handleSubmit = async () => {
    if (!products.length) {
      enqueueSnackbar('Agregue al menos un producto', { variant: 'warning' })
      setLoading(false)
      return
    }

    if (!valid()) {
      enqueueSnackbar('Hay campos requeridos sin completar', {
        variant: 'warning',
      })
      setLoading(false)
      return
    }

    confirmAlert({
      // eslint-disable-next-line react/display-name
      customUI: ({ onClose }) => (
        <OrderSummary
          onCancel={onClose}
          onConfirm={async () => {
            setLoading(true)
            if (await makeOrder({ products, ...delivery })) {
              enqueueSnackbar('La orden fue recibida correctamente!', {
                variant: 'success',
              })
              resetProducts()
              resetDelivery()
              setLoading(false)
              onClose()
            } else {
              enqueueSnackbar('Hubo un error, por favor intente nuevamente', {
                variant: 'error',
              })
              setLoading(false)
              onClose()
            }
          }}
          products={products}
          delivery={delivery}
        />
      ),
    })
  }

  const handleReset = () => {
    confirmAlert({
      // eslint-disable-next-line react/display-name
      customUI: ({ onClose }) => (
        <ConfirmationAlert
          title="Borrar todos los productos?"
          cancelText="Cancelar"
          confirmText="Borrar"
          onCancel={onClose}
          onConfirm={resetProducts}
          description="Esta acción eliminará todos los productos de tu órden."
        />
      ),
    })
  }

  if (loading) return <Loader />

  return (
    <div
      ref={containerRef}
      className="container d-flex flex-grow-1 flex-column"
    >
      <Help className="mt-2" />
      <div className="row mt-2 align-items-stretch">
        <div className="col-12 col-md-6 offset-md-3 py-2">
          <DeliveryBox
            errors={deliveryErrors}
            delivery={delivery}
            changePayment={changePayment}
            changeAccount={changeAccount}
            changeDate={changeDate}
            changeNotes={changeNotes}
          />
        </div>
      </div>
      <div className="row mb-4 align-items-stretch">
        {!!products.length && (
          <Button
            color="secondary"
            variant="outlined"
            className="mx-auto mt-md-4 my-4"
            onClick={handleReset}
          >
            Borrar productos
          </Button>
        )}
        {window.localStorage.getItem('lastOrder') && !products.length && (
          <Button
            variant="outlined"
            className="mx-auto mt-md-4 my-4"
            color="primary"
            onClick={repeatOrder}
          >
            Repetir ultimo pedido
          </Button>
        )}
        {products.map((product, index) => (
          <div key={index} className="col-12 col-md-4">
            <ProductBox
              errors={productErrors[index]}
              product={product}
              onChange={(newProduct) => changeProduct(index, newProduct)}
              onDelete={() => removeProduct(index)}
              ref={index === products.length - 1 ? lastProductRef : null}
              className="my-2"
              index={index}
            />
          </div>
        ))}
      </div>

      <Footer
        disabled={loading}
        newProduct={handleNewProduct}
        submit={handleSubmit}
      />
    </div>
  )
}

export default App
