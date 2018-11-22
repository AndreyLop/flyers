import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import {tokenControl, iq7FlyersURL, sendViaAjax } from '../../assets/js/functions-vars';
import PropTypes from 'prop-types';

//components
import Progress from './progress';
import Loading from '../common/loading';
import Upload from './upload';
import RecentlyMadeFlyers from './recently-made-flyers';

//query
import { getStep1info } from '../../queries/open-flyer';

//mutation
import saveFlyer from '../../mutations/save-flyer';

//images
import tempalte_layout from '../../assets/img/flyers/template_layout.png';

class Step1 extends Component {


    state = {
        files: [],
        fileNames: [],
        rotationAngles: [],
        loading: true,
        recentLoaded: false,
        invalidImageDimesnions: []
    };

    dimensions = [
        {
            width: 382,
            height: 392
        },
        {
            width: 210,
            height: 112
        },
        {
            width: 102,
            height: 164
        },
        {
            width: 102,
            height: 164
        },
        {
            width: 210,
            height: 99
        },
        {
            width: 100,
            height: 100
        }
    ];


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
            let fileNames =[...oldState.fileNames];
            fileNames.splice(index, 1, fileName);
            return {
                fileNames,
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
        let fileNames = [...this.state.fileNames];
        fileNames.splice(index, 1, "");
        this.setState({
            fileNames,
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

    sendFiles = (files, userId) => {
        let formData = new FormData();
            files.forEach((file, i)=>{
            if(file) {
                if(i === 0) {
                    formData.append("main_photo", file, this.state.fileNames[i]);
                } else {
                    formData.append("photo_" + i, file, this.state.fileNames[i]);
                }
                
            }
            formData.append("userId", userId);
        });
        return sendViaAjax(formData, `${iq7FlyersURL}/post/uploadfile`);
    };

    sendInfo = () => {
        // Show loader which is in the flyer parent component
        this.props.uploadingStep1Start();

        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 1,
                accessToken: tokenControl.getToken(),
                flyer_photo: this.state.fileNames,
                flyer_photo_key: this.state.flyerPhotoKey,
                flyer_photo_transform: this.state.rotationAngles,
                flyer_photo_transform_key: this.state.flyerPhotoKey,
                flyer_error_photo: this.state.invalidImageDimesnions
            }
        })
        .then(res => {
            return this.sendFiles(this.state.files, this.props.core.userId)
        })
        .then(res => {
            // images uploaded can unlock ui
            this.props.uploadingStep1End();
        })
        .catch(err => {
            console.log(err); 
        }); //end Mutate

        
    }

    fetchInfo = (notRecentLoadedFlag = true) => {
        this.props.client.query({
            query: getStep1info,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 1,
                accessToken: tokenControl.getToken()
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            let recentLoaded = false;
            let flyerPhotoKey = [];
            let fileNames = [];
            let rotationAngles = [];
            let invalidImageDimesnions = [];
            res.data.openFlyer.infoFlyer.flyer_photo.forEach((flyer, index) => {
                fileNames.push(flyer);
                flyerPhotoKey.push(String(index));
                rotationAngles.push("0");
                invalidImageDimesnions.push(0);
            });

            if(notRecentLoadedFlag) {
                recentLoaded = false;
            } else {
                recentLoaded = true;
            }

            this.setState({
                files: Array(res.data.openFlyer.infoFlyer.flyer_photo.length),
                fileNames: fileNames,
                flyerPhotoKey: flyerPhotoKey,
                rotationAngles: rotationAngles,
                recentLoaded: recentLoaded,
                invalidImageDimesnions: invalidImageDimesnions,
                loading: false,
            });

        });
    };

    componentDidMount() {
        this.fetchInfo();
    }

    refetchDataForStep1 = () => {
        this.fetchInfo(false);
    }

    startLoading = () => {
        this.setState({loading: true})
    }

    stopLoading = () => {
        this.setState({loading: false})
    }

    render() {
        return (
            this.state.loading ? (
                <Loading />
            ) : (
            <div>
                <Progress 
                    sendInfo={this.sendInfo}
                    step={1}/>
                <div className="wrapper">
                    <div className="step-1__wrapper">
                        <div className="step-1">
                            <div className="step-1__main-image">
                                <img src={tempalte_layout} alt="Tempalte layout"/>
                                {/* <img src={`img/${props.data.openFlyer.template_photo}`} alt="Tempalte layout"/> */}
                            </div>
                            <div className="step-1__uploads">
                                {
                                    this.state.fileNames.map((image, i) => {
                                        return (
                                            <Upload
                                                pathToFile={image === "" ? "" : `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.core.userId}/${image}`}
                                                fileName={image}
                                                heading={i === 0 ? 'Main photo' : `Photo ${i}`}
                                                key={i}
                                                index={i}
                                                pushIntoFiles={this.pushIntoFiles}
                                                pushIntoFileNames={this.pushIntoFileNames}
                                                deleteFromFiles={this.deleteFromFiles}
                                                deleteFromFileNames={this.deleteFromFileNames}
                                                recentLoaded={this.state.recentLoaded}
                                                editInvalidImageDimesnions={this.editInvalidImageDimesnions}
                                                dimensions={this.dimensions}
                                            />
                                        ) 
                                    })
                                }
                            </div>
                        </div>
                        <div className="step-1__cont-btn">
                            <Link className="btn_3 btn_3-cont" to="/dashboard/flyer/step-2" onClick={this.sendInfo}>Continue</Link>
                        </div>
                    </div>
                    <RecentlyMadeFlyers
                            step={1} 
                            userId={this.props.core.userId}
                            flyerId={this.props.core.flyerId}
                            refetchFunc={this.refetchDataForStep1}
                            loadingDataStarted={this.startLoading}
                            loadingDataFinished={this.stopLoading}
                            msgText={'the images'}
                            btnText={'Copy images'}
                            />
                </div>
            </div>
            )
        )
    }
};

Step1.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
    }),
    uploadingStep1Start: PropTypes.func,
    uploadingStep1End: PropTypes.func
};

export default withApollo(Step1);