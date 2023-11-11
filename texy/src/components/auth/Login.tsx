const Login = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
