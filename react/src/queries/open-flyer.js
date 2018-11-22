import gql from "graphql-tag";

export const getStep1info = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            id
            flyer_photo,
            flyer_photo_key,
            flyer_photo_transform
        }
    }
}
`

export const getStep2info = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            property_info,
            property_info_key
        }
        flyerTemplate{
            template_inputs
        }
    }
}
`

export const getStep3info = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            extra_info,
            extra_info_key
        }
        flyerTemplate{
            template_inputs
        }
    }
}
`

export const getStep4info = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            realtor_info,
            realtor_info_key
        }
        flyerTemplate{
            template_inputs
        }
    }
}
`

export const getStep5info = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            company_info,
            company_info_key
        }
        flyerTemplate{
            template_inputs
        }
    }
}
`
export const getStep6info = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            flyer_name,
            flyer_preview
        },
        errorFlyer 
    }
}
`

export const getReadyFlyer = gql`
query ($id: Int!, $flyer_id: Int!, $typ: Int, $accessToken: String) {
    openFlyer(id: $id, flyer_id: $flyer_id, typ: $typ, accessToken: $accessToken) {
        infoFlyer {
            flyer_name,
            flyer_create,
            flyer_update,
            flyer_preview,
            emailCamping {
                id,
                campaign_create,
                campaign_subject,
                status
            }
        } 
    }
}
`