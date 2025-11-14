import React from 'react'
import { Typography } from '@mui/material'

function Title16600(props) {
    const {text} = props
  return (
    <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#000000' }}>{text}</Typography>
  )
}

export default Title16600