import { useEffect } from 'react'

export default (ref, ...errors) =>
  useEffect(() => {
    const invalidInput = ref?.current?.querySelector(
      "input[aria-invalid='true']"
    )

    void invalidInput?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...errors])
