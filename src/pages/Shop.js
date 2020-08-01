import React, { useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { useSnackbar } from 'notistack'

import useProducts from '../hooks/useProducts'
import useDelivery from '../hooks/useDelivery'
import useSubmit from '../hooks/useSubmit'
import useScrollToError from '../hooks/useScrollToError'
import useModal from '../hooks/useModal'

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
  const { showModal, closeModal, modalVisible } = useModal()

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

    showModal()
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
    <>
      <Modal open={modalVisible} onClose={closeModal}>
        <OrderSummary
          className="container vh-100"
          onCancel={closeModal}
          onConfirm={async () => {
            setLoading(true)
            if (await makeOrder({ products, ...delivery })) {
              enqueueSnackbar('La orden fue recibida correctamente!', {
                variant: 'success',
              })
              resetProducts()
              resetDelivery()
              setLoading(false)
              closeModal()
            } else {
              enqueueSnackbar('Hubo un error, por favor intente nuevamente', {
                variant: 'error',
              })
              setLoading(false)
              closeModal()
            }
          }}
          products={products}
          delivery={delivery}
        />
      </Modal>
      <div className="row mb-2 justify-content-center">
        <Help className="col-12 col-md-8 col-lg-6" />
      </div>
      <div className="mb-4 row justify-content-center">
        <DeliveryBox
          className="col-12 col-md-8 col-lg-6"
          errors={deliveryErrors}
          delivery={delivery}
          changePayment={changePayment}
          changeAccount={changeAccount}
          changeDate={changeDate}
          changeNotes={changeNotes}
        />
      </div>
      <div className="row mb-2 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {!!products.length && (
            <Button
              className="w-100"
              color="secondary"
              variant="outlined"
              onClick={handleReset}
            >
              Borrar productos
            </Button>
          )}
          {window.localStorage.getItem('lastOrder') && !products.length && (
            <Button
              className="w-100"
              variant="outlined"
              color="secondary"
              onClick={repeatOrder}
            >
              Repetir pedido
            </Button>
          )}
        </div>
      </div>
      {!!products.length && (
        <div className="row mt-4 mb-4">
          {products.map((product, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <ProductBox
                errors={productErrors[index]}
                product={product}
                onChange={(newProduct) => changeProduct(index, newProduct)}
                onDelete={() => removeProduct(index)}
                ref={index === products.length - 1 ? lastProductRef : null}
                className="mb-2"
                index={index}
              />
            </div>
          ))}
        </div>
      )}
      <div className="row justify-content-center">
        <Footer
          showSubmit={products.length}
          disabled={loading}
          newProduct={handleNewProduct}
          submit={handleSubmit}
        />
      </div>
    </>
  )
}

export default App
