import React, { useRef } from 'react'

import useProducts from './hooks/useProducts'
import useClient from './hooks/useClient'
import useDelivery from './hooks/useDelivery'
import useSubmit from './hooks/useSubmit'

import ClientBox from './components/ClientBox'
import DeliveryBox from './components/DeliveryBox'
import ProductBox from './components/ProductBox'
import Footer from './components/Footer'
import Disclaimer from './components/Disclaimer'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const { client, changeName, changePhone, changeAddress } = useClient()

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

  const handleSubmit = async () => {
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
        className="pt-4"
        style={{ background: 'lightgray', minHeight: '100%' }}
      >
        <div className="d-flex justify-content-center">
          Zunimercado compras web
        </div>
        <div id="container" className="container">
          <ClientBox
            className="my-4"
            client={client}
            changeName={changeName}
            changePhone={changePhone}
            changeAddress={changeAddress}
          />
          <DeliveryBox
            className="my-4"
            delivery={delivery}
            changePayment={changePayment}
            changeDate={changeDate}
            changeNotes={changeNotes}
          />
          {products.map((product, index) => (
            <ProductBox
              product={product}
              onChange={newProduct => changeProduct(index, newProduct)}
              onDelete={() => removeProduct(index)}
              key={index}
              ref={index === products.length - 1 ? lastProductRef : null}
              className="my-4"
              index={index}
            />
          ))}
        </div>
        <Footer newProduct={handleNewProduct} submit={handleSubmit} />
      </div>
    </>
  )
}

export default App
