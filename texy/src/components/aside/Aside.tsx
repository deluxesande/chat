import { useEffect, useState } from "react";
import "../css/Aside.css";
import MessageBox from "../utils/MessageBox";
import SearchContainer from "../utils/SearchContainer";
// import axios from "axios";
// import { API_URL } from "../../App";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/app";
import axiosInstance from "../utils/axiosInstance";

type User = {
    username: string;
    email: string;
    password: string;
    _v: number;
    _id: string;
    created: Date;
};

// type Chat = {
//     sender: string;
//     receiver: string;
//     message: string;
//     _id: string;
// };

// type Resp = {
//     users: User[];
//     chats: Chat[];
// };

const Aside = () => {
    const [users, setUsers] = useState<User[]>([]);
    // const { user } = useSelector((state: RootState) => state.auth);

    const get_all_users = async () => {
        // const response = await axios.get(`${API_URL}/auth/users`, {
        //     headers: {
        //         authorization: `Bearer ${user.accessToken}`,
        //     },
        // });

        const response = await axiosInstance.get("/auth/users");

        if (response.status === 200) {
            setUsers(response.data.users);
        }
    };

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

    useEffect(() => {
        get_all_users();
    }, []);

    return (
        <div className="aside-container">
            <SearchContainer />
            {users.map((user, index) => (
                <MessageBox
                    key={index}
                    onclick={handleClick}
                    user={user}
                    data-number={index + 1}
                />
            ))}
        </div>
    );
};

export default Aside;
