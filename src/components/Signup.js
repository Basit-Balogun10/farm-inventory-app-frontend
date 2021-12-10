import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../App";

const Signup = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    const [displayPasswordError, setDisplayPasswordError] = useState(false);
    const user = useContext(UserContext);
    const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

    const { login } = user;
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.access_token) {
            navigate("/app/inventory-weeks");
        }
    }, [cookies.access_token]);

    const registerUser = async (e) => {
        e.preventDefault();
        const registrationDetails = {
            email,
            organization_Name: organizationName,
            firstname: firstName,
            lastname: lastName,
            password,
        };
        console.log("registering...");
        if (password === confirmPassword) {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/users/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registrationDetails),
                });

                const data = await res.json();
                await login(email, password);
                navigate('/');
                return data;
            } catch (error) {
                console.log(error.stack);
                setErrors(error.response.data);
            }
        } else {
            setDisplayPasswordError(!displayPasswordError);
            setTimeout(() => {
                setDisplayPasswordError(!displayPasswordError);
            }, 3000);
        }
    };
    return (
        <div>
            <h3 class="font-bold my-2 lg:text-4xl text-center text-blue-500">
                CREATE AN ACCOUNT WITH US TODAY
            </h3>
            <form class="shadow-2xl p-4">
                <p class="text-grey-500 text-sm italic">
                    All fields are required.
                </p>
                <hr />
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-first-name"
                        >
                            First Name
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstname ? errors.firstname : null}
                        <p class="text-red-500 text-xs italic">
                            Please fill out this field.
                        </p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-last-name"
                        >
                            Last Name
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastname ? errors.lastname : null}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="email"
                        >
                            Email
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="email"
                            placeholder="xyz@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email ? errors.email : null}
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="organization-name"
                        >
                            Organization Name
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            placeholder="username"
                            value={organizationName}
                            onChange={(e) =>
                                setOrganizationName(e.target.value)
                            }
                        />
                        {errors.organizationName ? errors.organizationName : null}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="password"
                        >
                            Password
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password ? errors.password : null}
                        <p class="text-gray-600 text-xs italic">
                            Make it as long and as crazy as you'd like
                        </p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="confirm-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {displayPasswordError && (
                            <p className="text-red-500">
                                Please make sure you have entered the same
                                password as the one first password field
                            </p>
                        )}
                        <p class="text-gray-600 text-xs italic">
                            Retype the password entered above for confirmation
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="shadow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                <p class="text-blue-500 italic text-center">
                    Already own an account? login
                    <Link to="/login">
                        <p class="underline">here</p>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
