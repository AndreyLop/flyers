import gql from "graphql-tag";

export default gql`
    query (
        $accessToken: String!, 
        $user: Int!, 
        $resentFlyers: Boolean!, 
        $draftFlyers: Boolean!, 
        $allFlyers: Boolean!, 
        $sortBy: Int!, 
        $searchText: String!,
        $firstEl: Int!, 
        $limit: Int!) {
        flyers(
            accessToken: $accessToken, 
            userId:$user, 
            resentFlyers:$resentFlyers, 
            draftFlyers: $draftFlyers, 
            allFlyers: $allFlyers,
            sortBy: $sortBy,
            searchText: $searchText,
            limit: $limit, 
            firstEl: $firstEl) {
                flyer_preview,
                flyer_name,
                allPosts,
                flyer_status,
                id,
                flyer_create,
                flyer_update,
                development
                emailCamping {
                    id,
                    campaign_create,
                    campaign_subject,
                    status
                }
            }
    }
    `;