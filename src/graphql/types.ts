import { GraphQLError } from "../pages/signup/types";

export type GraphQLResponse<T> = {
    data?: { [key: string]: T };
    errors?: GraphQLError[];
};

export type FetchGraphQLParam = {
    query: string;
    variables?: Record<string, unknown>;
    token?: string | null;
    setIsLoading: (value: boolean) => void;
};
