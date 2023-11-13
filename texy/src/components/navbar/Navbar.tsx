import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { logoutUser, reset } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(logoutUser());
        dispatch(reset());
        navigate("/login");
    };

    return (
        <div className="navbar">
            <span className="logo">Texy</span>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/">About</Link>
                </li>

                <li>
                    <Link to="/">Services</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="btn">
                        Log out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
