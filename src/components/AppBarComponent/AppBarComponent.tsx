import React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {MenuBook} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../app/store';
import {logout} from '../../features/Auth/auth-reducer';
import {appSelectors} from '../../app';
import {authSelectors} from '../../features/Auth';

export function AppBarComponent() {

    const status = useSelector(appSelectors.selectStatus)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const logoutCb = () => dispatch(logout())

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
                    {isLoggedIn && <Button color="inherit" onClick={logoutCb}>Logout</Button>}
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