import { Box, Typography } from '@mui/material'
import React from 'react'

function CustomNewHeader(props) {
    const {judul, title1, title2} = props
  return (
    <Box>
        <Typography
            sx={{
                fontSize: 18,
                fontWeight: 700,
            }}
        >
            {judul}
        </Typography>
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

export default CustomNewHeader