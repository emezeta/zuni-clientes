import React, { memo } from 'react'
import Button from '@material-ui/core/Button'

const DropDownItem = ({ className, onClick, label, icon, href }) => (
  <Button
    onClick={onClick}
    href={href}
    color="secondary"
    classes={{
      label: 'text-transform-none justify-content-start',
    }}
  >
    <div className="mr-2">{icon}</div>
    {label}
  </Button>
)

export default memo(DropDownItem)
