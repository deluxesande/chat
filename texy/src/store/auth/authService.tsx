import axios from "axios";

const API_URL = "auth/register";

type User = {
    username: string;
    email: string;
};

const register = async (userData: User) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    register,
};

export default authService;
