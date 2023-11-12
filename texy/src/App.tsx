import "./App.css";
import Register from "./components/auth/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import PrivateRoutes from "./components/utils/PrivateRoutes";

export const API_URL = "http://localhost:3000";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
