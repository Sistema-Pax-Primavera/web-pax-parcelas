import React from "react";
import RoutesApp from "./routes/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <RoutesApp />
            <ToastContainer autoClose={3000} />
        </>
    );
}

export default App;