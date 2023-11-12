import axios from "axios";

const URL = "http://localhost:3000/auth/register";

type User = {
    username: string;
    email: string;
    password: string;
};

const register = async (userData: User) => {
    const response = await axios.post(URL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    register,
};

export default authService;
