import React from 'react';
import {AppBarComponent} from '../components/AppBarComponent/AppBarComponent';
import {Container} from '@mui/material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type AppPropsType = {demo?: boolean}

function App({demo = false}: AppPropsType) {
    return (
        <div>
            <AppBarComponent/>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;