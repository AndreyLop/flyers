import gql from "graphql-tag";

export default gql`
mutation (
    $id: Int!,
    $accessToken: String!,
    $user_first_name: String,
    $user_last_name: String,
    $user_email: String,
    $user_phone: String,
    $user_photo: String,
    $website: String,
    $slogan: String,
    $state: String,
    $company_name: String,
    $company_logo: String,
    $company_phone: String,
    $company_fax: String,
    $company_adress1: String,
    $company_adress2: String,
    $company_city: String,
    $company_code: String) {
    saveProfile(
        access: {
                    id: $id,
                    accessToken: $accessToken 
                },
        profile: {
                    user_first_name: $user_first_name,
                    user_last_name: $user_last_name,
                    user_email: $user_email,
                    user_phone: $user_phone,
                    user_photo: $user_photo,
                    website: $website,
                    slogan: $slogan,
                    company_name: $company_name,
                    company_logo: $company_logo,
                    company_phone: $company_phone,
                    company_fax: $company_fax,
                    company_adress1: $company_adress1,
                    company_adress2: $company_adress2,
                    company_city: $company_city,
                    company_code: $company_code,
                    state: $state
                }
        )
    }
`;