import gql from "graphql-tag";

export default gql`
mutation ($id: Int!, $flyer_id: Int!, $accessToken: String) {
    deleteFlyer(access:{id: $id, accessToken: $accessToken} flyer_id: $flyer_id)
}`