import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';

import Loading from '../common/loading';
import Progress from './progress';
import Upload from './upload';
import RecentlyMadeFlyers from './recently-made-flyers';
import InputField from './validationInputField';

//query
import {getStep4info} from '../../queries/open-flyer';

//mutation
import saveFlyer from '../../mutations/save-flyer';

import {tokenControl, iq7FlyersURL, sendViaAjax } from '../../assets/js/functions-vars';

class Step4 extends Component {

    state = {
        loading: true,
        values: {
            realtorName: '',
            realtorSlogan: '',
            realtorPhone: '',
            realtorEmail: '',
            realtorWebsite: '',
        },
        files: [],
        realtorPhotoName: [],
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
            let realtorPhotoName =[...oldState.realtorPhotoName];
            realtorPhotoName.splice(index, 1, fileName);
            return {
                realtorPhotoName,
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
        let realtorPhotoName = [...this.state.realtorPhotoName];
        realtorPhotoName.splice(index, 1, "");
        this.setState({
            realtorPhotoName,
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
            query: getStep4info,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 4,
                accessToken: tokenControl.getToken()
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            const {realtor_info, realtor_info_key } = res.data.openFlyer.infoFlyer;
            if(realtor_info !== null) {
                let newState = {
                    values: {}
                }
                newState.realtorPhotoName = [];
                realtor_info_key.forEach((inputName, i) => {
                    if(inputName === "realtorPhotoName") {
                        newState.realtorPhotoName.push(realtor_info[i]);
                    } else if(inputName === "realtorPhotoRotationAngle"){
                        newState[inputName] = res.data.openFlyer.infoFlyer.realtor_info[i] || '';
                    } else {
                        newState.values[inputName] = res.data.openFlyer.infoFlyer.realtor_info[i] || '';
                    }
                    newState.maxCharLength = JSON.parse(res.data.openFlyer.flyerTemplate.template_inputs).realtor_info;
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
        .catch(err => {
            console.log(err);
        });
    };

    sendFiles = (files, userId) => {
        let formData = new FormData();
        files.forEach(file=>{
            if(file) {
                formData.append("image " + file, file, this.state.realtorPhotoName[0]);
            }
            formData.append("userId", userId)
        });
        return sendViaAjax(formData, `${iq7FlyersURL}/post/uploadfile`);
    };

    sendInfo = () => {
        this.props.uploadingStep4Start();

        let realtor_info = [];
        let realtor_info_key = [];
        
        const populateFlyerInfos = (obj, arrVals, arrKeys) => {
            for(let i in obj) {
                arrVals.push(obj[i]);
                arrKeys.push(i);
            }
            arrKeys.push("realtorPhotoName");
            arrVals.push(this.state.realtorPhotoName[0]);
            arrKeys.push("realtorPhotoRotationAngle");
            arrVals.push("0");
        }
        

        populateFlyerInfos(this.state.values, realtor_info, realtor_info_key);

        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 4,
                accessToken: tokenControl.getToken(),
                realtor_info: realtor_info,
                realtor_info_key: realtor_info_key,
                flyer_error_photo: this.state.invalidImageDimesnions[0]
            }
        })
        .then(()=>{
            return this.sendFiles(this.state.files, this.props.core.userId)
        })
        .then(() => {
            // images uploaded can unlock ui
            this.props.uploadingStep4End();
        })
        .catch(err => {
            console.log(err);
        });
    };

    componentDidMount() {
        this.fetchInfo();
    };

    refetchDataForStep4 = () => {
        this.setState({loading: true})
        this.fetchInfo();
    };

    render() {
        return (
            this.state.loading ? (
                <Loading />
            ) : (
                <div>
                <Progress 
                    sendInfo={this.sendInfo}
                    step={4}/>
                <div className="wrapper">
                    <div className="step-4_wrapper">
                        <div className="step-4">
                            <div className="step-4__realtor-photo">
                            {
                                this.state.realtorPhotoName.map((image, i) => {
                                    let img_url = `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.core.userId}/${image}`;
                                    return (
                                        <Upload
                                            pathToFile={image === "" ? "" : img_url}
                                            fileName={image}
                                            heading='Realtor Photo'
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
                            <div className="step-4__realtor-info">
                                <InputField 
                                    name="realtorName"
                                    label="Realtor name:"
                                    value={this.state.values.realtorName}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.realtorName}
                                />
                                <InputField 
                                    name="realtorSlogan"
                                    label="Realtor slogan:"
                                    value={this.state.values.realtorSlogan}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.realtorSlogan}
                                />
                                <InputField 
                                    name="realtorPhone"
                                    label="Realtor phone:"
                                    value={this.state.values.realtorPhone}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.realtorPhone}
                                />
                                <InputField 
                                    name="realtorEmail"
                                    label="Realtor email:"
                                    value={this.state.values.realtorEmail}
                                    setValues={this.setValues}
                                    maxCharLength={this.state.maxCharLength.realtorEmail}
                                />
                                <InputField 
                                    name="realtorWebsite"
                                    label="Realtor website:"
                                    value={this.state.values.realtorWebsite}
                                    setValues={this.setValues}
                                    maxCharLength={null}
                                />
                            </div>
                        </div>
                        <div className="new-flyer__prev-next-btns">
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-prev" to="/dashboard/flyer/step-3">Previous</Link>
                            <Link onClick={this.sendInfo} className="btn_3 btn_3-cont" to="/dashboard/flyer/step-5">Continue</Link>
                        </div>
                        <RecentlyMadeFlyers
                            step={4} 
                            userId={this.props.core.userId}
                            flyerId={this.props.core.flyerId}
                            refetchFunc={this.refetchDataForStep4}
                            msgText={'the Realtor info'}
                            btnText={'Copy info'}
                        />
                    </div>
                </div>
            </div>
            )
        )
    }
};

Step4.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
    }),
    uploadingStep4End: PropTypes.func,
    uploadingStep4Start: PropTypes.func
}

export default withApollo(Step4);