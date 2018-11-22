import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

// Components
import ProtectedStep from './protected-step';
import Templates from './templates';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import Step5 from './step-5';
import Step6 from './step-6';
import ReadyFlyer from './ready-flyer';
import Loading from '../common/loading';
import NotFound from '../common/404';

//state query
import {GET_FLYER_INFO} from '../../state/queries';

class Flyer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            core: {
                userId: this.props.data.id,
                flyerId: this.props.data.flyerId,
                flyerName: this.props.data.flyerName,
                typ: 0,
            },
            uploadingStep1: false,
            uploadingStep2: false,
            uploadingStep3: false,
            uploadingStep4: false,
            uploadingStep5: false
        }
        
    };

    // sets up flyer id
    setFlyerId = (flyerId) => {
        this.setState(oldState => {
            let {core} = oldState;
            core.flyerId = flyerId;
            return {
                core
            }
        });
    };

    // sets up template id
    setTemplateId = (templateId) => {
        this.setState(oldState => {
            let {core} = oldState;
            core.templateId = templateId;
            return {
                core
            }
        });
    };

    setRealtorImage = (realtorImage) => {
        this.setState({
            realtorImage
        })
    }
    setCompanyImage = (companyImage) => {
        this.setState({
            companyImage
        });
    };

    componentWillReceiveProps(newProps) {
        this.setState(state => {
            const {core} = state;
            core.flyerId = newProps.data.flyerId;
            core.flyerName = newProps.data.flyerName;
            return {
                ...state,
                core
            }
        })
    }

    // Step 1
    uploadingStep1Start = () => {this.setState({uploadingStep1: true});};

    uploadingStep1End = () => {this.setState({uploadingStep1: false});};

    // Step 2
    uploadingStep2Start = () => {this.setState({uploadingStep2: true});};

    uploadingStep2End = () => {this.setState({uploadingStep2: false});};

    // Step 3
    uploadingStep3Start = () => {this.setState({uploadingStep3: true});};
    
    uploadingStep3End = () => {this.setState({uploadingStep3: false});};
    
    // Step 4
    uploadingStep4Start = () => {this.setState({uploadingStep4: true});};

    uploadingStep4End = () => {this.setState({uploadingStep4: false});};

    // Step 5
    uploadingStep5End = () => {this.setState({uploadingStep5: false});};

    uploadingStep5Start = () => {this.setState({uploadingStep5: true});};


    render() {
        return (
            <div className="new-flyer">
                <h1 className="new-flyer__heading">{this.state.core.flyerName || 'New Flyer'}</h1>
                <Switch>
                    <Route
                        exact 
                        path="/dashboard/flyer/" 
                        render={(props)=><Templates 
                                            core={this.state.core}
                                            setFlyerId={this.setFlyerId}
                                            setTemplateId={this.setTemplateId}
                                            {...props}/>}
                        />
                    {/* Step 1 */}
                    <ProtectedStep 
                        path="/dashboard/flyer/step-1"
                        component={this.state.uploadingStep1 ? Loading : Step1}
                        core={this.state.core}
                        uploadingStep1Start={this.uploadingStep1Start}
                        uploadingStep1End={this.uploadingStep1End}
                        />
                    {/* Step 2 */}
                    <ProtectedStep 
                        path="/dashboard/flyer/step-2"
                        component={this.state.uploadingStep2 ? Loading : Step2}
                        core={this.state.core}
                        uploadingStep2Start={this.uploadingStep2Start}
                        uploadingStep2End={this.uploadingStep2End}
                        />
                    {/* Step 3 */}
                    <ProtectedStep 
                        path="/dashboard/flyer/step-3"
                        component={this.state.uploadingStep3 ? Loading : Step3}
                        core={this.state.core}
                        uploadingStep3Start={this.uploadingStep3Start}
                        uploadingStep3End={this.uploadingStep3End}
                        />
                    {/* Step 4 */}
                    <ProtectedStep 
                        path="/dashboard/flyer/step-4"
                        component={this.state.uploadingStep4 ? Loading : Step4}
                        core={this.state.core}
                        uploadingStep4Start={this.uploadingStep4Start}
                        uploadingStep4End={this.uploadingStep4End}
                        />
                    {/* Step 5 */}
                    <ProtectedStep 
                        path="/dashboard/flyer/step-5"
                        component={this.state.uploadingStep4 ? Loading : Step5}
                        core={this.state.core}
                        uploadingStep5Start={this.uploadingStep5Start}
                        uploadingStep5End={this.uploadingStep5End}
                        />
                    {/* Step 6 */}
                    <ProtectedStep 
                        path="/dashboard/flyer/step-6"
                        component={Step6}
                        core={this.state.core}
                        uploadingStep1={this.state.uploadingStep1}
                        uploadingStep2={this.state.uploadingStep2}
                        uploadingStep3={this.state.uploadingStep3}
                        uploadingStep4={this.state.uploadingStep4}
                        uploadingStep5={this.state.uploadingStep5}
                        />
                    {/* Ready flyer can access campaign from it */}
                    <ProtectedStep
                        path="/dashboard/flyer/ready-flyer"
                        component={ReadyFlyer}
                        core={this.state.core}
                        />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

Flyer.proptTypes = {
    data: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })
}

export default graphql(GET_FLYER_INFO)(Flyer);