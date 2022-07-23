import React from 'react'
import { Paper, AppBar, Toolbar, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';

export default function TopBar({ title }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <PlaceIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
