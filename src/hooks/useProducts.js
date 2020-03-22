import { useState, useCallback } from 'react'
import produce from 'immer'

const emptyProduct = {
  name: '',
  amount: 1,
  description: '',
}

export default () => {
  const [products, setProducts] = useState([])
  const [productErrors, setErrors] = useState([])

  const mutateProducts = useCallback(
    (fn) => setProducts(produce(products, fn)),
    [products]
  )

  const newProduct = useCallback(
    () => mutateProducts((draft) => void draft.push(emptyProduct)),
    [mutateProducts]
  )

  const removeProduct = useCallback(
    (index) => mutateProducts((draft) => void draft.splice(index, 1)),
    [mutateProducts]
  )

  const changeProduct = useCallback(
    (index, product) =>
      mutateProducts((draft) => void (draft[index] = product)),
    [mutateProducts]
  )

  const resetProducts = useCallback(() => setProducts([]), [])

  const validateProducts = () => {
    const newErrors = products.map(({ name, amount }) => {
      const error = {}
      if (!!name && !!amount) return false
      else {
        !name && (error.name = true)
        !amount && (error.amount = true)
        return error
      }
    })
    setErrors(newErrors)
    return newErrors.every((error) => error === false)
  }

  return {
    products,
    newProduct,
    removeProduct,
    changeProduct,
    resetProducts,
    validateProducts,
    productErrors,
  }
}
