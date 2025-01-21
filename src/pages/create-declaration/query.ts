export const createDeclarationMutation = `
  mutation CreateDeclaration($input: CreateDeclarationInput!) {
    createDeclaration(createDeclarationInput: $input) {
      year
      birthday
      name
      observation
      declaredAmount
      createdAt
      user {
        username
      }
    }
  }
`;