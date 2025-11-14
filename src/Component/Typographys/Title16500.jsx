import React from 'react'
import { Typography } from '@mui/material'

function Title16500(props) {
    const {text} = props
  return (
    <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#333333' }}>{text}</Typography>
  )
}

export default Title16500