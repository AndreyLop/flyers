import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo';
import PropTypes from 'prop-types';

//Components
import ProfileUpload from './profile-upload';
import ProfileModal from './profile-modal';

// query to get user form base
import getProfile from '../queries/get-profile';

// query for state of App
import { GET_ID } from '../state/queries';

//mutation for profile update
import saveProfile from '../mutations/save-profile';

import { tokenControl, getFormattedDate4, iq7FlyersURL } from '../assets/js/functions-vars';

import states from '../assets/US_states';

class Profile extends Component {

    state = {
        modalOpen: false,
        updatedMessage: false,
        userPhotoChanged: false,
        companyLogoChanged: false,
        files: {
            user_photo: null,
            company_logo: null
        },
        inputs: {
            user_first_name: '',
            user_last_name: '',
            slogan: '',
            user_phone: '',
            website: '',
            user_email: '',
            user_registered: '',
            user_last_update: '',
            user_photo: '',
            company_name: '',
            company_logo: '',
            company_phone: '',
            company_fax: '',
            company_adress1: '',
            company_adress2: '',
            company_city: '',
            state: '',
            company_code: '',
        }
    }

    setRealtorPhoto = (file) => {
        this.setState(state => {
            return {
                files: {
                    ...state.files,
                    user_photo: file
                },
                inputs: {
                    ...state.inputs,
                    user_photo: file.name
                },
                userPhotoChanged: true
            }
        });
    }

    setCompanyLogo = (file) => {
        this.setState(state => {
            return {
                files: {
                    ...state.files,
                    company_logo: file
                },
                inputs: {
                    ...state.inputs,
                    company_logo: file.name
                },
                companyLogoChanged: true,
            }
        });
    };

    handleProfileInfoChange = (e) => {
        let inputs = this.state.inputs;
        inputs[e.target.name] = e.target.value;
        this.setState(state => {
            return {
                ...state,
                inputs: {
                    ...inputs
                }
            }
        });
    };

