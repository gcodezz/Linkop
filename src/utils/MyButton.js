import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default ({ children, onClick, tip, btnClassName, placement, tipClassName }) => (
    <Tooltip title={tip} placement={placement} className={tipClassName}>
        <IconButton
            onClick={onClick}
            className={btnClassName}
        >
            {children}
        </IconButton>
    </Tooltip>
)
