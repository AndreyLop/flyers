import gql from 'graphql-tag';

export const GET_IS_AUTH = gql`
  {
    isAuthorized @client
  }
`;

export const GET_NAME = gql`
{
  name @client
}
`;

export const GET_ID = gql`
{
  id @client
}
`;

export const GET_EMAIL = gql`
{
  email @client
}
`;

export const GET_STATE = gql`
{
  isAuthorized @client
  name @client
  id @client
  email @client
}
`;

export const GET_FLYER_ID = gql`
{
  flyerId @client
}
`;

export const GET_FLYER_INFO = gql`
{
  flyerId @client
  id @client
  flyerName @client
}
`;


export const GET_FLYER_ID_AND_FLYER_IMAGE_NAME = gql`
{
  flyerId @client
  flyerImageName @client
}
`;

export const GET_APP_TEST_STATE = gql`
{
  appTestState @client
}
`;