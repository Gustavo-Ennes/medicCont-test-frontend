import { fetchGraphQL } from "../../graphql/fetch";
import { saveToken } from "../../utils/auth";
import { LoginFormSchema } from "./form";
import { LoginMutation } from "./query";
import type { LoginResponse, LoginInput } from "./types";

export async function login(
    loginInput: LoginInput,
    setIsLoading: (value: boolean) => void
): Promise<LoginResponse> {
    const validatedFields = LoginFormSchema.safeParse(loginInput);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { data, errors } = await fetchGraphQL<LoginResponse>({
        query: LoginMutation,
        variables: { input: validatedFields.data },
        setIsLoading,
    });

    if (data?.login) saveToken(data.login.accessToken);

    return {
        accessToken: data?.login?.accessToken,
        errors: {
            graphql: errors?.map((error) => error.message),
        },
    };
}
