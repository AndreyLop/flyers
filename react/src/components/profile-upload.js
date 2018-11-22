import React, { Component } from 'react';

import noImage from '../assets/img/common/noimage.png'

class ProfileUpload extends Component {


    state = {
        file: null,
        pathToFile: this.props.pathToFile,
        fileName: '',
        error: null,
    }

    maxFileSize = 16000000; // 16 mB

    componentWillReceiveProps(nextProps) {
        if(this.state.pathToFile !== nextProps.pathToFile && !nextProps.changed) {
            this.setState({
                pathToFile:  nextProps.pathToFile
            });
        };
    };

    handleChange = e => {
        let file = e.target.files[0];
        if(file) {
            if(file.type === "image/jpeg" || file.type === "image/png") {
                if(file.size < this.maxFileSize) {
                    this.setState({
                        file: file,
                        pathToFile: URL.createObjectURL(file),
                        fileName: file.name,
                        error: null
                    }, ()=>{
                        this.props.populateParentState(file)
                    });
                    
                } else {
                    this.setState({error: 'File size is too large'});
                }
            } else {
                this.setState({error: 'Please use image formats jpg, png'});
            }
        }
    }

    render() {
        return (
            <div className="profile__image-upload">
                <div className="profile__image-upload_image">
                {this.state.pathToFile ? 
                    (<img src={this.state.pathToFile} alt="Uplodaded"/>) 
                    : (<img src={noImage} alt="Not available"/>)
                }
                </div>
                <label className="profile__image-upload_label" htmlFor={this.props.uploadId}>{this.props.btnText}</label>
                <input id={this.props.uploadId} className="profile__image-upload_input" type="file" onChange={this.handleChange} value=""/>
                {this.state.error && <div className="input__error input__error_upload">{this.state.error}</div>}
            </div>
        )
    }
}

export default ProfileUpload;