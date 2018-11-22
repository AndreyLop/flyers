import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

//mutation
import changePassword from '../mutations/change-password';

import { tokenControl } from '../assets/js/functions-vars';

class ProfileModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            password: '',
            confirmPassword: '',
            valid: false,
            passwordsDontMatch: false,
            currentPasswordEmpty: false,
            passwordEmpty: false,
            confirmPasswordEmpty: false,
            invalidCurrentPassword: false,
            passwordChangeSuccess: false
        };
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        //basic validation
        // if currentPassword is empty
        let newState = {...this.state}
        if(this.state.currentPassword === '') {
            newState.currentPasswordEmpty = true;
        } else {
            newState.currentPasswordEmpty = false;
        }
        // if password is empty
        if(this.state.password === '') {
            newState.passwordEmpty = true;
        } else {
            newState.passwordEmpty = false;
        }
        // if confirmPasswordEmpty is empty
        if(this.state.confirmPassword === '') {
            newState.confirmPasswordEmpty = true;
        } else {
            newState.confirmPasswordEmpty = false;
        }
        //if passwords dont match
        if(this.state.password !== this.state.confirmPassword) {
            newState.passwordsDontMatch = true;
        } else {
            newState.passwordsDontMatch = false;
        }

        if(newState.currentPasswordEmpty 
            || newState.passwordEmpty
            || newState.confirmPasswordEmpty
            || newState.passwordsDontMatch) {
                newState.valid = false;
        } else {
            newState.valid = true;
        }

        this.setState(state => {
            return {
                ...state,
                ...newState
            }
        }, this.sendMutation) 
    };

    sendMutation = () => {
        
        if(this.state.valid) {
            //sended here
            this.props.mutate({
                variables: {
                    id: this.props.userId,
                    accessToken: tokenControl.getToken(),
                    curentPassword: this.state.currentPassword,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }
            })
            .then(res => {
                if(res.data.changePassword.result === "0") {
                    this.setState({
                        invalidCurrentPassword: true
                    })
                }
                if(res.data.changePassword.result === "true") {
                    this.setState({
                        passwordChangeSuccess: true
                    });
                    setTimeout(this.props.closeModal, 3000);
                }
            })
        }
    }

    render() {

        return (
            <div className="modal">
                <div className="profile-change-password-modal">
                    <h3 className="profile-modal__heading">Change password</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="currentPassword" className="label label_profile-change-password-modal">Current password</label>
                            <input 
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={this.state.currentPassword}
                                onChange={this.handleInputChange}
                                className="input"
                                />
                            {this.state.invalidCurrentPassword && <div className="input__error">Invaid Password</div>}
                            {this.state.currentPasswordEmpty && <div className="input__error">This field is required</div>}
                        </div>
                        <div>
                            <label htmlFor="password" className="label label_profile-change-password-modal">New password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                className="input"
                                />
                            {this.state.passwordEmpty && <div className="input__error">This field is required</div>}
                            {this.state.passwordsDontMatch &&<div className="input__error">Passwords dont match</div>}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="label label_profile-change-password-modal">New password (again)</label>
                            <input 
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChange}
                                className="input"
                                />
                            {this.state.confirmPasswordEmpty && <div className="input__error">This field is required</div>}
                            {this.state.passwordsDontMatch &&<div className="input__error">Passwords dont match</div>}
                        </div>

                        {this.state.passwordChangeSuccess && <div className="profile-modal__change-success">Password was successfully changed</div>}

                        <div className="profile-modal__btns">
                            <button className="btn_3 btn_3_profile-modal btn_3_profile-modal_cancel" onClick={this.props.closeModal} type="button">Cancel</button>
                            <button className="btn_3 btn_3_profile-modal" type="submit">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    };
};

ProfileModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    userId: PropTypes.number
};

export default graphql(changePassword)(ProfileModal);