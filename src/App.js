import React, { useRef, useState } from 'react'

import useProducts from './hooks/useProducts'
import useClient from './hooks/useClient'
import useDelivery from './hooks/useDelivery'
import useSubmit from './hooks/useSubmit'
import useScrollToError from './hooks/useScrollToError'

import Disclaimer from './components/Disclaimer'
import Header from './components/Header'
import Footer from './components/Footer'
import ClientBox from './components/ClientBox'
import DeliveryBox from './components/DeliveryBox'
import ProductBox from './components/ProductBox'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState()

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
    productErrors,
  } = useProducts()

  const {
    delivery,
    changeDate,
    changePayment,
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

  const valid = () => {
    const clientErrors = validateClient()
    const deliveryErrors = validateDelivery()
    const productErrors = validateProducts()
    return clientErrors && deliveryErrors && productErrors
  }

  const handleSubmit = async () => {
    setButtonsDisabled(true)
    if (!products.length) {
      window.alert('Agregue al menos un producto')
      setButtonsDisabled(false)
      return
    }

    if (!valid()) {
      window.alert('Hay campos requeridos sin completar')
      setButtonsDisabled(false)
      return
    }

    if (!window.confirm('Desea finalizar la compra?')) {
      setButtonsDisabled(false)
      return
    }

    if (await makeOrder({ products, client, delivery })) {
      window.alert('La orden fue recibida correctamente!')
      resetProducts()
      resetDelivery()
    } else {
      window.alert('Hubo un error, por favor intente nuevamente')
    }
    setButtonsDisabled(false)
  }

  return (
    <>
      <Disclaimer />
      <div
        className="pt-4 d-flex flex-grow-1 flex-column"
        style={{ background: 'lightgray', minHeight: '100%' }}
      >
        <Header />
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
                changeDate={changeDate}
                changeNotes={changeNotes}
              />
            </div>
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
            disabled={buttonsDisabled}
            newProduct={handleNewProduct}
            submit={handleSubmit}
          />
        </div>
      </div>
    </>
  )
}

export default App
