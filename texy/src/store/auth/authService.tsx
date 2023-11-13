import axios from "axios";

const URL = "http://localhost:3000/auth";

type User = {
    username: string;
    email: string;
    password: string;
};

type logUser = {
    username: string;
    password: string;
};

const register = async (userData: User) => {
    const response = await axios.post(`${URL}/register`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const loginUser = async (userData: logUser) => {
    const response = await axios.post(`${URL}/login`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

const logoutUser = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    loginUser,
    logoutUser,
};

export default authService;
