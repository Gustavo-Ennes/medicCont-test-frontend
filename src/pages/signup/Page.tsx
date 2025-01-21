import { useState } from "react";
import { signup } from "./actions";
import { SignUpValidationErrors } from "./types";
import { Navigate, useNavigate } from "react-router";
import { useLoading } from "../../hooks/useLoading";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../utils/types";

const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] =
        useState<SignUpValidationErrors>();
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { username, email, password };
        const response = await signup(data, setIsLoading);
        setValidationErrors(response.errors);

        if (response.accessToken) {
            localStorage.setItem(
                "verificationCode",
                jwtDecode<DecodedToken>(response.accessToken).verificationCode
            );
            navigate("/verify");
        }
    };

    return (
        <>
            {localStorage.getItem("token") && (
                <Navigate to="/declarations" replace />
            )}

            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-md shadow-sm">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Sign up
                        </h1>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {validationErrors?.username && (
                            <p className="text-sm text-red">
                                {validationErrors.username}
                            </p>
                        )}
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>{" "}
                        {validationErrors?.email && (
                            <p className="text-sm text-red-500">
                                {validationErrors.email}
                            </p>
                        )}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {validationErrors?.password && (
                            <div className="text-sm text-red-500">
                                <p>Password must:</p>
                                <ul>
                                    {validationErrors.password.map((error) => (
                                        <li key={error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {validationErrors?.graphql && (
                            <div className="text-sm text-red-500">
                                <p>Server:</p>
                                <ul>
                                    {validationErrors.graphql.map((error) => (
                                        <li key={error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="w-full px-3 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Have an account?{" "}
                            <a
                                href="/login"
                                className="font-bold text-blue-500 hover:underline"
                            >
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
