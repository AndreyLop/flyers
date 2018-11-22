import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedStep = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
                render = { props => {
                    return rest.core.flyerId !== null ? (
                        <Component {...props} {...rest} />
                    ) : (
                        <Redirect 
                            to={{
                                pathname: '/dashboard/flyer',
                                state: { from: props.location}
                            }}
                        />
                    )
                }
            }
        />
    )
};

export default ProtectedStep;