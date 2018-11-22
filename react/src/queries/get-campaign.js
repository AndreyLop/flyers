import gql from "graphql-tag";

export default gql`
query ($id: Int!, $accessToken: String!, $campaign_id: Int!) {
    reportCampaign(access:{id:$id, accessToken: $accessToken}, campaign_id: $campaign_id){
        opened
        campaign_subject
        campaign_name
        campaign_list
        flyer_preview
        sent_date
        sent
        opened
        clicks,
        transaction
    }
}`;