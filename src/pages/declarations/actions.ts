import { fetchGraphQL } from "../../graphql/fetch";
import { declarationsQuery } from "./query";
import { Declaration, DeclarationsQueryResponse } from "./types";

export const getDeclarations = async (
    year: number,
    setIsLoading: (value: boolean) => void
): Promise<DeclarationsQueryResponse> => {
    const { data, errors } = await fetchGraphQL<Declaration[]>({
        query: declarationsQuery,
        token: localStorage.getItem("token"),
        setIsLoading,
        variables: { year },
    });

    return {
        declarations: data?.declarations,
        errors: {
            graphql: errors?.map((error) => error.message),
        },
    };
};
