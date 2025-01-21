import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router";

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < now) {
        localStorage.removeItem("token");
        return false;
    }
    return true;
};

export const handleLogout = (navigate: NavigateFunction) => {
    localStorage.removeItem("token");
    navigate("/login");
};

export const saveToken = (token?: string) => {
    if (token) localStorage.setItem("token", token);
};
