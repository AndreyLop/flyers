import React from 'react';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

// mutations
import loginMutation from '../mutations/login';
import quickLoginMutation from '../mutations/quick-login';
import {SET_STATE} from '../state/mutations';

import {tokenControl} from '../assets/js/functions-vars';


// Components
import Contacts from '../components/common/contacts';

// Images
import Logo from './common/logo';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            credentialsError: false,
            errors: {
                emptyEmail: false,
                emptyPassword: false,
            }
        };
    }

    handleInputChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    goToDashBoard() {
        this.props.history.push("/dashboard/my-flyers");
    }

    

    // Standard auhtorization
    handleFormSubmit = (e) => {
        e.preventDefault();

        let errors = {
            emptyEmail: false,
            emptyPassword: false,
        }

        if(this.state.email ==='') {
            errors.emptyEmail = true;
        }
        if(this.state.password === '') {
            errors.emptyPassword = true;
        }

        this.setState({
            errors: errors
        }, this.sumbitForm);

    }

    // ordinary quthorization
    sumbitForm = () => {
        if(!this.state.errors.emptyEmail && !this.state.errors.emptyPassword) {
            this.props.mutate({
                mutation: loginMutation,
                variables: {
                    email: this.state.email, 
                    password: this.state.password
                }
            })
            .then((response)=>{
                if(response.data.authorization.result === "0") {
                    throw new Error();
                }

                if(response.data.authorization.result === "1") {
                    const {id, user_email, user_first_name, user_last_name} = response.data.authorization.user;
                    const accessToken = response.data.authorization.accessToken;
                    // Mutate app state
                    this.props.mutate({
                        mutation: SET_STATE,
                        variables: {
                            name: `${user_first_name} ${user_last_name}`,
                            isAuthorized: true,
                            id: id,
                            email: user_email
                        }
                    });
                    return accessToken;
                }
                
            })
            .then((token)=>{
                tokenControl.setToken(token);
                this.props.history.push("/dashboard/my-flyers");
            })
            .catch((err)=>{
                this.setState({
                    credentialsError: true
                });
            });
        }
    }

    // Google authorization
    responseGoogleSucces = (response) =>  {
        this.props.mutate({
            mutation: quickLoginMutation,
            variables: {
                email: response.profileObj.email,
                firstName: response.profileObj.familyName,
                lastName: response.profileObj.givenName
            }
        })
        .then(response => {
            if(response.data.quickAuthorization.result === "1") {
                // Mutate app state
                const {id, user_email, user_first_name, user_last_name} = response.data.quickAuthorization.user;
                const accessToken = response.data.quickAuthorization.accessToken;
                this.props.mutate({
                    mutation: SET_STATE,
                    variables: {
                        name: `${user_first_name} ${user_last_name}`,
                        isAuthorized: true,
                        id: id,
                        email: user_email
                    }
                });
                return accessToken
            }
        })
        .then(token => {
            tokenControl.setToken(token);
            this.props.history.push("/dashboard/my-flyers");
        })
        .catch(error => {
            console.log('Mutation error', error);
        });
    }

    responseGoogleFailure = (response) => {
        console.log('Google failure response', response);
    }

    responseFacebook = (response) => {
        this.props.mutate({
            mutation: quickLoginMutation,
            variables: {
                email: response.email,
                firstName: response.name.split(" ")[1],
                lastName: response.name.split(" ")[0]
            }
        })
        .then(response => {
            if(response.data.quickAuthorization.result === "1") {
                // Mutate app state
                const {id, user_email, user_first_name, user_last_name} = response.data.quickAuthorization.user;
                const accessToken = response.data.quickAuthorization.accessToken;
                this.props.mutate({
                    mutation: SET_STATE,
                    variables: {
                        name: `${user_first_name} ${user_last_name}`,
                        isAuthorized: true,
                        id: id,
                        email: user_email
                    }
                });
                return accessToken;
            }
        })
        .then(token => {
            tokenControl.setToken(token);
            this.props.history.push("/dashboard/my-flyers");
        })
        .catch(error => {
            console.log('Mutation error', error);
        });
    }

    componentDidMount() {
        if(this.props.accCreated === true) {
            setTimeout(()=>{
                this.props.hideAccCreatedMessage();
            }, 2000)
        }
    };

    render() {
        return (
            <div>
                <div className="login">
                    <div className="login__hero">
                        <div className="wrapper">
                            <h3 className="login__heading heading_1">
                                <span>Sign In To</span> <Logo />
                            </h3>
                            <div className="line"></div>
                            <div className="login__details">Enter your details below</div>
                        </div>
                    </div>
                    <div className="login__form">
                        <div className="wrapper">
                            <div className="login__form-wrapper">
                            {this.props.accCreated && <div className="login__account-created">Account created.</div>}
                                <form onSubmit={this.handleFormSubmit}>
                                    <div>
                                        <label className="label label_login" htmlFor="email">Email address:</label>
                                        <input 
                                            className="input input_login" 
                                            id="email"
                                            name="email" 
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                            />
                                        {this.state.credentialsError && <div className="input__error">Invalid login or password</div>}
                                        {this.state.errors.emptyEmail && <div className="input__error">This field is required</div>}
                                    </div>
                                    <div>
                                        <label className="label label_login" htmlFor="password">Password:</label>
                                        <input 
                                            className="input input_login" 
                                            id="password" 
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                            />
                                        {this.state.credentialsError && <div className="input__error">Invalid login or password</div>}
                                        {this.state.errors.emptyPassword && <div className="input__error">This field is required</div>}
                                    </div>
                                    <Link to="/forgot-password" className="login__forgot">Forgot Password?</Link>
                                    <input className="login_btn btn_1" type="submit" value="Log in"/>
                                </form>
                            </div>
                            <div>
                                <div className="login__fast">Or log in fast with:</div>
                                <div className="login__social">
                                    <FacebookLogin 
                                        appId = {`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                                        textButton = "Facebook"
                                        fields="name,email"
                                        cssClass="login__facebook login__social-btn"
                                        callback= {this.responseFacebook}
                                        />
                                    <GoogleLogin
                                        clientId = {`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                                        onSuccess = {this.responseGoogleSucces}
                                        onFailure = {this.responseGoogleFailure}
                                        className = "login__google login__social-btn"
                                        buttonText = "Google"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Contacts />
            </div>
        )
    }
}

Login.propTypes = {
    accCreated: PropTypes.bool
};

export default graphql(loginMutation)(Login);