    // sending data to server 
    sendViaAjax = (data, endpoint) => {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', endpoint, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    res(xhr.response);
                } else {
                    rej(xhr.response);
                }
            };
            xhr.send(data);
        });
    };

    sendFiles = () => {
        let formData = new FormData();
        let { user_photo, company_logo } = this.state.files;
        if(user_photo) {
            formData.append("image " + user_photo.name, user_photo);
        }
        if(company_logo) {
            formData.append("image " + company_logo.name, company_logo);
        }
        formData.append("userId", this.state.userId);
        return this.sendViaAjax(formData, `${iq7FlyersURL}/post/uploadfile`);
    };

    // hide profile updated after 2 seconds called in callback
    hideProfileUpdated = () => {
        setTimeout(()=>{
            this.setState({updatedMessage: false});
        }, 2000)
    };

    handleProfileInfoSubmit = (e) => {
        e.preventDefault();
        //send files
        this.sendFiles()
        .then(() => {
            //send muation
            return this.props.mutate({
                variables: {
                    id: this.state.userId,
                    accessToken: tokenControl.getToken(),
                    ...this.state.inputs
                }
            })
        })
        .then(res => {
            //refetch new data
            if(res.data.saveProfile === 1) {
                return this.props.data.refetch();
            }
        })
        .then(() => {
            // update state
            this.setState({
                profileCompletion: this.calculateProfileCompletion(this.state.inputs),
                updatedMessage: true
            }, this.hideProfileUpdated);
        })
        .catch(err => console.log('err',err))
    };

    openModal = () => {
        this.setState({
            modalOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };

    calculateProfileCompletion = (inputs) => {
        let filledInputs = 0;
        const totalInputs = Object.keys(inputs).length;
        for(let key in inputs) {
            if(inputs[key] !== '' && inputs[key] !== null) {
                filledInputs++;
            }
        }
        return Math.floor((filledInputs / totalInputs) * 100);
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.data.loading && this.props.data.loading) {
            let newState = {};
            for(let key in nextProps.data.user) {
                if(nextProps.data.user[key] === null) {
                    newState[key] = '';
                } else {
                    newState[key] = nextProps.data.user[key];
                }
            }

            this.setState(state => {
                return {
                    ...state,
                    userId: this.props.data.variables.id,
                    inputs: {
                        ...newState
                    },
                    profileCompletion: this.calculateProfileCompletion(newState)
                }
            });
        }
    }

    render() {
        return (
            <div className="profile">
            {this.state.modalOpen && <ProfileModal 
                                        userId={this.state.userId}
                                        closeModal={this.closeModal}/>}
                <div className="wrapper">
                    <div className="profile__heading">
                        <h1>Profile</h1>
                        <div className="profile__heading-message">Your profile is {this.state.profileCompletion}% complete</div>
                    </div>
                    <div className="profile__content">
                        {
                            this.state.inputs.user_typ === 0 && (
                                <div className="profile__change-password_wrapper">
                                    <div onClick={this.openModal} className="profile__change-password">
                                        Change password
                                    </div>
                                </div>
                            )
                        }
                        <div className="profile__content_wrapper">
                        <h4 className="profie__sub-heading profie__sub-heading_mobile">Profile Info</h4>
                            <div className="profile__info">
                                <div className="profile__info-left">
                                    <ProfileUpload 
                                        userId={this.state.userId}
                                        uploadId={"userPhoto"}
                                        pathToFile={this.state.inputs.user_photo === "" ? null : `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.state.userId}/${this.state.inputs.user_photo}`}
                                        btnText={'Change photo'}
                                        populateParentState={this.setRealtorPhoto}
                                        changed={this.state.userPhotoChanged}
                                    />
                                    <div className="profile__dates">
                                        <ul>
                                            <li className="profile__dates_label">Member since</li>
                                            <li  className="profile__dates_date">{getFormattedDate4(this.state.inputs.user_registered)}</li>
                                            <li  className="profile__dates_label">Last updated</li>
                                            <li  className="profile__dates_date">
                                                { this.state.inputs.user_last_update ? `on ${getFormattedDate4(this.state.inputs.user_last_update)}` : 'Never' }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="profile__info-inputs">
                                    <h4 className="profie__sub-heading profie__sub-heading_desktop">Profile Info</h4>
                                    <div className="profile__message">
                                        This information will be used to automatically fill realtor information in the flyers you create
                                    </div>
                                    <form onSubmit={this.handleProfileInfoSubmit}>
                                        <div>
                                            <label htmlFor="user_first_name" className="label label_profile">First name</label>
                                            <input 
                                                name="user_first_name" 
                                                type="text"
                                                id="user_first_name" 
                                                value={this.state.inputs.user_first_name} 
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="user_last_name" className="label label_profile">Last name</label>
                                            <input 
                                                name="user_last_name" 
                                                type="text"
                                                id="user_last_name" 
                                                value={this.state.inputs.user_last_name} 
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="slogan" className="label label_profile">Slogan</label>
                                            <input 
                                                name="slogan" 
                                                type="text"
                                                id="slogan" 
                                                value={this.state.inputs.slogan} 
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="user_phone" className="label label_profile">Phone number</label>
                                            <input 
                                                name="user_phone" 
                                                type="text"
                                                id="user_phone" 
                                                value={this.state.inputs.user_phone} 
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="website" className="label label_profile">Website</label>
                                            <input 
                                                name="website" 
                                                type="text"
                                                id="website" 
                                                value={this.state.inputs.website} 
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor="user_email" className="label label_profile">Email</label>
                                            <input 
                                                name="user_email" 
                                                type="text"
                                                id="user_email" 
                                                value={this.state.inputs.user_email} 
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                                />
                                        </div>
                                        <input className="btn_2 btn_2_profile" type="submit" value="save changes"/>
                                    </form>
                                </div>
                            </div>
                            <div className="profile__company-info">
                            <h4 className="profie__sub-heading profie__sub-heading_mobile">Company Info</h4>
                                <div className="profile__info-left">
                                    <ProfileUpload 
                                        userId={this.state.userId}
                                        uploadId={"companyLogo"}
                                        pathToFile={this.state.inputs.company_logo === "" ? null : `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.state.userId}/${this.state.inputs.company_logo}`}
                                        btnText={'Change logo'}
                                        populateParentState={this.setCompanyLogo}
                                        changed={this.state.companyLogoChanged}
                                    />
                                </div>
                                <div className="profile__comapny-inputs">
                                    <h4 className="profie__sub-heading profie__sub-heading_desktop">Company Info</h4>
                                    <div className="profile__message">
                                        This information will be used to automatically fill company information in the flyers you create
                                    </div>
                                    <form onSubmit={this.handleProfileInfoSubmit}>
                                        <div>
                                            <label htmlFor="company_name" className="label label_profile">Company name</label>
                                            <input 
                                                placeholder="Company header"
                                                name="company_name"
                                                id="company_name"
                                                type="text"
                                                value={this.state.inputs.company_name}
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                            />
                                        </div>
                                        <div className="profile__phone-and-fax">
                                            <div>
                                                <label htmlFor="company_phone" className="label label_profile">Phone number</label>
                                                <input 
                                                    placeholder="Company phone"
                                                    name="company_phone"
                                                    id="company_phone"
                                                    type="text"
                                                    value={this.state.inputs.company_phone}
                                                    onChange={this.handleProfileInfoChange}
                                                    className="input profile__input"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="company_fax" className="label label_profile">Fax number</label>
                                                <input 
                                                    placeholder="Comapny fax"
                                                    name="company_fax"
                                                    id="company_fax"
                                                    type="text"
                                                    value={this.state.inputs.company_fax}
                                                    onChange={this.handleProfileInfoChange}
                                                    className="input profile__input"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="company_adress1" className="label label_profile">Address line 1</label>
                                            <input 
                                                name="company_adress1"
                                                id="company_adress1"
                                                type="text"
                                                value={this.state.inputs.company_adress1}
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company_adress2" className="label label_profile">Address line 2</label>
                                            <input 
                                                name="company_adress2"
                                                id="company_adress2"
                                                type="text"
                                                value={this.state.inputs.company_adress2}
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company_city" className="label label_profile">City</label>
                                            <input 
                                                placeholder="City"
                                                name="company_city"
                                                id="company_city"
                                                type="text"
                                                value={this.state.inputs.company_city}
                                                onChange={this.handleProfileInfoChange}
                                                className="input profile__input"
                                            />
                                        </div>
                                        <div className="profile__state-and-zip">
                                            <div className="profile__input_state">
                                                <label className="label label_profile" htmlFor="state">State</label>
                                                <select 
                                                    className="input profile__input input_state" 
                                                    id="state"
                                                    name="state" 
                                                    type="text"
                                                    value={this.state.inputs.state}
                                                    onChange={this.handleProfileInfoChange}
                                                >
                                                {Object.values(states).map((state, index) => {
                                                    return (
                                                        <option key={index} value={state}>{state}</option>
                                                    )
                                                })}
                                                </select>
                                            </div>
                                            <div className="profile__input_zip">
                                                <label htmlFor="company_code" className="label label_profile">ZIP Code</label>
                                                <input 
                                                    placeholder="ZIP"
                                                    name="company_code"
                                                    id="company_code"
                                                    type="text"
                                                    value={this.state.inputs.company_code}
                                                    onChange={this.handleProfileInfoChange}
                                                    className="input profile__input"
                                                />
                                            </div>
                                        </div>
                                        <input className="btn_2 btn_2_profile" type="submit" value="save changes"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="profile__updated" style={{opacity: this.state.updatedMessage ? '1' : '0'}}>Profile updated</div>
                    </div>
                </div>
            </div>
        )
    }
};

PropTypes.propTypes = {
    data: PropTypes.shape({
        user: PropTypes.shape({
            company_adress1: PropTypes.string,
            company_adress2: PropTypes.string,
            company_city: PropTypes.string,
            company_code: PropTypes.string,
            company_fax: PropTypes.string,
            company_logo: PropTypes.string,
            company_name: PropTypes.string,
            company_phone: PropTypes.string,
            slogan: PropTypes.string,
            state: PropTypes.string,
            user_email: PropTypes.string,
            user_first_name: PropTypes.string,
            user_last_name: PropTypes.string,
            user_last_update: PropTypes.string,
            user_phone: PropTypes.string,
            user_photo: PropTypes.string,
            user_registered: PropTypes.string,
            user_typ: PropTypes.number,
            website: PropTypes.string
        })
    })
};

export default compose(
    graphql(GET_ID),
    graphql(getProfile, {
        options: (props) => {
            return {
                variables: {
                    id: Number(props.data.id),
                    accessToken: tokenControl.getToken()
                },
                fetchPolicy: 'network-only'
            }
        }
    }),
    graphql(saveProfile),
)(Profile);