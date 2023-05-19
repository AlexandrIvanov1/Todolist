import React, {useEffect} from 'react';
import {AppBarComponent} from '../components/AppBarComponent/AppBarComponent';
import {CircularProgress, Container} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Auth';
import {useAppDispatch} from './store';
import {useSelector} from 'react-redux';
import {appAsyncActions} from './app-reducer';
import {selectIsInitialized} from './selectors';
import {NotFoundPage} from '../components/NotFoundPage/NotFoundPage';

type AppPropsType = { demo?: boolean }

function App({demo = false}: AppPropsType) {

    const isInitialized = useSelector(selectIsInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(appAsyncActions.initializeAppTC())
        }
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
                    <Route path={'/404'} element={<NotFoundPage/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;