import { useState, useCallback } from "react";
import { Toast } from "./types";

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string) => {
        const id = Math.random().toString(36).substring(2);
        setToasts((prev) => [...prev, { id, message }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    return { toasts, addToast };
};
