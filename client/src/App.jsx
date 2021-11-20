import React from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Form from './routes/Form';

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>ScottyLabs</title>
            </Helmet>
            <CssBaseline />
            <Router>
                <Container component="main" maxWidth="sm">
                    <Routes>
                        <Route path="/" element={<Form />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
