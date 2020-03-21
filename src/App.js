import React, { useRef } from 'react'

import useProducts from './hooks/useProducts'
import useClient from './hooks/useClient'
import useDelivery from './hooks/useDelivery'

import ClientBox from './components/ClientBox'
import DeliveryBox from './components/DeliveryBox'
import ProductBox from './components/ProductBox'
import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const { products, newProduct, removeProduct, changeProduct } = useProducts()
  const { client, changeName, changePhone, changeAddress } = useClient()
  const { delivery, changeDate, changePayment, changeNotes } = useDelivery()

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

  return (
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
      <Footer
        newProduct={handleNewProduct}
        submit={() => console.log({ delivery, products, client })}
      />
    </div>
  )
}

export default App
