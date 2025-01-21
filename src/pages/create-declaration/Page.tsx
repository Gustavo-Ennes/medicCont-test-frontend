import { useState } from "react";
import DatePicker from "react-datepicker";
import { DeclarationError } from "./types";
import { createDeclaration } from "./action";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "../../hooks/useLoading";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

export const CreateDeclaration = () => {
    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        userId: Number(jwtDecode(localStorage.getItem("token") as string).sub),
        name: "",
        birthday: "",
        observation: "",
        declaredAmount: 0,
    });
    const [validationErrors, setValidationErrors] =
        useState<DeclarationError>();
    const { setIsLoading, isLoading } = useLoading();
    const navigate = useNavigate();

    const resetForm = () => {
        formData.year = new Date().getFullYear();
        formData.userId = Number(
            jwtDecode(localStorage.getItem("token") as string).sub
        );
        formData.name = "";
        formData.birthday = "";
        formData.observation = "";
        formData.declaredAmount = 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const shouldParseToNumber =
            name === "year" || name === "declaredAmount";
        setFormData((prev) => ({
            ...prev,
            [name]: shouldParseToNumber ? Number(value ?? "0") : value,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData((prev) => ({
                ...prev,
                birthday: date.toISOString(),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createDeclaration(formData, setIsLoading);
        setValidationErrors(response.errors);

        if (response.createDeclaration) resetForm();
    };

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <Navbar navigate={navigate} />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
                <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-md shadow-sm">
                    <div className="mb-6 text-center">
                        <h3 className="text-3xl font-bold text-gray-800">
                            New declaration
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">
                                Year
                            </label>
                            <input
                                type="number"
                                name="year"
                                placeholder="Year"
                                value={formData.year}
                                max={new Date().getFullYear()}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {validationErrors?.year && (
                            <p className="text-sm text-red">
                                {validationErrors.year}
                            </p>
                        )}

                        <div>
                            <label className="text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-gray-600 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {validationErrors?.name && (
                            <p className="text-sm text-red">
                                {validationErrors.name}
                            </p>
                        )}

                        <label className="text-sm text-gray-600">
                            Birthday
                        </label>
                        <div className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <DatePicker
                                selected={
                                    formData.birthday
                                        ? new Date(formData.birthday)
                                        : null
                                }
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select Birthday"
                                required
                            />
                        </div>
                        {validationErrors?.birthday && (
                            <p className="text-sm text-red">
                                {validationErrors.birthday}
                            </p>
                        )}

                        <div>
                            <label className="text-sm text-gray-600">
                                Observation
                            </label>
                            <textarea
                                name="observation"
                                placeholder="Observation"
                                value={formData.observation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={3}
                                required
                            ></textarea>
                        </div>
                        {validationErrors?.observation && (
                            <p className="text-sm text-red">
                                {validationErrors.observation}
                            </p>
                        )}

                        <div>
                            <label className="text-sm text-gray-600">
                                Declared amount
                            </label>
                            <input
                                type="number"
                                name="declaredAmount"
                                placeholder="Declared Amount"
                                value={formData.declaredAmount}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        {validationErrors?.declaredAmount && (
                            <p className="text-sm text-red">
                                {validationErrors.declaredAmount}
                            </p>
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
                                Submit Declaration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
