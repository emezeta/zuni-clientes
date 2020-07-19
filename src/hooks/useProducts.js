import { useState, useCallback } from 'react'
import produce from 'immer'
import { useAlert } from 'react-alert'
import mixpanel from 'mixpanel-browser'

const emptyProduct = {
  name: '',
  amount: '1',
  description: '',
}

export default () => {
  const [products, setProducts] = useState([])
  const [productErrors, setErrors] = useState([])
  const alert = useAlert()

  const validateProducts = useCallback(() => {
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
  }, [products])

  const mutateProducts = useCallback(
    (fn) => setProducts(produce(products, fn)),
    [products]
  )

  const newProduct = useCallback(() => {
    if (!validateProducts()) {
      alert.show('Completa un producto antes de agregar otro')
      return
    }
    mixpanel.track('Product added')
    mutateProducts((draft) => void draft.push(emptyProduct))
  }, [mutateProducts, validateProducts, alert])

  const removeProduct = useCallback(
    (index) => {
      mixpanel.track('Product removed')
      mutateProducts((draft) => void draft.splice(index, 1))
    },
    [mutateProducts]
  )

  const changeProduct = useCallback(
    (index, product) =>
      mutateProducts((draft) => void (draft[index] = product)),
    [mutateProducts]
  )

  const resetProducts = useCallback(() => setProducts([]), [])

  const repeatOrder = useCallback(() => {
    mixpanel.track('Repeat order')
    try {
      const lastOrder = JSON.parse(window.localStorage.getItem('lastOrder'))
      setProducts(lastOrder)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return {
    products,
    newProduct,
    removeProduct,
    changeProduct,
    resetProducts,
    repeatOrder,
    validateProducts,
    productErrors,
  }
}
