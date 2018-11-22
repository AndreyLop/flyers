import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';

import Loading from '../common/loading';
import Progress from './progress';
import Upload from './upload';
import RecentlyMadeFlyers from './recently-made-flyers';
import InputField from './validationInputField';

import states from '../../assets/US_states';

//query
import {getStep5info} from '../../queries/open-flyer';

//mutation
import saveFlyer from '../../mutations/save-flyer';

import {tokenControl, iq7FlyersURL, sendViaAjax } from '../../assets/js/functions-vars';

class Step5 extends Component {

    state ={
        loading: true,
        values: {
            companyName: '',
            companyPhone: '',
            companyFax: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip: '',
        },
        files: [],
        companyPhotoName: [],
        rotationAngles: [0],
        invalidImageDimesnions: [0],
        recentLoaded: false,
        maxCharLength: {}
    }

    dimensions = [
        {
            width: 144,
            height: 151
        }
    ];

    handleInputChange = (e) => {
        this.setValues(e.target.name, e.target.value);
    };

    setValues = (inputName, inputValue) => {
        this.setState(state => {
            let values = state.values;
            values[inputName] = inputValue;
            return {
                ...state,
                values: values
            }
        })
    };

    pushIntoFiles = (file, index) => {
        this.setState(oldState => {
            let files = [...oldState.files];
            files.splice(index, 1, file);
            return {
                files,
                recentLoaded: false
            }
        });
    };

    pushIntoFileNames = (fileName, index) => {
        this.setState(oldState => {
            let companyPhotoName =[...oldState.companyPhotoName];
            companyPhotoName.splice(index, 1, fileName);
            return {
                companyPhotoName,
                recentLoaded: false
            }
        });
    };

    deleteFromFiles = (index) => {
        let files = [...this.state.files];
        files.splice(index, 1, undefined);
        this.setState({
            files,
            recentLoaded: false
        });
    };

    deleteFromFileNames = (index) => {
        let companyPhotoName = [...this.state.companyPhotoName];
        companyPhotoName.splice(index, 1, "");
        this.setState({
            companyPhotoName,
            recentLoaded: false
        });
    };

    editInvalidImageDimesnions = (value, index) => {
        this.setState(state => {
            const invalidImageDimesnions = [...state.invalidImageDimesnions];
            invalidImageDimesnions.splice(index, 1, value);
            return {invalidImageDimesnions}
        })
    };

    fetchInfo = () => {
        this.props.client.query({
            query: getStep5info,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 5,
                accessToken: tokenControl.getToken()
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            const { company_info, company_info_key } = res.data.openFlyer.infoFlyer;
            if(company_info !== null) {
                let newState = {
                    values: {}
                }
                newState.companyPhotoName = [];
                company_info_key.forEach((inputName, i) => {
                    if(inputName === "companyPhotoName") {
                        newState.companyPhotoName.push(company_info[i]);
                    } else if(inputName === "companyPhotoRotationAngle"){
                        newState[inputName] = res.data.openFlyer.infoFlyer.company_info[i] || '';
                    } else {
                        newState.values[inputName] = res.data.openFlyer.infoFlyer.company_info[i] || '';
                    }
                    newState.maxCharLength = JSON.parse(res.data.openFlyer.flyerTemplate.template_inputs).company_info;
                })

                this.setState(oldState => {
                    return {
                        ...newState,
                        loading: false
                    }
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        })
    };

    sendFiles = (files, userId) => {
        let formData = new FormData();
            files.forEach(file=>{
            if(file) {
                formData.append("image " + file, file, this.state.companyPhotoName[0]);
            }
            formData.append("userId", userId)
        });
        return sendViaAjax(formData, `${iq7FlyersURL}/post/uploadfile`);
    };

    sendInfo = () => {
        this.props.uploadingStep5Start();
        let company_info = [];
        let company_info_key = [];
        
        const populateFlyerInfos = (obj, arrVals, arrKeys) => {
            for(let i in obj) {
                arrVals.push(obj[i]);
                arrKeys.push(i);
            }
            arrKeys.push("companyPhotoName");
            arrVals.push(this.state.companyPhotoName[0]);
            arrKeys.push("companyPhotoRotationAngle");
            arrVals.push("0");
        }

        populateFlyerInfos(this.state.values, company_info, company_info_key);

        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 5,
                accessToken: tokenControl.getToken(),
                company_info: company_info,
                company_info_key: company_info_key,
                flyer_error_photo: this.state.invalidImageDimesnions[0]
            }
        })
        .then(()=> {
            return this.sendFiles(this.state.files, this.props.core.userId)
        })
        .then(() => {
            this.props.uploadingStep5End();
        })
        .catch(err => {
            console.log(err);
        });
    };

