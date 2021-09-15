import { useEffect, useRef } from 'react'

export default (callback, tracking = true) => {
  const node = useRef()
  const button = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (node.current && node.current.contains(e.target)) {
        return
      }
      if (button.current && button.current.contains(e.target)) {
        return
      }
      callback()
    }

    tracking && document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback, tracking])

  // Use node as a ref for the component for which you want to handle outside clicks.
  return [node, button]
}
