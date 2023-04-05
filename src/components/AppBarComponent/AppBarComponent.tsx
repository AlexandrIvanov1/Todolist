import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {MenuBook} from '@mui/icons-material';

export function AppBarComponent() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuBook/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit">Todolist</Button>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}