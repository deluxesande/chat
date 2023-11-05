import "./App.css";
import Aside from "./components/aside/Aside";
import Login from "./components/auth/Login";
import Messages from "./components/messages/Messages";
import Navbar from "./components/navbar/Navbar";

export const API_URL = "http://localhost:3000";

function App() {
    return (
        <>
            <Login />
            <div className="main">
                <Navbar />
                <Aside />
                <Messages />
            </div>
        </>
    );
}

export default App;
