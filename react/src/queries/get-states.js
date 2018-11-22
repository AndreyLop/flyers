import gql from "graphql-tag";

export default gql`
    query ($id: Int!, $accessToken: String, $state: Int){
        state(access:{id: $id, accessToken: $accessToken}, state: $state) {
            id,
            state,
            region_list {
                region_name,
                distribution_list {
                    price
                    distribution_id,
                    distribution
                }
            }
        }
    }
`;