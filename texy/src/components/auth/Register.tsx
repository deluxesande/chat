import { useEffect } from "react";
import { reset, register } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/app";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state: RootState) => state.auth
    );
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Getting data
        const username = e.currentTarget.username.value;
        const email = e.currentTarget.email.value;
        const password1 = e.currentTarget.password1.value;
        const password2 = e.currentTarget.password2.value;
        const password = password1;

        const userData = { username, email, password };

        // Password validation
        if (password1 !== password2) {
            toast.error("Passwords do not match!");
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(register(userData));
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(`User created.`);
            navigate("/");
        }

        dispatch(reset());
    }, [user, isSuccess, isLoading, isError, message, dispatch, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" />
            <input type="email" name="email" id="email" />
            <input type="password" name="password1" id="password1" />
            <input type="password" name="password2" id="password2" />
            <input type="submit" value="Log in" />
        </form>
    );
};

export default Register;
