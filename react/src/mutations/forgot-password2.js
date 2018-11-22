import gql from "graphql-tag";

export default gql`
    mutation ($key: String!, $password: String!, $confirmPassword: String!) {
        forgotPassword2(key: $key, password: $password, confirmPassword: $confirmPassword) {
            result
            error
        }
    }
    `;