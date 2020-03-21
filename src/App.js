import React, { useRef } from 'react'

import { isEmpty } from './helpers'

import useProducts from './hooks/useProducts'
import useClient from './hooks/useClient'
import useDelivery from './hooks/useDelivery'
import useSubmit from './hooks/useSubmit'

import Disclaimer from './components/Disclaimer'
import Header from './components/Header'
import Footer from './components/Footer'
import ClientBox from './components/ClientBox'
import DeliveryBox from './components/DeliveryBox'
import ProductBox from './components/ProductBox'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
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

  const scrollToBottom = () =>
    lastProductRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

  const makeOrder = useSubmit()

  const validate = () => {
    const clientErrors = isEmpty(validateClient())
    const deliveryErrors = isEmpty(validateDelivery())
    return clientErrors && deliveryErrors
  }

  const handleSubmit = async () => {
    if (!validate()) {
      window.alert('Hay campos requeridos sin completar')
      return
    }

    if (!products.length) {
      window.alert('Agregue al menos un producto')
      return
    }

    if (await makeOrder({ products, client, delivery })) {
      window.alert('La orden fue recibida correctamente!')
      resetProducts()
      resetDelivery()
    } else {
      window.alert('Hubo un error, por favor intente nuevamente')
    }
  }

  return (
    <>
      <Disclaimer />
      <div
        className="pt-4 d-flex flex-grow-1 flex-column"
        style={{ background: 'lightgray', minHeight: '100%' }}
      >
        <Header />
        <div className="container d-flex flex-grow-1 flex-column">
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
                  product={product}
                  onChange={newProduct => changeProduct(index, newProduct)}
                  onDelete={() => removeProduct(index)}
                  ref={index === products.length - 1 ? lastProductRef : null}
                  className="my-2"
                  index={index}
                />
              </div>
            ))}
          </div>
          <Footer newProduct={handleNewProduct} submit={handleSubmit} />
        </div>
      </div>
    </>
  )
}

export default App
