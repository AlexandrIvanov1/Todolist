import React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {MenuBook} from '@mui/icons-material';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../app/app-reducer";

export function AppBarComponent() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuBook/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button color="inherit">Todolist</Button>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <div style={{position: 'absolute', top: '64px', right: '0px', left: '0px'}}>
                {status === 'loading' && <LinearProgress/>}
            </div>
        </Box>
    )
}