import "./App.css";
import Aside from "./components/aside/Aside";
import Messages from "./components/messages/Messages";
import Navbar from "./components/navbar/Navbar";
import { useGetAllChatsQuery, useGetChatQuery } from "./store/chatApiSlice";

function App() {
    const { data: chats, isSuccess } = useGetAllChatsQuery();

    isSuccess ? console.log(chats) : null;

    const { data: chat, isSuccess: success } = useGetChatQuery(12);

    success ? console.log(chat) : null;

    return (
        <div className="main">
            <Navbar />
            <Aside />
            <Messages />
        </div>
    );
}

export default App;
