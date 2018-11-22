import React, {Component} from 'react';
import {graphql} from 'react-apollo';

// Components
import Contacts from './common/contacts';

// Mutations
import forgotPassword from '../mutations/forgot-password';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            message: '',
            errors: {
                emptyEmail: false
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Check if email is empty
        if(this.state.email ==='') {
            this.setState({
                errors: {
                    emptyEmail: true
                }
            })
        } else {
            this.props.mutate({
                variables: {
                    email: this.state.email
                }
            })
            .then(response => {
                if(response.data.forgotPassword1.result === "0") {
                    this.setState({
                        message: 'No user with such email'
                    })
                }
                if(response.data.forgotPassword1.result === "1") {
                    this.setState({
                        message: 'Check your email box'
                    })
                }
            })
            .catch(error=>{
                console.log('Forgot password error', error);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="fp">
                    <div className="fp__hero">
                        <div className="wrapper">
                            <h3 className="fp__heading heading_1">
                                <span>Forgot your Password? </span>
                            </h3>
                            <div className="line"></div>
                            <div className="login__details">Enter your email below</div>
                        </div>
                    </div>
                    <div className="fp__form">
                        <div className="fp__message">
                            <p>Enter your sign-in email in the field below and click "Send Link".</p>
                            <p>We will email you a one-time password reset link.</p>
                        </div>
                        <div className="fp__form-wrapper">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label className="label fp__label" htmlFor="email">Email address:</label>
                                    <input 
                                        className="input fp__input" 
                                        id="email"
                                        name="email" 
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                    {this.state.errors.emptyEmail && <div className="input__error">This field is requried</div>}
                                    {this.state.message && <div>{this.state.message}</div>}
                                </div>
                                <input className="login_btn btn_1" type="submit" value="Send link"/>
                            </form>
                        </div>
                    </div>
                </div>
            <Contacts />
            </div>    
        )
    }
}

export default graphql(forgotPassword)(ForgotPassword);