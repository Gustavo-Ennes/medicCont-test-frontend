// src/components/PrivateRoute.jsx
import { Navigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: {children: ReactNode}) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
