import React from 'react'
import {Box, Stack, Typography} from '@mui/material'

function CustomHeader(props) {
    const {title1, title2} = props
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' justifyContent={{xs: 'center', sm: "flex-start"}}
        sx={{
            height: '63px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            paddingLeft:{xs: 0, sm: '30px'} ,
        }}
    >
        <Typography
            sx={{
                fontSize: 12,
                fontWeight: 500,
                color: '#011E3D',
            }}
        >
            {title1}
        </Typography>
        <Typography
                sx={{
                    paddingLeft: '5px',
                    color: '#738499',
                    fontSize: 12,
                    fontWeight: 500,
                }}
            >
                {title2}               
            </Typography>
    </Stack>
  )
}

export default CustomHeader