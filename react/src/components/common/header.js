import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Logo from './logo';
// Images
import closeIcon from '../../assets/img/header/close.png';

// Queries
import {SET_STATE} from '../../state/mutations';
import {GET_STATE} from '../../state/queries';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }


    detectpath = () => {
        const commonMakrup = (
            <span>
                <input className="input input_header" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter your email here" type="text"/>
                <input className="header__button" onClick={this.handleEmailSubmit} type="button" value="Get started" />
            </span>
        )
        switch(this.props.location.pathname) {
            case '/login':
                return (
                    <div>
                        {commonMakrup}
                        <Link className="header__close-login" to="/"><img src={closeIcon} alt="Close icon" /></Link>
                    </div>
                )
            case '/registration':
                return (
                        <div>
                            <span>Already have an account?</span>
                            <Link className="header__login-btn" to="/login">Log in</Link>
                            <Link className="header__close-login" to="/"><img src={closeIcon} alt="Close icon" /></Link>
                        </div>
                    )
            default:
                return (
                    <div>
                        {commonMakrup}
                        <Link to="/login">Sign In</Link>
                    </div>
                )
        }
    }

    handleLogout = () => {
        this.props.mutate({
            mutation: SET_STATE,
            variables: {
                isAuthorized: false,
                name: '',
                id:'',
                email: ''
            }
        })
        .then(()=>{
            localStorage.setItem('accessToken', '');
            this.props.history.push("/login");
        });
        
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        }, () => {
            this.props.updateEmail(this.state.email);
        });
    };

    handleEmailSubmit = () => {
        this.props.history.push('/registration');
    }

    render() {
        const { name } = this.props.data;
        return (
            <header>
                <div className="header wrapper">

                    <div className="header__logo">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    {
                        name === '' ? (
                            <div className="header__login">
                                {this.detectpath()}
                            </div>
                        ) : (
                            <div className="header__login">
                                <Link className="header__profile-name" to='/dashboard/profile/' >{name}</Link> 
                                <span className="header__logout" onClick={this.handleLogout}>
                                    Log Out
                                    <span className="header__logout-arrow"></span>
                                </span>
                            </div>
                        )
                    }
                </div>
            </header>
        );
    }

};

Header.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
        name: PropTypes.string
    })
}

export default graphql(SET_STATE)(graphql(GET_STATE)(withRouter(Header)));