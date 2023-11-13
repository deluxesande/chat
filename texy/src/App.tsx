import "./App.css";
import Register from "./components/auth/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import Login from "./components/auth/Login";

export const API_URL = "http://localhost:3000";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default App;
