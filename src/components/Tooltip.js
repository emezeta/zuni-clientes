import React, { memo } from 'react'
import { default as MaterialTooltip } from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import '../styles/tooltips.css'
import InfoIcon from '../assets/info.svg'

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
      className="select-none position-relative"
    >
      <div className="shield"></div>
      {children}{' '}
      <img className="select-none" alt="información" src={InfoIcon} />
    </div>
  </DarkerTooltip>
)

export default memo(Tooltip)