    componentDidMount() {
        this.fetchInfo();
    }

    refetchDataForStep5 = () => {
        this.setState({loading: true})
        this.fetchInfo();
    }

    render() {
        return (
            this.state.loading ? (
                <Loading />
            ) : (
            <div>
                <Progress
                    sendInfo={this.sendInfo} 
                    step={5}/>
                <div className="wrapper">
                    <div className="step-5_wrapper">
                        <div className="step-5">
                            <div className="step-5__company-photo">
                            {
                                this.state.companyPhotoName.map((image, i) => {
                                    let img_url = `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.core.userId}/${image}`;

                                    return (
                                        <Upload
                                            pathToFile={image === "" ? "" : img_url}
                                            fileName={image}
                                            heading='Company Photo'
                                            key={i}
                                            index={i}
                                            pushIntoFiles={this.pushIntoFiles}
                                            pushIntoFileNames={this.pushIntoFileNames}
                                            deleteFromFiles={this.deleteFromFiles}
                                            deleteFromFileNames={this.deleteFromFileNames}
                                            recentLoaded={this.state.recentLoaded}
                                            editInvalidImageDimesnions={this.editInvalidImageDimesnions}
                                            dimensions={this.dimensions}
                                            checkDimensions={false}
                                        />
                                    ) 
                                })
                            }
                            </div>
                            <div className="step-5__company-info">
                                <div className="step-5__company-info-left">
                                    <InputField 
                                        name="companyName"
                                        label="Company name:"
                                        value={this.state.values.companyName}
                                        setValues={this.setValues}
                                        maxCharLength={this.state.maxCharLength.companyName}
                                    />
                                    <InputField 
                                        name="companyPhone"
                                        label="Company phone:"
                                        value={this.state.values.companyPhone}
                                        setValues={this.setValues}
                                        maxCharLength={this.state.maxCharLength.companyPhone}
                                    />
                                    <InputField 
                                        name="companyFax"
                                        label="Company fax:"
                                        value={this.state.values.companyFax}
                                        setValues={this.setValues}
                                        maxCharLength={this.state.maxCharLength.companyFax}
                                    />
                                    <div>
                                        <label className="label label_step-5">Address:</label>
                                        <InputField 
                                            name="addressLine1"
                                            value={this.state.values.addressLine1}
                                            additionalClass="input_step-5-address-1"
                                            setValues={this.setValues}
                                            maxCharLength={this.state.maxCharLength.addressLine1}
                                        />
                                        <InputField 
                                            name="addressLine2"
                                            value={this.state.values.addressLine2}
                                            setValues={this.setValues}
                                            maxCharLength={this.state.maxCharLength.addressLine2}
                                        />
                                    </div>
                                </div>
                                <div  className="step-5__company-info-right">
                                    <InputField 
                                        name="city"
                                        label="City:"
                                        value={this.state.values.city}
                                        setValues={this.setValues}
                                        maxCharLength={this.state.maxCharLength.city}
                                    />
                                    <div>
                                        <label className="label label_step-5">State:</label>
                                        <select 
                                            className="input input_state" 
                                            id="state"
                                            name="state" 
                                            type="text"
                                            value={this.state.values.state}
                                            onChange={this.handleInputChange}
                                        >
                                        {Object.values(states).map((state, index) => {
                                            return (
                                                <option key={index} value={state}>{state}</option>
                                            )
                                        })}
                                        </select>
                                    </div>
                                    <InputField 
                                        name="zip"
                                        label="ZIP:"
                                        value={this.state.values.zip}
                                        setValues={this.setValues}
                                        maxCharLength={this.state.maxCharLength.zip}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="new-flyer__prev-next-btns">
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-prev" to="/dashboard/flyer/step-4">Previous</Link>
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-cont" to="/dashboard/flyer/step-6">Continue</Link>
                        </div>
                        <RecentlyMadeFlyers
                            step={5} 
                            userId={this.props.core.userId}
                            flyerId={this.props.core.flyerId}
                            refetchFunc={this.refetchDataForStep5}
                            msgText={'the Company info'}
                            btnText={'Copy info'}
                        />
                    </div>
                </div>
            </div>
            )
        )
    }
};


Step5.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
    }),
    uploadingStep5Start: PropTypes.func,
    uploadingStep5End: PropTypes.func
}

export default withApollo(Step5);