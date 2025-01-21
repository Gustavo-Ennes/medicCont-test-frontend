import { FetchGraphQLParam, GraphQLResponse } from "./types";

export async function fetchGraphQL<T>({
    query,
    variables = {},
    token,
    setIsLoading,
}: FetchGraphQLParam): Promise<GraphQLResponse<T>> {
    const endpoint = import.meta.env.VITE_APP_API_ENDPOINT;
    const body = JSON.stringify({ query, variables });
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
        setIsLoading(true);
        const response = await fetch(endpoint, {
            headers,
            method: "POST",
            body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.errors) {
            console.error("GraphQL Errors:", responseData.errors);
        }

        return responseData as GraphQLResponse<T>;
    } catch (error) {
        console.error("Error fetching GraphQL data:", error);
        throw error;
    } finally {
        setIsLoading(false);
    }
}
