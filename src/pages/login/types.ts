export type LoginInput = {
    username: string;
    password: string;
};

export type LoginResponse = {
    accessToken?: string;
    errors?: LoginValidationErrors;
};

export type LoginValidationErrors = {
    username?: string[];
    password?: string[];
    graphql?: string[];
};
