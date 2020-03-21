import React from 'react'

import useProducts from './hooks/useProducts'
import useClient from './hooks/useClient'

import ClientBox from './components/ClientBox'
import ProductBox from './components/ProductBox'
import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const { products, newProduct, removeProduct, changeProduct } = useProducts()
  const { client, changeName, changePhone, changeAddress } = useClient()

  return (
    <div
      className="py-4"
      style={{ background: 'lightgray', minHeight: '100%' }}
    >
      <div className="d-flex justify-content-center">
        Zunimercado compras web
      </div>
      <div className="container">
        <ClientBox
          className="my-4"
          client={client}
          changeName={changeName}
          changePhone={changePhone}
          changeAddress={changeAddress}
        />
        {products.map((product, index) => (
          <ProductBox
            product={product}
            onChange={newProduct => changeProduct(index, newProduct)}
            onDelete={() => removeProduct(index)}
            key={index}
            className="my-4"
            index={index}
          />
        ))}
        <Footer
          newProduct={newProduct}
          submit={() => console.log({ products, client })}
        />
      </div>
    </div>
  )
}

export default App
