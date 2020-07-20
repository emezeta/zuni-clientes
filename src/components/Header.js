import React, { memo } from 'react'

import logo from '../assets/header.png'

const Header = () => (
  <div className="row mb-4">
    <div className="col col-md-6 offset-md-3">
      <img
        src={logo}
        alt="zunimercado"
        className="rounded overflow-hidden w-100"
      />
    </div>
  </div>
)

export default memo(Header)
