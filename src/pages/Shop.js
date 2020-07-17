import React, { useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useAlert } from 'react-alert'
import Button from '@material-ui/core/Button'

import useProducts from '../hooks/useProducts'
import useDelivery from '../hooks/useDelivery'
import useSubmit from '../hooks/useSubmit'
import useScrollToError from '../hooks/useScrollToError'

import Loader from '../components/Loader'
import Footer from '../components/Footer'
import DeliveryBox from '../components/DeliveryBox'
import ProductBox from '../components/ProductBox'

const App = () => {
  const [loading, setLoading] = useState(false)

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

  const alert = useAlert()

  const valid = () => {
    const deliveryErrors = validateDelivery()
    const productErrors = validateProducts()
    return deliveryErrors && productErrors
  }

  const handleSubmit = async () => {
    if (!products.length) {
      alert.error('Agregue al menos un producto')
      setLoading(false)
      return
    }

    if (!valid()) {
      alert.error('Hay campos requeridos sin completar')
      setLoading(false)
      return
    }

    confirmAlert({
      message: 'Desea finalizar al compra?',
      buttons: [
        {
          label: 'Si',
          onClick: async () => {
            setLoading(true)
            if (await makeOrder({ products, ...delivery })) {
              alert.success('La orden fue recibida correctamente!')
              resetProducts()
              resetDelivery()
              setLoading(false)
            } else {
              alert.error('Hubo un error, por favor intente nuevamente')
              setLoading(false)
            }
          },
        },
        {
          label: 'No',
        },
      ],
    })
  }

  return loading ? (
    <Loader />
  ) : (
    <div
      ref={containerRef}
      className="container d-flex flex-grow-1 flex-column"
    >
      <div className="row mt-4 align-items-stretch">
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
        {window.localStorage.getItem('lastOrder') && !products.length && (
          <Button
            variant="outlined"
            className="mx-auto mt-md-4 mt-4"
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
