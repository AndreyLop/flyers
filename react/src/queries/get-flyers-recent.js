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
                id
            }
    }
    `;