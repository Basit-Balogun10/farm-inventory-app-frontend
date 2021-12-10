import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useCookies } from "react-cookie";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
    const navigate = useNavigate();
    const user = useContext(UserContext);
    console.log("user", user);
    const { login } = user;

    useEffect(() => {
        if (cookies.access_token) {
            navigate("/app/inventory-weeks");
        }
    }, [cookies.access_token]);

    const logUserIn = async (e) => {
        console.log("Loggin in....")
        e.preventDefault();
        await login(email, password);
        navigate("/app/inventory-weeks");
    };

    return (
        <div class="w-1/2">
            <h3 class="font-bold my-2 text-5xl text-center text-blue-500">
                WELCOME
            </h3>
            <div class="">
                <form
                    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={logUserIn}
                >
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2"
                            for="email"
                        >
                            Email
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            class="block text-gray-700 text-sm font-bold mb-2"
                            for="password"
                        >
                            Password
                        </label>
                        <input
                            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p class="text-red-500 text-xs italic">
                            Please enter your password.
                        </p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <a
                            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <p class="text-blue-500 italic text-center">
                        Don't own an account yet?{" "}
                        <Link to="/signup">
                            <p class="underline">Create one now</p>
                        </Link>
                    </p>
                </form>
                <p class="text-center text-gray-500 text-xs">
                    &copy;2021 All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Login;
