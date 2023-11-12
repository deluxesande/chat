import Messages from "../messages/Messages";
import Navbar from "../navbar/Navbar";
import Aside from "../aside/Aside";

const Home = () => {
    return (
        <div className="main">
            <Navbar />
            <Aside />
            <Messages />
        </div>
    );
};

export default Home;
