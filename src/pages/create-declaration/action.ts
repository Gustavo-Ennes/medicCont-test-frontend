import { fetchGraphQL } from "../../graphql/fetch";
import { Declaration } from "../declarations/types";
import { CreateDeclarationFormSchema } from "./form";
import { createDeclarationMutation } from "./query";
import {
    CreateDeclarationParam,
    CreateDeclarationQueryResponse,
} from "./types";

export const createDeclaration = async (
    input: CreateDeclarationParam,
    setIsLoading: (value: boolean) => void
): Promise<CreateDeclarationQueryResponse> => {
    const validatedFields = CreateDeclarationFormSchema.safeParse(input);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { data, errors } = await fetchGraphQL<Declaration>({
        query: createDeclarationMutation,
        variables: { input },
        token: localStorage.getItem("token"),
        setIsLoading,
    });

    return {
        createDeclaration: data?.createDeclaration,
        errors: {
            graphql: errors?.map((error) => error.message),
        },
    };
};
