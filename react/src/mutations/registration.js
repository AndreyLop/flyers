import gql from "graphql-tag";

export default gql`
    mutation ($email: String!, $firstName: String!, $lastName: String!, $state: String!, $password: String!, $confirmPassword: String!){
        newAccount(email: $email, firstName: $firstName, lastName: $lastName, state: $state, password: $password, confirmPassword: $confirmPassword) {
            result,
            error,
            accessToken,
            user {
                id,
                user_email,
                user_last_name
            }
        }
    }
`;