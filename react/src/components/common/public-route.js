import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import {GET_IS_AUTH} from '../../state/queries';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest }
                render = { props => {
                    return !rest.data.isAuthorized ? (
                        rest.render ? (
                            rest.render({...props})
                        ) : (
                            <Component {...props} />
                        )
                    ) : (
                        <Redirect to={ { pathname: '/dashboard/my-flyers', state: { from: props.location} } } />
                    )
                }
            }
        />
    )
}

export default graphql(GET_IS_AUTH)(PublicRoute);