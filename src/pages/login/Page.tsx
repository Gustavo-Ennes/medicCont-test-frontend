import { useEffect, useState } from "react";
import { login } from "./actions";
import { LoginValidationErrors } from "./types";
import { saveToken } from "../../utils/auth";
import { Navigate, useNavigate } from "react-router";
import { useLoading } from "../../hooks/useLoading";
import Loading from "../../components/Loading";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] =
        useState<LoginValidationErrors>();
    const { setIsLoading, isLoading } = useLoading();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { password, username };
        const response = await login(data, setIsLoading);
        setValidationErrors(response.errors);

        if (response.accessToken) {
            saveToken(response.accessToken);
            navigate("/");
        }
    };

    useEffect(() => {
        const needsVerification = localStorage.getItem("verificationCode");
        if (needsVerification) navigate("/verify");
    }, []);

    return (
        <>
            {localStorage.getItem("token") && (
                <Navigate to="/declarations" replace />
            )}

            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-md shadow-sm">
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Login
                            </h1>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                            {validationErrors?.password && (
                                <div className="text-sm text-red-500">
                                    <p>Password must:</p>
                                    <ul>
                                        {validationErrors.password.map(
                                            (error) => (
                                                <li key={error}>- {error}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            {validationErrors?.graphql && (
                                <div className="text-sm text-red-500">
                                    <p>Server:</p>
                                    <ul>
                                        {validationErrors.graphql.map(
                                            (error) => (
                                                <li key={error}>- {error}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-3 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="mx-4 text-sm text-gray-500">
                                OR
                            </span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                Don’t have an account?{" "}
                                <a
                                    href="/signup"
                                    className="font-bold text-blue-500 hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
