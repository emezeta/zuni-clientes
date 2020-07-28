import React, { memo } from 'react'
import { default as MaterialTooltip } from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import HelpIcon from '@material-ui/icons/Help'

import '../styles/tooltips.css'

const DarkerTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '1rem 1.5rem',
  },
}))(MaterialTooltip)

const Tooltip = ({ children, ...props }) => (
  <DarkerTooltip {...props}>
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        return false
      }}
      className="select-none d-flex position-relative align-items-center"
    >
      <div className="shield"></div>
      {children} <HelpIcon className="ml-1" />
    </div>
  </DarkerTooltip>
)

export default memo(Tooltip)
