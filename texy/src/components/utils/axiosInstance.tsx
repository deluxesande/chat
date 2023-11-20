/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

let accessToken = localStorage.getItem("accessToken")
    ? // @ts-ignore
      JSON.parse(localStorage.getItem("accessToken"))
    : null;
const baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        authorization: `Bearer ${accessToken}`,
    },
});

// @ts-ignore
axiosInstance.interceptors.request.use(async (req) => {
    if (!accessToken) {
        accessToken = localStorage.getItem("accessToken")
            ? // @ts-ignore
              JSON.parse(localStorage.getItem("accessToken"))
            : null;
        const refreshToken = localStorage.getItem("refreshToken")
            ? // @ts-ignore
              JSON.parse(localStorage.getItem("refreshToken"))
            : null;

        req.headers.Authorization = `Bearer ${accessToken}`;

        const user = jwtDecode(accessToken);
        // @ts-ignore
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        const response = await axios.post(`${baseURL}/auth/refresh-tokens/`, {
            refreshToken: refreshToken,
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    }
});

export default axiosInstance;
