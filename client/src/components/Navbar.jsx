import React from 'react'
import { AppBar, styled, Toolbar, Typography } from '@mui/material'
export const NavBar = () => {
    const StyledToolbar = styled(Toolbar)({
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        minHeight: '50px !important',
        margin: '0px !important',
        fontFamily:'Trebuchet MS, sans-serif'
    })
    return (
        <AppBar>
            <StyledToolbar>
                <Typography sx={{fontFamily:'sans-serif'}} variant='h6'>
                    Document Management
                </Typography>
            </StyledToolbar>
        </AppBar>
    )
}
