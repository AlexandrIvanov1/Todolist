import React, {useEffect} from 'react';
import {AppBarComponent} from '../components/AppBarComponent/AppBarComponent';
import {CircularProgress, Container} from '@mui/material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import {initializeAppTC} from "../features/login/auth-reducer";
import {AppRootStateType, useAppDispatch} from "./store";
import {useSelector} from "react-redux";

type AppPropsType = { demo?: boolean }

function App({demo = false}: AppPropsType) {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <AppBarComponent/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                    <Route path={'/404'} element={<h1>404: Page not found</h1>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;