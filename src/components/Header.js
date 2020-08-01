import React, { memo } from 'react'

import logo from '../assets/header.png'

const Header = () => (
  <div className="row mb-4 justify-content-center">
    <div className="col-12 col-md-8 col-lg-6">
      <img
        src={logo}
        alt="zunimercado"
        className="rounded overflow-hidden w-100"
      />
    </div>
  </div>
)

export default memo(Header)
