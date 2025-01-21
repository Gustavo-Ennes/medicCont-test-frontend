import { useEffect, useState } from "react";
import { DeclarationsError, type Declaration } from "./types";
import { getDeclarations } from "./actions";
import { useLoading } from "../../hooks/useLoading";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

export const Declarations = () => {
    const [declarations, setDeclarations] = useState<Declaration[]>();
    const [errors, setErrors] = useState<DeclarationsError>();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const { setIsLoading, isLoading } = useLoading();
    const navigate = useNavigate();

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(event.target.value));
        setDeclarations(undefined);
    };

    useEffect(() => {
        const fetchDeclarations = async () => {
            const { declarations: fetchedDeclarations, errors: fetchErrors } =
                await getDeclarations(year, setIsLoading);
            if (fetchedDeclarations) setDeclarations(fetchedDeclarations);
            setErrors(fetchErrors);
        };

        if (declarations === undefined && !isLoading) {
            fetchDeclarations();
        }
    }, [declarations, isLoading, setIsLoading, year]);

    return isLoading || declarations === undefined ? (
        <Loading />
    ) : (
        <>
            <Navbar navigate={navigate} />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
                <div className="w-full max-w-4xl flex justify-between items-center mb-4">
                    <p className="text-gray-700 text-sm pl-4">
                        Viewing declarations for the year:{" "}
                        <strong>{year}</strong>
                    </p>
                    <button
                        onClick={() => navigate("/create-declaration")}
                        className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
                    >
                        Create new Declaration
                    </button>
                    <select
                        value={year}
                        onChange={handleYearChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {Array.from(
                            { length: currentYear - 1990 + 1 },
                            (_, index) => 1990 + index
                        ).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6">
                    {declarations && declarations.length > 0 ? (
                        <ul className="space-y-4">
                            {declarations.map((declaration, index) => (
                                <li
                                    key={index}
                                    className="border rounded-lg p-4 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-xl font-semibold text-gray-700">
                                            {declaration.name}
                                        </h2>
                                        <span className="text-sm text-gray-500">
                                            Year: {declaration.year}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">
                                        <strong>User ID:</strong>{" "}
                                        {declaration.user.id}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Birthday:</strong>{" "}
                                        {new Date(
                                            declaration.birthday
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Observation:</strong>{" "}
                                        {declaration.observation}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Declared Amount:</strong> $
                                        {declaration.declaredAmount.toFixed(2)}
                                    </p>
                                </li>
                            ))}
                            {errors?.graphql && (
                                <div className="text-sm text-red-500">
                                    <p>Server:</p>
                                    <ul>
                                        {errors.graphql.map((error) => (
                                            <li key={error}>- {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">
                            No declarations found.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
