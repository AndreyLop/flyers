import gql from "graphql-tag";

export default gql`
    query ($accessToken: String!) {
        flyerTemplate(accessToken: $accessToken) {
            id
            template_name
            template_photo
            template_properties
        }
    }
`;