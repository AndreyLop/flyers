import React from 'react';
import { Route } from 'react-router-dom';
import { graphql } from 'react-apollo';

import {GET_IS_AUTH} from '../../state/queries';

import Authorize from './authorize';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
                render = { props => {
                    return rest.data.isAuthorized ? (
                        <Component {...props} />
                    ) : (
                        <Authorize />
                    )
                }
            }
        />
    )
    
}

export default graphql(GET_IS_AUTH)(PrivateRoute);