import gql from "graphql-tag";

export default gql`
    query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
        openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
            flyerTemplate {
                template_name
                template_photo
                template_properties
                id
            }
        }
    }
`;