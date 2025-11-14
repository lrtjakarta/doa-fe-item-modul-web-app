import React from 'react'
import { Box, Typography } from '@mui/material'

function CustomHeaderTitle(props) {
    const {title1, title2} = props
  return (
    <Box>
        <Typography
            sx={{
                fontSize: 14,
                fontWeight: 500,
            }}
        >
            {title1}
            <span style={{ color: '#738499' }}>{title2}</span>
        </Typography>
    </Box>
  )
}

export default CustomHeaderTitle