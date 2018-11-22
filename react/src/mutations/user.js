import gql from "graphql-tag";

export default gql`
    mutation ($id: Int!) {
        user(id: $id) {
            id
            user_first_name
            user_last_name
            user_email
            user_phone
            user_active
            user_photo
        }
    }
`;