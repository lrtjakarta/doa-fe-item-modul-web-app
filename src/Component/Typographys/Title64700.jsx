import React from 'react'
import { Typography } from '@mui/material'

function Title64700(props) {
    const {text, color} = props
  return (
    <Typography sx={{ fontSize: 64, fontWeight: 700, color: {color} }}>{text}</Typography>
  )
}

export default Title64700