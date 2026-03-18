import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import PageLayout from "./components/layout/PageLayout";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster 
                position="top-right" 
                toastOptions={{
                    style: {
                        background: '#111827',
                        color: '#f3f4f6',
                        border: '1px solid #1f2937',
                    }
                }} 
            />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<PageLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="results" element={<DashboardPage />} />
                    <Route path="settings" element={<DashboardPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
