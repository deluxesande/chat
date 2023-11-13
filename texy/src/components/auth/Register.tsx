import { useEffect } from "react";
import { reset, register } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/app";
import { Link, useNavigate } from "react-router-dom";

import "../css/AuthForms.css";

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
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-header">Sign up</h1>
                <input
                    placeholder="Enter username"
                    type="text"
                    name="username"
                    id="username"
                />
                <input
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    id="email"
                />
                <input
                    placeholder="Enter Password"
                    type="password"
                    name="password1"
                    id="password1"
                />
                <input
                    placeholder="Re-enter password"
                    type="password"
                    name="password2"
                    id="password2"
                />
                <input className="btn" type="submit" value="Sign up" />
                <Link className="link" to="/login">
                    Log in
                </Link>
            </form>
        </div>
    );
};

export default Register;
