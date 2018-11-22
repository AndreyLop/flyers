import gql from "graphql-tag";

export default gql`
query ($id: Int!, $accessToken: String!) {
    user(id: $id, accessToken: $accessToken) {
        user_first_name,
        user_last_name,
        slogan,
        user_phone,
        website,
        user_email,
        user_photo,
        user_registered,
        user_last_update,
        company_name,
        company_phone,
        company_logo,
        company_fax,
        company_adress1,
        company_adress2,
        company_city,
        company_code,
        state,
        user_typ
    }
}
`;