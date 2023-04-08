import React from 'react';
import {AppBarComponent} from '../components/AppBarComponent/AppBarComponent';
import {Container} from '@mui/material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


function App() {
    return (
        <div>
            <AppBarComponent/>
            <Container fixed>
                <TodolistsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;