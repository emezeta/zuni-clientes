import { useState, useCallback } from 'react'

export default () => {
  const [modalVisible, setModal] = useState(false)

  return [
    useCallback(() => setModal(true), []),
    useCallback(() => setModal(false), []),
    modalVisible,
  ]
}
