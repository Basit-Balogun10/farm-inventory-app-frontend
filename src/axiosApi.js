import axios from "axios";
import Cookies from 'universal-cookie';

const baseURL = "http://127.0.0.1:8000/api/";
const cookies = new Cookies();


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        Authorization: cookies.get("access_token")
            ? "JWT " + cookies.get("access_token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json", 
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("axios error", error);
        const originalRequest = error.config;

        // Prevent infinite loops
        if (
            error.response.status === 401 &&
            originalRequest.url === baseURL + "auth/token/refresh/"
        ) {
            console.log("I got here");
            window.location.href = "/login/";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            console.log(
                "errorhere",
                error.response.data.code,
                error.response.data.detail,
                error.response.status,
                error.response.statusText
            );
            const refreshToken = cookies.get("refresh_token");

            if (refreshToken) {
                if (error.response.data.detail === "Token is blacklisted") {
                    console.log("blacklist error here");
                    window.location.href = "/login";
                    cookies.remove("access_token");
                    cookies.remove("refresh_token");
                    return Promise.reject(error);
                }
                const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post("/auth/token/refresh/", { refresh: refreshToken })
                        .then((response) => {
                            cookies.set('access_token', response.data.access, {
                                path: '/',
                                // httpOnly: true,
                                maxAge: 60 * 60 * 24 * 7,
                                sameSite: 'lax'
                            })
                            cookies.set('refresh_token', response.data.refresh, {
                                path: '/',
                                // httpOnly: true,
                                maxAge: 60 * 60 * 24 * 7,
                                sameSite: 'lax'
                            })

                            axiosInstance.defaults.headers["Authorization"] =
                                "JWT " + response.data.access;
                            originalRequest.headers["Authorization"] =
                                "JWT " + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log(
                        "Refresh token is expired",
                        tokenParts.exp,
                        now
                    );
                    window.location.href = "/login/";
                }
            } else {
                console.log("Refresh token not available.");
                window.location.href = "/login/";
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;
