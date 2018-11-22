import gql from "graphql-tag";

export default gql`
mutation ($email: String!, $password: String!) {
    authorization(email: $email, password: $password) {
        error
        result
        accessToken
        user {
            id
            user_email
            user_last_name
            user_first_name
        }
    }
}`;
