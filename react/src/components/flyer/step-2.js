import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

//components
import Progress from './progress';
import Loading from '../common/loading';
import RecentlyMadeFlyers from './recently-made-flyers';

import InputField from './validationInputField';

//mutation
import saveFlyer from '../../mutations/save-flyer';

// query
import {getStep2info} from '../../queries/open-flyer';

import states from '../../assets/US_states';
import {tokenControl} from '../../assets/js/functions-vars';


class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            values: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip: '',
                price: '',
                mlsNumber: '',
                website: ''
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

    fetchInfo = () => {
        this.props.client.query({
            query: getStep2info,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 2,
                accessToken: tokenControl.getToken()
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            if(res.data.openFlyer.infoFlyer.property_info !== null) {
                let values = {}
                let maxCharLength = JSON.parse(res.data.openFlyer.flyerTemplate.template_inputs); 
                res.data.openFlyer.infoFlyer.property_info_key.forEach((inputName, i) => {
                    values[inputName] = res.data.openFlyer.infoFlyer.property_info[i]
                })
                this.setState(oldState => {
                    return {
                        values: {...values},
                        maxCharLength: {...maxCharLength.property_info},
                        loading: false
                    }
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    sendInfo = () => {
        this.props.uploadingStep2Start();
        let property_info = [];
        let property_info_key = [];
        
        const populateFlyerInfos = (obj, arrVals, arrKeys) => {
            for(let i in obj) {
                if(i !== 'loading') {
                    arrVals.push(obj[i]);
                    arrKeys.push(i);
                }
            }
        }

        populateFlyerInfos(this.state.values, property_info, property_info_key);

        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 2,
                accessToken: tokenControl.getToken(),
                property_info: property_info,
                property_info_key: property_info_key
            }
        })
        .then(()=>{
            this.props.uploadingStep2End();
        })
        .catch(err=>{
            console.log(err);
        });
    }

    componentDidMount() {
        this.fetchInfo();
    }


    refetchDataForStep2 = () => {
        this.setState({loading: true});
        this.fetchInfo();
    }



    render() {
        return (
            this.state.loading ? 
            (
                <Loading />
            ) : (
                <div>
                <Progress 
                    sendInfo={this.sendInfo}
                    step={2}/>
                <div className="wrapper step-2__wrapper"> 
                    <div className="step-2__inputs">
                        <div className="step-2__inputs_left">
                            <label className="label">Address:</label>
                            <InputField
                                    placeholder="Address line 1"
                                    name="addressLine1"
                                    additionalClass="input_step-2-adress-line-1"
                                    value={this.state.values.addressLine1}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.addressLine1} />
                            <InputField
                                    placeholder="Address line 2"
                                    name="addressLine2"
                                    value={this.state.values.addressLine2}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.addressLine2} />
                            <InputField 
                                    name="city"
                                    label="City"
                                    value={this.state.values.city}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.city} />
                            <div>
                                <label className="label" htmlFor="state">State:</label>
                                <select 
                                    className="input input_state input_state-step-2"  
                                    id="state"
                                    name="state" 
                                    type="text"
                                    value={this.state.values.state}
                                    onChange={this.handleInputChange}
                                    >
                                    <option key={0} value=''>Select State</option>
                                    {Object.values(states).map((state, index) => {
                                        return (
                                            <option key={index + 1} value={state}>{state}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <InputField 
                                    name="zip"
                                    label="Zip"
                                    value={this.state.values.zip}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.zip} />
                        </div>
                        <div className="step-2__inputs_right">
                            <InputField 
                                name="price"
                                label="Price"
                                value={this.state.values.price}
                                setValues={this.setValues}
                                maxCharLength={this.state.maxCharLength.price} />
                            <InputField 
                                name="mlsNumber"
                                label="MLS Number:"
                                additionalMessage="Leave empty if the property is not listed"
                                value={this.state.values.mlsNumber}
                                setValues={this.setValues}
                                maxCharLength={this.state.maxCharLength.mlsNumber} />
                            <InputField 
                                name="website"
                                label="Property website/virtual tour:"
                                value={this.state.values.website}
                                setValues={this.setValues}
                                maxCharLength={this.state.maxCharLength.website} />
                        </div>
                    </div>
                    <div className="new-flyer__prev-next-btns">
                        <Link onClick={this.sendInfo} className="btn_3 btn_3-prev" to="/dashboard/flyer/step-1">Previous</Link>
                        <Link onClick={this.sendInfo} className="btn_3 btn_3-cont" to="/dashboard/flyer/step-3">Continue</Link>
                    </div>
                    <RecentlyMadeFlyers
                        step={2} 
                        userId={this.props.core.userId}
                        flyerId={this.props.core.flyerId}
                        refetchFunc={this.refetchDataForStep2}
                        msgText={'the property info'}
                        btnText={'Copy info'}
                    />
                </div>
            </div>
            )
        )
    }
};

Step2.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired
    }),
    uploadingStep2Start: PropTypes.func,
    uploadingStep2End: PropTypes.func
}

export default withApollo(Step2);