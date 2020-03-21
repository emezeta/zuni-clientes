import { useState } from 'react'
import produce from 'immer'

const emptyProduct = {
  name: '',
  amount: 1,
  description: '',
}

export default () => {
  const [products, setProducts] = useState([])

  const mutateProducts = fn => setProducts(produce(products, fn))

  const newProduct = () =>
    mutateProducts(draft => void draft.push(emptyProduct))

  const removeProduct = index =>
    mutateProducts(draft => void draft.splice(index, 1))

  const changeProduct = (index, product) =>
    mutateProducts(draft => void (draft[index] = product))

  return { products, newProduct, removeProduct, changeProduct }
}
