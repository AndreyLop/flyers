import gql from "graphql-tag";

export default gql`
mutation ($accessToken: String!) {
    loginByToken(accessToken: $accessToken) {
        error
        result
        accessToken
        user {
            id
            user_email,
            user_last_name
            user_first_name
     }
  }
}`;
