import React, { memo } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const Loader = () => (
  <div className="d-flex flex-grow-1 align-items-center justify-content-center">
    <BeatLoader />
  </div>
)

export default memo(Loader)
