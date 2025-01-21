export type SignUpResponse = {
    accessToken?: string;
    errors?: SignUpValidationErrors;
    username?: string;
    email?: string;
    password?: string;
};

export type SignUpValidationErrors = {
    username?: string[];
    email?: string[];
    password?: string[];
    graphql?: string[];
};

export type GraphQLError = {
    message: string;
    location: unknown;
    path: unknown;
    extensions: unknown;
};

export type SignUpInput = {
    username: string;
    email: string;
    password: string;
};
