export const LoginMutation = `
mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    accessToken: access_token
  }
}
`;
