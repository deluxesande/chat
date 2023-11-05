import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/apiAuthSlice";
import { userActions } from "../../store/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const [login] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = document.querySelector(
            "#username"
        ) as HTMLInputElement;
        const password = document.querySelector(
            "#password"
        ) as HTMLInputElement;

        const user = { username: username?.value, password: password?.value };
        console.log(user);

        const userData = await login(user);

        dispatch(userActions.setCredentials({ ...userData, user }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" />
            <input type="password" name="password" id="password" />
            <input type="submit" value="Log in" />
        </form>
    );
};

export default Login;
