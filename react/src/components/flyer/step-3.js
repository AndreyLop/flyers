import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';

//components
import Loading from '../common/loading';
import Progress from './progress';
import RecentlyMadeFlyers from './recently-made-flyers';
import InputField from './validationInputField';
import TextField from './validationTextArea';

//query
import {getStep3info} from '../../queries/open-flyer';

//mutation
import saveFlyer from '../../mutations/save-flyer';

import {tokenControl} from '../../assets/js/functions-vars';


class Step3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            values: {
                headline: '',
                content: ''
            },
            maxCharLength: {}
        }
    }

    handleInputChange = (e) => {
        this.setValues(e.target.name, e.target.value);
    }

    setValues = (inputName, inputValue) => {
        this.setState(state => {
            let values = state.values;
            values[inputName] = inputValue;
            return {
                ...state,
                values: values
            }
        })
    }


    componentDidMount() {
        this.fetchInfo();
    }

    refetchDataForStep3 = () => {
        this.setState({loading: false});
        this.fetchInfo();
    }

    fetchInfo = () => {
        this.props.client.query({
            query: getStep3info,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 3,
                accessToken: tokenControl.getToken()
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            if(res.data.openFlyer.infoFlyer.extra_info !== null) {
                let values = {}
                let maxCharLength = JSON.parse(res.data.openFlyer.flyerTemplate.template_inputs); 
                res.data.openFlyer.infoFlyer.extra_info_key.forEach((inputName, i) => {
                    values[inputName] = res.data.openFlyer.infoFlyer.extra_info[i]
                })
                this.setState(oldState => {
                    return {
                        values: {...values},
                        maxCharLength: maxCharLength.extra_info,
                        loading: false
                    }
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        });
    }

    sendInfo = () => {
        this.props.uploadingStep3Start();
        let extra_info = [];
        let extra_info_key = [];
        
        const populateFlyerInfos = (obj, arrVals, arrKeys) => {
            for(let i in obj) {
                if(i !== 'loading') {
                    arrVals.push(obj[i]);
                    arrKeys.push(i);
                }  
            }
        }

        populateFlyerInfos(this.state.values, extra_info, extra_info_key);

        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 3,
                accessToken: tokenControl.getToken(),
                extra_info: extra_info,
                extra_info_key: extra_info_key
            }
        })
        .then(()=>{
            this.props.uploadingStep3End();
        })
        .catch(err=>{
            console.log(err);
        });
    }

    render() {
        return (
            this.state.loading ? (
                <Loading />
            ) : (
                <div>
                    <Progress
                        sendInfo={this.sendInfo}
                        step={3} />
                    <div className="wrapper step-3__wrapper">
                        <div className="step-3">
                            <InputField
                                    placeholder="This is flyers main headline"
                                    name="headline"
                                    label="Headline"
                                    additionalMessage="This is the flyers main headline"
                                    value={this.state.values.headline}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.headline} />

                            <div className="step-3__message step-3__message_content">This template provides space for an additional text block (for example, property description and features).</div>
                            <TextField
                                    name="content"
                                    label="Content - text block:"
                                    value={this.state.values.content}
                                    additionalClass="step-3__content-input"
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.content} />
                        </div>
                        <div className="new-flyer__prev-next-btns">
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-prev" to="/dashboard/flyer/step-2">Previous</Link>
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-cont" to="/dashboard/flyer/step-4">Continue</Link>
                        </div>
                        <RecentlyMadeFlyers
                            step={3} 
                            userId={this.props.core.userId}
                            flyerId={this.props.core.flyerId}
                            refetchFunc={this.refetchDataForStep3}
                            msgText={'the extra info'}
                            btnText={'Copy info'}
                        />
                    </div>
                </div>  
            )
        )
    }
};

Step3.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired
    }),
    uploadingStep3Start: PropTypes.func,
    uploadingStep3End: PropTypes.func
}

export default withApollo(Step3);