import React, { Component } from 'react';
import {graphql} from 'react-apollo';

import Contacts from './common/contacts';

import states from '../assets/US_states';

//Mutation
import register from '../mutations/registration';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            firstName: '',
            lastName: '',
            state: 'Arkansas',
            password: '',
            rePassword: '',
            validForm: false,
            errors: {
                passwordMatch: false,
                emailExists: false,
                emptyErrors: {
                    email: false,
                    firstName: false,
                    lastName: false,
                    state: false,
                    password: false,
                    rePassword: false,
                }
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRegistrationSubmit = (e) =>{
        e.preventDefault();

        let validForm = false;
        let passwordMatch = false;

        // Password match validation
        if(this.state.password !== this.state.rePassword) {
            passwordMatch = true;
            validForm = false;
        } else {
            passwordMatch = false;
            validForm = true;
        }

        // Empty field validation
        let emptyErrors = {
            email: false,
            firstName: false,
            lastName: false,
            state: false,
            password: false,
            rePassword: false,
        }

        for(let key in this.state) {
            if(typeof this.state[key] === "string") {
                if(this.state[key] === '') {
                    emptyErrors[key] = true;
                    validForm = false;
                }
            }
        }

        this.setState({
            validForm: validForm,
            errors: {
                passwordMatch: passwordMatch,
                emptyErrors: emptyErrors
            }
        }, this.sendForm);

    }

    sendForm = () => {
        if(this.state.validForm) {
            this.props.mutate({
                variables: {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    state: this.state.state,
                    password: this.state.password,
                    confirmPassword: this.state.rePassword
                }
            })
            .then((response)=>{
                if(response.data.newAccount.result === "0") {
                    throw new Error(response.data.newAccount.error);
                }
                if(response.data.newAccount.result === "1") {
                    this.setState({
                        email: this.props.email,
                        firstName: '',
                        lastName: '',
                        state: 'Arkansas',
                        password: '',
                        rePassword: '',
                        validForm: false,
                        errors: {
                            passwordMatch: false,
                            emailExists: false,
                            emptyErrors: {
                                email: false,
                                firstName: false,
                                lastName: false,
                                state: false,
                                password: false,
                                rePassword: false,
                            }
                        }
                    })
                    this.props.showAccCreatedMessage();
                    this.props.history.push('/login');
                }
            }).catch(err=>{
                let oldState = {...this.state};
                oldState.errors.emailExists = true;
                oldState.validForm = false;
                this.setState(oldState);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="registration">
                    <div className="registration__hero">
                        <div className="wrapper">
                            <h3 className="login__heading heading_1">
                                <span>Create your free account</span>
                            </h3>
                            <div className="login__line line"></div>
                            <div className="login__details">Enter your details below</div>
                        </div>
                    </div>
                    <div className="registration__form">
                        <form onSubmit={this.handleRegistrationSubmit} className="registration__form-container">
                            <div className="registration__email">
                                <label className="label label_registration" htmlFor="email">Email address:</label>
                                <input 
                                    className="input input_registration" 
                                    id="email"
                                    name="email" 
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors.emptyErrors.email && <div className="input__error">This filed is required</div>}
                                {this.state.errors.emailExists && <div className="input__error">User with such email already exists</div>}
                            </div>
                            <div>
                                <label className="label label_registration" htmlFor="firstName">Fisrt Name:</label>
                                <input 
                                    className="input input_registration" 
                                    id="firstName"
                                    name="firstName" 
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors.emptyErrors.firstName && <div className="input__error">This filed is required</div>}
                            </div>
                            <div>
                                <label className="label label_registration" htmlFor="firstName">Last Name:</label>
                                <input 
                                    className="input input_registration" 
                                    id="lastName"
                                    name="lastName" 
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors.emptyErrors.lastName && <div className="input__error">This filed is required</div>}

                            </div>
                            <div>
                                <label className="label label_registration" htmlFor="state">State:</label>
                                <select 
                                    className="input input_registration input_state" 
                                    id="state"
                                    name="state" 
                                    type="text"
                                    value={this.state.state}
                                    onChange={this.handleInputChange}
                                >
                                {Object.values(states).map((state, index) => {
                                    return (
                                        <option key={index} value={state}>{state}</option>
                                    )
                                })}
                                </select>
                            </div>
                            <div>
                                <label className="label label_registration" htmlFor="firstName">Password:</label>
                                <input 
                                    className="input input_registration" 
                                    id="password"
                                    name="password" 
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors.emptyErrors.password && <div className="input__error">This filed is required</div>}
                                {this.state.errors.passwordMatch && <div className="input__error">Passwords dont match!</div>}
                            </div>
                            <div>
                                <label className="label label_registration" htmlFor="firstName">Confirm Password:</label>
                                <input 
                                    className="input input_registration" 
                                    id="rePassword"
                                    name="rePassword" 
                                    type="password"
                                    value={this.state.rePassword}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors.emptyErrors.rePassword && <div className="input__error">This filed is required</div>}
                                {this.state.errors.passwordMatch && <div className="input__error">Passwords dont match!</div>}
                            </div>
                            <input className="login_btn btn_1" type="submit" value="SIGN UP"/>
                        </form>
                    </div>
                </div>
                <Contacts />
            </div>
        )
    }
}

export default graphql(register)(Registration);