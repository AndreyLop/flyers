import gql from "graphql-tag";

export default gql`
    mutation ($email: String!, $firstName: String!, $lastName: String!) {
        quickAuthorization(email: $email, firstName: $firstName, lastName: $lastName) {
            result
            error
            accessToken
            user {
                id
                user_first_name
                user_last_name
                user_email
            }
        }
    }`;