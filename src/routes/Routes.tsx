import { Route, Routes } from "react-router";
import Signup from "../pages/signup/Page";
import { isAuthenticated } from "../utils/auth";
import { Declarations } from "../pages/declarations/Page";
import { Login } from "../pages/login/Page";
import PrivateRoute from "./Private-route";
import { CreateDeclaration } from "../pages/create-declaration/Page";
import { VerifyCodePage } from "../pages/verify/page";

export const AppRoutes = () => {
    const Home = isAuthenticated() ? Declarations : Login;

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyCodePage />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/declarations"
                element={
                    <PrivateRoute>
                        <Declarations />
                    </PrivateRoute>
                }
            />
            <Route
                path="/create-declaration"
                element={
                    <PrivateRoute>
                        <CreateDeclaration />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
