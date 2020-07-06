import React, { memo } from 'react'
import cn from 'classnames'

import '../styles/tooltips.css'
import InfoIcon from '../assets/info.svg'

const Tooltip = ({ className, children, tooltip, bottom = false }) => (
  <div className={cn(className, 'tt')}>
    {children} <img alt="infomración" src={InfoIcon} />
    <span className={cn('tt-text', bottom ? 'tt-text-bottom' : 'tt-text-top')}>
      {tooltip}
    </span>
  </div>
)

export default memo(Tooltip)
