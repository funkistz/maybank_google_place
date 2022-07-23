import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ThemeProvider from '../ThemeContext';
import NotFoundPage from '../pages/NotFoundPage';
import App from '../App';

export default function MainLayout() {

    return (
        <>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                        </Route>
                        <Route path="*" element={<NotFoundPage />}>
                        </Route>
                    </Routes>
                </BrowserRouter >
            </ThemeProvider>
        </>
    )
}
