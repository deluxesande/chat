import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/app";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { loginUser, reset } from "../../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    // Constants
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get user data
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;
        const userData = { username, password };

        if (username && password) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(loginUser(userData));
        }
    };

    useEffect(() => {
        // Check for error
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(`User logged in.`);
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, isLoading, isSuccess, message, dispatch, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" />
            <input type="password" name="password" id="password" />
            <input type="submit" value="Log in" />
            <Link to="/register">Sign up</Link>
        </form>
    );
};

export default Login;
