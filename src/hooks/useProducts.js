import { useState, useCallback } from 'react'
import produce from 'immer'

const emptyProduct = {
  name: '',
  amount: 1,
  description: '',
}

export default () => {
  const [products, setProducts] = useState([])

  const mutateProducts = (fn) => setProducts(produce(products, fn))

  const newProduct = useCallback(
    () => mutateProducts((draft) => void draft.push(emptyProduct)),
    []
  )

  const removeProduct = useCallback(
    (index) => mutateProducts((draft) => void draft.splice(index, 1)),
    []
  )

  const changeProduct = useCallback(
    (index, product) =>
      mutateProducts((draft) => void (draft[index] = product)),
    []
  )

  const resetProducts = useCallback(() => setProducts([]), [])

  const validateProducts = () => {
    const newErrors = products.map(({ name, amount }) => {
      const error = {}
      if (!!name && !!error) return true
      else {
        !name && (error.name = true)
        !amount && (error.amount = true)
        return error
      }
    })

    return newErrors
  }

  return {
    products,
    newProduct,
    removeProduct,
    changeProduct,
    resetProducts,
    validateProducts,
  }
}
