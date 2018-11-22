import React, {Component} from 'react';
import {graphql} from 'react-apollo';

// Components
import Contacts from './common/contacts';

// mutatuins
import forgotPassword from '../mutations/forgot-password2';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            password: '',
            rePassword: '',
            validForm: false,
            result:'',
            errors: {
                emptyPassword: false,
                emptyRepassword: false,
                passwordsDontMatch: false
            }
        }

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {
            emptyPassword: false,
            emptyRepassword: false,
            passwordsDontMatch: false
        };
        let validForm = false;

        if(this.state.password === '') {
            errors.emptyPassword = true;
        } 
        if(this.state.rePassword === '') {
            errors.emptyRepassword = true;
        }
        if(this.state.password !== this.state.rePassword) {
            errors.passwordsDontMatch = true
        }

        for(let key in errors) {
            if(errors[key]){
                validForm = false;
                break;
            }
            validForm = true;
        }

        this.setState({
            validForm: validForm,
            errors: errors
        }, this.sendForm);

    }

    sendForm = () => {
        if(this.state.validForm) {
            this.props.mutate({
                variables: {
                    key: this.props.location.search.substr(5),
                    password: this.state.password,
                    confirmPassword: this.state.rePassword
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.forgotPassword2.result==="0") {
                    throw new Error()
                }
                if(response.data.forgotPassword2.result==="1") {
                    this.props.history.push('/login');
                }
            })
            .catch(err=>{
                this.setState({
                    result: 'Confirmation code is invalid or out of date'
                })
            });
        }
    }

    render() {
        return (
            <div>
                <div className="fp">
                    <div className="fp__form">
                        <div className="fp__message">
                            <p>Enter your new password</p>
                        </div>
                        <div className="fp__form-wrapper">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label className="label" htmlFor="password">Password:</label>
                                    <input 
                                        className="input fp__input" 
                                        id="password"
                                        name="password" 
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                    {this.state.errors.emptyPassword && <div className="input__error">This field is requried</div>}
                                    {this.state.errors.passwordsDontMatch && <div className="input__error">Passwords dont match</div>}
                                </div>
                                <div>
                                    <label className="label" htmlFor="rePassword">Confirm Password:</label>
                                    <input 
                                        className="input fp__input" 
                                        id="rePassword"
                                        name="rePassword" 
                                        type="password"
                                        value={this.state.rePassword}
                                        onChange={this.handleInputChange} />
                                    {this.state.errors.emptyRepassword && <div className="input__error">This field is requried</div>}
                                    {this.state.errors.passwordsDontMatch && <div className="input__error">Passwords dont match</div>}
                                </div>
                                <input className="login_btn btn_1" type="submit" value="Change Password"/>
                            </form>
                            {this.state.result && <div>{this.state.result}</div>}
                        </div>
                    </div>
                </div>
            <Contacts />
            </div>
        )
    }

}

export default graphql(forgotPassword)(ChangePassword);