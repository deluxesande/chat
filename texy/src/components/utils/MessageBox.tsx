type User = {
    username: string;
    email: string;
    password: string;
    _v: number;
    _id: string;
    created: Date;
};

interface Props {
    user: User;
    onclick: () => void;
}

const MessageBox = ({ user, onclick }: Props) => {
    return (
        <div className="msg-holder" onClick={onclick}>
            <div className="msg-details">
                <div className="msg-details-holder">
                    <img
                        className="user-img"
                        src="src/assets/user.jpg"
                        alt="User image"
                    />
                    <div className="msg-info">
                        <h4 className="msg-user">{user.username}</h4>
                        <p className="msg-text">username p</p>
                    </div>
                </div>
                <div className="msg-number">
                    <p className="time">09:00</p>
                    <div className="num-dis">
                        <span>1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
