import gql from "graphql-tag";

export default gql`

    query {
        user(id: 1) {
            id
            name
        }
    }`;