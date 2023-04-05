import React from 'react';
import {AppBarComponent} from '../components/AppBarComponent/AppBarComponent';
import {Container} from '@mui/material';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


function App() {
    return (
        <div>
            <AppBarComponent/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;