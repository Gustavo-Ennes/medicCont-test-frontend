import { fetchGraphQL } from "../../graphql/fetch";
import { signUpQuery } from "./query";
import { SignUpInput, SignUpResponse } from "./types";
import { SignupFormSchema } from "./form";

export async function signup(
    signUpInput: SignUpInput,
    setIsLoading: (value: boolean) => void
): Promise<SignUpResponse> {
    const validatedFields = SignupFormSchema.safeParse(signUpInput);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { data, errors } = await fetchGraphQL<SignUpResponse>({
        query: signUpQuery,
        variables: {
            input: validatedFields.data,
        },
        setIsLoading,
    });

    return {
        accessToken: data?.signUp?.accessToken,
        errors: {
            graphql: errors?.map((error) => error.message),
        },
    };
}
