export const declarationsQuery = `
  query Declarations($year: Int!){
    declarations(year: $year) {
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
`