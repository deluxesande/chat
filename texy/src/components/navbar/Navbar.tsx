import "../css/Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Texy</span>
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Services</a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
