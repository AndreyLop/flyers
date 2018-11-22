import gql from "graphql-tag";

export default gql`
mutation ($id: Int!, $accessToken: String!, $curentPassword: String!, $password: String!, $confirmPassword: String!) {
    changePassword(
        access: {
            id: $id,
            accessToken: $accessToken
        },
        curentPassword: $curentPassword,
        password: $password,
        confirmPassword: $confirmPassword
    ) {
        result,
        error
    }
}
`;