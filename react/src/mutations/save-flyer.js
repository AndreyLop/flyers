import gql from "graphql-tag";

export default gql`
mutation (
    $id: Int!, 
    $flyer_id: Int!, 
    $typ: Int, 
    $accessToken: String,
    $flyer_name: String, 
    $flyer_photo: [String],
    $flyer_photo_key: [String],
    $flyer_photo_transform: [String],
    $flyer_photo_transform_key: [String],
    $property_info: [String],
    $property_info_key: [String],
    $extra_info: [String],
    $extra_info_key: [String],
    $realtor_info: [String],
    $realtor_info_key: [String], 
    $company_info: [String],
    $company_info_key: [String],
    $company_error_photo: Int,
    $realtor_error_photo: Int,
    $flyer_error_photo: [Int]) {
        saveFlyer(
            id: $id,
            flyer_id: $flyer_id,
            typ: $typ,
            accessToken: $accessToken,
            flyer_name: $flyer_name,
            flyer_photo: $flyer_photo,
            flyer_photo_key: $flyer_photo_key,
            flyer_photo_transform: $flyer_photo_transform,
            flyer_photo_transform_key: $flyer_photo_transform_key,
            property_info: $property_info,
            property_info_key: $property_info_key,
            extra_info: $extra_info,
            extra_info_key: $extra_info_key,
            realtor_info: $realtor_info,
            realtor_info_key: $realtor_info_key,
            company_info: $company_info,
            company_info_key: $company_info_key,
            company_error_photo: $company_error_photo,
            realtor_error_photo: $realtor_error_photo,
            flyer_error_photo: $flyer_error_photo
        )
    }
`;