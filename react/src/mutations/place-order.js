import gql from "graphql-tag";

export default gql`
    mutation (
        $id: Int!, 
        $accessToken: String, 
        $campaign_name: String, 
        $campaign_subject: String, 
        $campaign_send_date: String, 
        $campaign_price: String, 
        $campaign_list: [Int], 
        $flyer_id: Int!,
        $card: String!,
        $cvv2: String!,
        $expdate: String!,
        $creditcardtype: String!,
        $zip_code: String!
        ) {
            placeOrder(
                access:{id: $id, accessToken: $accessToken}, 
                campaign: {
                    campaign_name: $campaign_name, 
                    campaign_subject: $campaign_subject, 
                    campaign_send_date: $campaign_send_date, 
                    campaign_price: $campaign_price, 
                    campaign_list: $campaign_list, 
                    flyer_id: $flyer_id
                },
                payments: {
                    card: $card,
                    cvv2: $cvv2,
                    expdate: $expdate,
                    creditcardtype: $creditcardtype,
                    zip_code: $zip_code
                }
            )
    }`;