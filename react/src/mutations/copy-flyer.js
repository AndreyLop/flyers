import gql from "graphql-tag";

export default gql`
mutation ($id: Int!, $accessToken: String, $flyer_id: Int!, $copy_flyer_id: Int!) {
    copyFlyer(
            access: {
                id: $id,
                accessToken: $accessToken
            },
            flyer_id: $flyer_id,
            copy_flyer_id: $copy_flyer_id
    )
}
`