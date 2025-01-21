import { Declaration } from "../declarations/types";

export type CreateDeclarationQueryResponse = {
    createDeclaration?: Declaration;
    errors?: DeclarationError;
};

export type DeclarationError = {
    graphql?: string[];
    year?: string[];
    name?: string[];
    birthday?: string[];
    userId?: string[];
    observation?: string[];
    declaredAmount?: string[];
};

export type CreateDeclarationParam = {
    year: number;
    userId: number;
    name: string;
    birthday: string;
    observation: string;
    declaredAmount: number;
};
