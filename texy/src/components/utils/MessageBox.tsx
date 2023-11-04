type Message = {
    img: string;
    user: string;
    msg: string;
    texts: number;
};

interface Props {
    message: Message;
    onclick: () => void;
}

const MessageBox = ({ message, onclick }: Props) => {
    return (
        <div className="msg-holder" onClick={onclick}>
            <div className="msg-details">
                <div className="msg-details-holder">
                    <img
                        className="user-img"
                        src={message.img}
                        alt="User image"
                    />
                    <div className="msg-info">
                        <h4 className="msg-user">{message.user}</h4>
                        <p className="msg-text">{message.msg}</p>
                    </div>
                </div>
                <div className="msg-number">
                    <p className="time">09:00</p>
                    <div className="num-dis">
                        <span>{message.texts}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
