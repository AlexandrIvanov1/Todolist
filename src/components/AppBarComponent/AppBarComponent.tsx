import React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {MenuBook} from '@mui/icons-material';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {RequestStatusType} from "../../app/app-reducer";
import {logoutTC} from "../../features/login/auth-reducer";

export function AppBarComponent() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
    const dispatch = useAppDispatch()

    const logout = () => dispatch(logoutTC())

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
                    {isLoggedIn && <Button color="inherit" onClick={logout}>Logout</Button>}
                </Toolbar>
            </AppBar>
            <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', right: '0px', left: '0px'}}>
                    {status === 'loading' && <LinearProgress/>}
                </div>
            </div>
        </Box>
    )
}