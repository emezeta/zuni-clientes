import { useState, useCallback } from 'react'

export default () => {
  const [modalVisible, setModal] = useState(false)

  return {
    modalVisible,
    showModal: useCallback(() => setModal(true), []),
    closeModal: useCallback(() => setModal(false), []),
  }
}
