import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';

// Components
import Progress from './progress';
import Loading from '../common/loading';
import Step6Errors from './step-6-errors';
import Step6WarningsModal from './step-6-warnings-modal';
import Step6FinalizeModal from './step-6-finalize-modal';
import Step6EmailModal from './step-6-email-modal';

// Mutations
import saveFlyer from '../../mutations/save-flyer';

import { getFormattedDate1, tokenControl, iq7FlyersURL } from '../../assets/js/functions-vars';

//query
import { getStep6info } from '../../queries/open-flyer';

// State mutation
import { SET_FLYER_NAME } from '../../state/mutations';

class Step6 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flyerName: '',
            flyerPreview: '',
            modalOpen: {
                warnings: false,
                finalize: false,
                email: false
            },
            valid: {
                noErrors: false,
                noWarnings: false
            },
            loading: true,
            errors: [],
            warnings: []
        }
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    checkForWarningsAndErrors = () => {
        let valid = {
            noErrors: false,
            noWarnings: false
        }

        if(this.state.warnings.length === 0) {
            valid.noWarnings = true;
        } else {
            valid.noWarnings = false;
        }

        if(this.state.errors.length === 0) {
            valid.noErrors = true;
        } else {
            valid.noErrors = false;
        }
        this.setState({
            valid: valid
        });
    }

    finalize = () => {
        if(this.state.valid.noErrors && !this.state.loading) {
            if(this.state.valid.noWarnings) {
                // Show finalize modal move user further
                this.openFinalizationModal();
            } else {
                // Show warnings modal
                this.openWarningsModal();
            }
        }
    };

    openFinalizationModal = () => {
        let {modalOpen} = this.state;
        modalOpen.finalize = true;
        this.setState({
            modalOpen
        });
    };

    toggleEmailModal = () => {
        this.setState(state => {
            let modalOpen = state.modalOpen;
            modalOpen.email = !state.modalOpen.email;
            return {
                modalOpen
            }
        })
    };

    closeFinalizationModal = () => {
        let {modalOpen} = this.state;
        modalOpen.finalize = false;
        this.setState({
            modalOpen
        });
    };

    openWarningsModal = () => {
        let {modalOpen} = this.state;
        modalOpen.warnings = true;
        this.setState({
            modalOpen
        });
    };

    closeWarningsModal = () => {
        let {modalOpen} = this.state;
        modalOpen.warnings = false;
        this.setState({
            modalOpen
        });
    };

    fetchInfo = (passProps) => {
        if(!passProps.uploadingStep1
        && !passProps.uploadingStep2
        && !passProps.uploadingStep3
        && !passProps.uploadingStep4
        && !passProps.uploadingStep5) {
                this.props.client.query({
                    query: getStep6info,
                    variables: {
                        id: Number(this.props.core.userId),
                        flyer_id: this.props.core.flyerId,
                        typ: 6,
                        accessToken: tokenControl.getToken()
                    },
                    fetchPolicy: 'network-only'
                })
                .then(res => {
                    let errorsWarnings = JSON.parse(res.data.openFlyer.errorFlyer);
                    let newState = {
                        flyerName: res.data.openFlyer.infoFlyer.flyer_name || `New Flyer ${getFormattedDate1(Date.now())}`,
                        flyerPreview: errorsWarnings.img,
                        errors: [],
                        warnings: [],
                        loading: false
                    }
                    if(errorsWarnings.errors.length !== 0) {
                        newState.errors = [...errorsWarnings.errors]
                    }
                    if(errorsWarnings.warnings.length !== 0) {
                       errorsWarnings.warnings.forEach(warning => {
                            if(warning.key !== "realtorPhotoRotationAngle" && warning.key !== "companyPhotoRotationAngle") {
                                newState.warnings.push(warning);
                            }
                        });
                    }
                    this.setState(oldState => {
                        return {
                            ...oldState,
                            ...newState
                        }
                    }, this.checkForWarningsAndErrors);
                })
                .catch(err=> {
                    console.log(err)
                })
        }
    };

    sendInfo = () => {
        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 6,
                accessToken: tokenControl.getToken(),
                flyer_name: this.state.flyerName
            }
        })
        .then(()=>{
            this.props.client.mutate({
                mutation: SET_FLYER_NAME,
                variables: {
                    flyerName: this.state.flyerName
                }
            })
        });
    };

    componentWillMount() {
        this.fetchInfo(this.props);
    };

    componentWillReceiveProps(nextProps) {
        if((this.props.uploadingStep1 !== nextProps.uploadingStep1) 
        || (this.props.uploadingStep2 !== nextProps.uploadingStep2)
        || (this.props.uploadingStep3 !== nextProps.uploadingStep3)
        || (this.props.uploadingStep4 !== nextProps.uploadingStep4)
        || (this.props.uploadingStep5 !== nextProps.uploadingStep5)) {
            this.fetchInfo(nextProps);
        }
    }

    render() {
        return (
            <div>
                <Progress 
                    sendInfo={this.sendInfo}
                    step={6} />
                <div className="wrapper">
                    <div className="step-6_wrapper">
                        <div className="step-6">
                            <div>
                                <form onSubmit={this.handleSubmit}>
                                    <label className="label label_step-6">Give a name to this flyer:</label>
                                    <div className="step-6__message">The flyer name will not part of the actual flyer content, but rather a meaningful name you can later refer to (such as property address).</div>
                                    <input
                                        className="input input_step-6" 
                                        type="text" 
                                        name="flyerName" 
                                        value={this.state.flyerName} 
                                        onChange={this.handleInputChange} />
                                </form>
                            </div>

                            {
                                this.state.loading ? (
                                    <div className="step-6__preview">
                                        <div className="step-6__loading">
                                            <Loading />
                                        </div>
                                        <div className="step-6__message">
                                            <p>Generating preview (it may take up to a minute, depending on the size of your uploaded images).</p>
                                            <p>Please wait while preview is generated and the flyer is being validated.</p>
                                            <p>Validation results will show up here once the preview is generated.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <span className="label">Flyer preview:</span>
                                            <div className="step-6__preivew-click-msg">Click on the preview to see it in full size (as it would show in an email or on a website)</div>
                                        </div>
                                        <div className="step-6__result">
                                            <div onClick={this.toggleEmailModal} className="step-6__flyer-image">
                                                <img src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.core.userId}/template/${this.state.flyerPreview}`} alt="Flyer Preview"/>
                                            </div>
                                            <div className="step-6__errors-container">
                                                { !this.state.valid.noErrors && <Step6Errors
                                                                                        messageText={'The flyer appears to have some errors, and can not be finalized until these are resolved:'} 
                                                                                        errors={this.state.errors} 
                                                                                        errorsStyleClass={"step-6__errors"}/>}
                                                { !this.state.valid.noWarnings && <Step6Errors
                                                                                        messageText={'The flyer appears to have some issues. You can still finalize the flyer with theese issues undersolved, but please check the previw thorougly:'} 
                                                                                        errors={this.state.warnings} 
                                                                                        errorsStyleClass={"step-6__errors step-6__warnings"}/>}

                                                { this.state.modalOpen.warnings && <Step6WarningsModal
                                                                                        flyerName={this.state.flyerName} 
                                                                                        closeWarningsModal={this.closeWarningsModal} 
                                                                                        openFinalizationModal={this.openFinalizationModal} />}
                                                { this.state.modalOpen.finalize && <Step6FinalizeModal 
                                                                                        flyerName={this.state.flyerName}
                                                                                        core={this.props.core}
                                                                                        closeFinalizationModal={this.closeFinalizationModal}/>}
                                                { this.state.modalOpen.email && <Step6EmailModal
                                                                                         close={this.toggleEmailModal}
                                                                                         flyerPreview={this.state.flyerPreview}
                                                                                         userId={this.props.core.userId}/>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        <div className="new-flyer__prev-next-btns">
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-prev" to="/dashboard/flyer/step-5">Previous</Link>
                            {!this.state.loading && <span className={this.state.valid.noErrors ? 'btn_3' : `btn_3 btn_3_inactive` } onClick={this.finalize} >Finalize</span>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

Step6.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
    }),
    uploadingStep1: PropTypes.bool.isRequired,
    uploadingStep2: PropTypes.bool.isRequired,
    uploadingStep3: PropTypes.bool.isRequired,
    uploadingStep4: PropTypes.bool.isRequired,
    uploadingStep5: PropTypes.bool.isRequired
}

export default withApollo(Step6);