import React, {
  memo,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Settings from '@material-ui/icons/Settings'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import useOnClickOutside from 'hooks/useOnClickOutside'
import useSession from 'hooks/useSession'

import DropDownMenu from './DropDownMenu'

import './settings.css'

const NavBar = () => {
  const navBarRef = useRef()
  const [showSettings, setSettingsVisibility] = useState()
  const [dropDownRef, buttonRef] = useOnClickOutside(
    useCallback(() => setSettingsVisibility(false), []),
    showSettings
  )

  const [barHeight, setBarHeight] = useState()

  useLayoutEffect(() => {
    setBarHeight(navBarRef.current.clientHeight)
  }, [])

  const [, logout] = useSession()

  return createPortal(
    <>
      <div className="fixed-top">
        <div
          ref={navBarRef}
          className="bg-dark-blue d-flex justify-content-end py-2 px-3 px-md-5"
        >
          <Link to="/" className="cursor-pointer mr-auto">
            <ShoppingCartIcon className="mr-2" style={{ color: 'white' }} />
            <span className="text-white">Compras</span>
          </Link>
          <Settings
            ref={buttonRef}
            className="cursor-pointer"
            onClick={() => setSettingsVisibility(!showSettings)}
            style={{ color: 'white' }}
          />
        </div>
        <div className="position-relative">
          {showSettings && (
            <DropDownMenu
              onLogout={logout}
              className="drop-down-settings"
              ref={dropDownRef}
            />
          )}
        </div>
      </div>
      <div style={{ marginTop: `${barHeight}px` }} />
    </>,
    document.getElementById('navbar')
  )
}

export default memo(NavBar)
