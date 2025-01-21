import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export const VerifyCodePage = () => {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const verificationCode = localStorage.getItem("verificationCode");

        if (code === verificationCode) {
            setMessage("Código validado com sucesso!");
            localStorage.removeItem("verificationCode");
            navigate("/login");
        } else {
            setMessage("Código inválido. Tente novamente.");
            setCode("");
            setTimer(60);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-6">
            <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
                <h1 className="text-center text-2xl font-bold text-gray-800">
                    Verifique seu Código
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Insira o código enviado para o seu e-mail.
                </p>
                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="text"
                        placeholder="Insira o código"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Verificar Código
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-sm text-red-500">
                        {message}
                    </p>
                )}
                <div className="mt-4 text-center text-sm text-gray-600">
                    Não recebeu o código?{" "}
                    <button
                        onClick={() => console.log("email resent")}
                        disabled={timer > 0}
                        className="font-medium text-blue-500 hover:underline disabled:text-gray-400"
                    >
                        "Reenviar agora
                    </button>
                </div>
            </div>
        </div>
    );
};
