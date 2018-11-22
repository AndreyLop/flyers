import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './common/private-route';
import PublicRoute from './common/public-route';

import { graphql } from "react-apollo";


// Components
import Home from './home';
import Header from './common/header';
import Footer from './common/footer';
import Login from './login';
import ForgotPassword from './forgot-password';
import Registration from './registration';
import ChangePassword from './change-password';
import Dashboard from './dashboard';
import Share from './share';
import NotFound from './common/404';



import { SET_STATE } from '../state/mutations';
import LoginByToken from '../mutations/login-by-token';

class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            accountCreated: false
        }
    }

    showAccCreatedMessage = () => this.setState({accountCreated: true});
    hideAccCreatedMessage = () => this.setState({accountCreated: false});

    updateEmail = (email) => {
        this.setState({
            email: email
        })
    }

 

    loginByToken = () => {
        if(localStorage.getItem('accessToken')) {

            const token = localStorage.getItem('accessToken');
            this.props.mutate({
                mutation: LoginByToken,
                variables: {
                    accessToken: token
                }
            })
            .then((response)=>{
                if(response.data.loginByToken.result === "1") {
                    const {id, user_last_name, user_first_name, user_email} = response.data.loginByToken.user;
                    this.props.mutate({
                        mutation: SET_STATE,
                        variables: {
                            name: `${user_first_name} ${user_last_name}`,
                            isAuthorized: true,
                            id: id,
                            email: user_email
                        }
                    });
                }
            })
            .catch(err=>{
            })
        }
    }

    componentWillMount() {
        this.loginByToken();
    }
    
    render() {
        return (
            <div className="app-container">
                <Header updateEmail={this.updateEmail}/>
                <div className="root-page-content">
                <Switch>
                    <PublicRoute exact path="/" component={Home}/>
                    <PublicRoute path="/login" render={props => <Login accCreated={this.state.accountCreated} hideAccCreatedMessage={this.hideAccCreatedMessage} {...props} /> } />
                    <PublicRoute path="/registration" render={props => <Registration email={this.state.email} showAccCreatedMessage={this.showAccCreatedMessage} {...props} /> } />
                    <PublicRoute path="/forgot-password" component={ForgotPassword} />
                    <PublicRoute path="/change-password" component={ChangePassword} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route path="/share" component={Share} />
                    <Route component={NotFound} />
                </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}

export default graphql(LoginByToken)(Root);