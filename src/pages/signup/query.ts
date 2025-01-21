export const signUpQuery = `
  mutation SignUp($input: SignUpInput!) {
    signUp(signUpInput: $input) {
      accessToken: access_token
    }
  }
`