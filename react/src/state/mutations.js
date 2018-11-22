import gql from 'graphql-tag';

export const SET_IS_AUTH = gql`
    mutation ($isAuthorized: Boolean!) {
        setAuth(isAuthorized: $isAuthorized) @client
    }
`;

export const SET_NAME = gql`
    mutation ($name: String!) {
        setAuth(name: $name) @client
    }
`;

export const SET_ID = gql`
    mutation ($id: String!) {
        setID(id: $id) @client
    }
`;

export const SET_EMAIL = gql`
    mutation ($email: String!) {
        SET_EMAIL(email: $id) @client
    }
`;

export const SET_STATE = gql`
    mutation ($id: String!, $isAuthorized: Boolean!, $name: String!, $email: String!){
        setState(id: $id, isAuthorized: $isAuthorized, name: $name, email: $email) @client
    }
`;

export const SET_FLYER_ID = gql`
    mutation ($flyerId: Int!) {
        setFlyerId(flyerId: $flyerId) @client
    }
`;

export const SET_FLYER_NAME = gql`
    mutation ($flyerName: String!) {
        setFlyerName(flyerName: $flyerName) @client
    }
`

export const SET_FLYER_INFO = gql`
    mutation ($flyerId: Int!, $flyerName: String!) {
        setFlyerInfo(flyerId: $flyerId, flyerName: $flyerName) @client
    }
`


export const SET_FLYER_ID_AND_FLYER_IMAGE_NAME = gql`
    mutation ($flyerId: Int, $flyerImageName: String!) {
        setFlyerIdAndImageName(flyerId: $flyerId, flyerImageName: $flyerImageName) @client
    }
`

export const SET_APP_TEST_STATE = gql`
    mutation ($appTestState: Boolean!){
        setAppTestState(appTestState: $appTestState) @client
    }
`