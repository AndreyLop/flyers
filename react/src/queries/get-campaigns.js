import gql from "graphql-tag";

export default gql`
    query ($id: Int!, $accessToken: String!, $sortBy: Int, $searchText: String, $firstEl: Int, $limit: Int) {
        myCampaigns(
            access: { id: $id, accessToken: $accessToken },
            sortBy: $sortBy,
            searchText: $searchText,
            firstEl: $firstEl,
            limit: $limit
        ) {
            id,
            campaign_create,
            campaign_subject,
            sent,
            opened,
            clicks,
            flyer_preview,
            allPosts
        }
    } 
`;