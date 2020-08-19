import React, { memo } from 'react'

import ProductBox from 'components/ProductBox'

const ProductList = ({
  changeProduct,
  removeProduct,
  products,
  errors,
  lastProductRef,
  selectedProduct,
  selectProduct,
}) => {
  return products.map((product, index) => (
    <div
      key={index}
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="col-12 col-md-6 col-lg-4"
    >
      <ProductBox
        select={(select) => selectProduct(select ? index : undefined)}
        selected={selectedProduct === index}
        errors={errors[index]}
        product={product}
        onChange={(newProduct) => changeProduct(index, newProduct)}
        onDelete={() => removeProduct(index)}
        ref={index === products.length - 1 ? lastProductRef : null}
        className="mb-2"
        index={index}
      />
    </div>
  ))
}

export default memo(ProductList)
