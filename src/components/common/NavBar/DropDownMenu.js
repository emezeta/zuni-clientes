import React, { memo, forwardRef } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import DropDownItem from './DropDownItem'

const DropDownMenu = ({ className, onChangePassword, onLogout }, ref) => (
  <Card
    ref={ref}
    className={cn('d-flex flex-column position-absolute p-2', className)}
  >
    <DropDownItem
      onClick={onLogout}
      label="Cerrar sesión"
      icon={<ExitToAppIcon />}
    />
    <Link to="/change-password">
      <DropDownItem label="Cambiar contraseña" icon={<VpnKeyIcon />} />
    </Link>
  </Card>
)

export default memo(forwardRef(DropDownMenu))
