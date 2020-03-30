import React, { useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useAlert } from 'react-alert'
import Button from '@material-ui/core/Button'

import useProducts from './hooks/useProducts'
import useClient from './hooks/useClient'
import useDelivery from './hooks/useDelivery'
import useSubmit from './hooks/useSubmit'
import useScrollToError from './hooks/useScrollToError'

import Disclaimer from './components/Disclaimer'
import Loader from './components/Loader'
import Header from './components/Header'
import Footer from './components/Footer'
import ClientBox from './components/ClientBox'
import DeliveryBox from './components/DeliveryBox'
import ProductBox from './components/ProductBox'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  const [loading, setLoading] = useState(false)

  const {
    client,
    changeName,
    changePhone,
    changeAddress,
    validateClient,
    clientErrors,
  } = useClient()

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

  useScrollToError(containerRef, clientErrors, productErrors, productErrors)

  const scrollToBottom = () =>
    lastProductRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

  const makeOrder = useSubmit()

  const alert = useAlert()

  const valid = () => {
    const clientErrors = validateClient()
    const deliveryErrors = validateDelivery()
    const productErrors = validateProducts()
    return clientErrors && deliveryErrors && productErrors
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
            if (await makeOrder({ products, client, delivery })) {
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

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Disclaimer />
      <div className="d-flex flex-grow-1 flex-column bg-gray">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <div
            ref={containerRef}
            className="container d-flex flex-grow-1 flex-column"
          >
            <div className="row my-4 align-items-stretch">
              <div className="col-12 col-md-6 d-flex py-2">
                <ClientBox
                  errors={clientErrors}
                  client={client}
                  changeName={changeName}
                  changePhone={changePhone}
                  changeAddress={changeAddress}
                />
              </div>
              <div className="col-12 col-md-6 py-2">
                <DeliveryBox
                  errors={deliveryErrors}
                  delivery={delivery}
                  changePayment={changePayment}
                  changeAccount={changeAccount}
                  changeDate={changeDate}
                  changeNotes={changeNotes}
                />
              </div>
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
        )}
      </div>
    </div>
  )
}

export default App
