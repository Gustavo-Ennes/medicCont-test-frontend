export type Declaration = {
    year: number;
    user: {
        id: number;
    };
    name: string;
    birthday: string;
    observation: string;
    declaredAmount: number;
};

export type DeclarationsQueryResponse = {
    declarations?: Declaration[];
    errors?: DeclarationsError;
};

export type DeclarationsError = {
    graphql?: string[];
};
