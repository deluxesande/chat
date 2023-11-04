import "../css/Aside.css";
import MessageBox from "../utils/MessageBox";
import SearchContainer from "../utils/SearchContainer";

const Aside = () => {
    const msgs = [
        {
            img: "src/assets/user.jpg",
            user: "john doe",
            msg: "Hello",
            texts: 1,
        },
        {
            img: "src/assets/user.jpg",
            user: "jane doe",
            msg: "hi",
            texts: 1,
        },
        {
            img: "src/assets/user.jpg",
            user: "kevin hart",
            msg: "Hello",
            texts: 2,
        },
        {
            img: "src/assets/user.jpg",
            user: "will smith",
            msg: "How are you?",
            texts: 4,
        },
    ];

    const handleClick = () => {
        // To solve the undefined issue
        if (window.visualViewport?.width) {
            if (window.visualViewport?.width <= 568) {
                window.alert(
                    "No Mobile version yet! Can only view recent chats!"
                );
            }
        }
    };

    return (
        <div className="aside-container">
            <SearchContainer />
            {msgs.map((message, index) => (
                <MessageBox
                    key={index}
                    message={message}
                    onclick={handleClick}
                    data-number={index + 1}
                />
            ))}
        </div>
    );
};

export default Aside;
