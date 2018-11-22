import gql from "graphql-tag";

export default gql`
mutation ($id: Int!, $template_id: Int!, $accessToken: String) {
    newFlyer(id: $id, template_id: $template_id, accessToken: $accessToken) 
}
`;