import React from 'react'
import { Stack } from '@mui/material'

function BoxBarang(props) {
    const {content} = props
  return (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
            backgroundColor: '#F9F9F9',
            borderRadius: '12px',
        }}
    >
        {content}
    </Stack>
  )
}

export default BoxBarang