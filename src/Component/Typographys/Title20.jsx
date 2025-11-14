import { Typography } from '@mui/material'
import React from 'react'

function Title20(props) {
    const {color, font, text} = props
  return (
    <Typography sx={{ fontSize: 20, fontWeight: font, color: color }}>{text}</Typography>
  )
}

export default Title20