import React, { memo } from 'react'

import logo from '../assets/logo.png'
import zm from '../assets/zm.png'
import waves from '../assets/text_waves.png'

const Header = () => (
  <div className="container align-items-center container mt-3">
    <div className="row align-items-center">
      <div className="col-12 col-md d-flex justify-content-center">
        <img className="w-75" src={zm}></img>
      </div>
      <div className="col-12 col-md mt-4 d-flex justify-content-center opacity-2">
        <img className="w-75 mr-1 py-2" src={waves}></img>
        <img src={logo}></img>
      </div>
    </div>
  </div>
)

export default memo(Header)
