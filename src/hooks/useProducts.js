import { useState, useCallback } from 'react'
import produce from 'immer'
import mixpanel from 'mixpanel-browser'
import { useSnackbar } from 'notistack'

const emptyProduct = {
  name: '',
  amount: '1',
  description: '',
}

export default () => {
  const [products, setProducts] = useState([])
  const [productErrors, setErrors] = useState([])
  const { enqueueSnackbar } = useSnackbar()

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
      enqueueSnackbar('Completa un producto antes de agregar otro', {
        variant: 'warning',
      })
      return
    }
    mixpanel.track('Product added')
    mutateProducts((draft) => void draft.push(emptyProduct))
  }, [validateProducts, mutateProducts, enqueueSnackbar])

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
