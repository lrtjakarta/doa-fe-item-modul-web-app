import React from 'react'
import { Typography } from '@mui/material'

function Title16700(props) {
    const {text} = props
  return (
    <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D' }}>{text}</Typography>
  )
}

export default Title16700