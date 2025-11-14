import { Typography } from '@mui/material'
import React from 'react'

function Title18700(props) {
    const {text} = props
  return (
    <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#011E3D' }}>{text}</Typography>
  )
}

export default Title18700