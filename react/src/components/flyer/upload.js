import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UploadEditor from './upload-editor';

class Upload extends Component {
        
    state = {
        file: null,
        rotationAngle: 0,
        pathToFile: this.props.pathToFile ? this.props.pathToFile : null,
        pathToFileCopy: this.props.pathToFile ? this.props.pathToFile : null,
        trickInput: '',
        error: null,
        fileName: this.props.fileName,
        editing: false,
        auto: false
    }

    maxFileSize = 50000000; // 50 mB

    getImageDimensions = (file) => {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = function () {
                resolve({width: this.width, height: this.height})
            };
        });
    };

    // Error message and file are passed from save in upload-editor
    setValidImage = (file, message) => {
        this.setState({
            file: file,
            fileName: this.props.index + file.name,
            pathToFile: URL.createObjectURL(file),
            editing: false,
            error: message
        }, () => {
            this.props.pushIntoFiles(this.state.file, this.props.index);
            this.props.pushIntoFileNames(this.state.fileName, this.props.index);
        });
    };

    handleChange = e => {
        let file = e.target.files[0];
        if(file) {
            if(file.type === "image/jpeg" || file.type === "image/png") {
                if(file.size < this.maxFileSize) {
                    this.setValidImage(file);
                    // Make copy of link to file here
                    this.setState({pathToFileCopy: URL.createObjectURL(file)})
                } else {
                    this.setState({
                        error: 'Upload files 50 Mb or less please.'
                    });
                }
            } else {
                this.setState({
                    error: 'jpg or png image formats only.'
                });
            }
        }
    };

    pushIntoStep1State = () => {
        this.props.pushIntoFiles(
            this.state.file,
            this.props.index
        );
    }

    deleteImage = () => {
        this.setState({
            file: null,
            pathToFile: null,
            pathToFileCopy: null,
            rotationAngle: "0",
            error: null
        }, ()=>{
            this.props.deleteFromFiles(this.props.index);
            this.props.deleteFromFileNames(this.props.index);
            this.props.editInvalidImageDimesnions(0, this.props.index);
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.recentLoaded) {  
            this.setState({
                fileName: nextProps.fileName,
                pathToFile: nextProps.pathToFile,
                rotationAngle: 0
            });
        }
    };

    onImgLoad = ({target:img}) => {
        if(img) {
            if(this.props.checkDimensions) {
                if(img.naturalWidth !== this.props.dimensions[this.props.index].width && img.naturalHeight !== this.props.dimensions[this.props.index].height) {
                    this.setState({
                        //error: `We cropped your image.`,
                        auto: true
                    }, () => {
                        this.props.editInvalidImageDimesnions(1, this.props.index);
                    })
                } else {
                    this.setState({
                        //error: null,
                        auto: false
                    }, () => {
                        this.props.editInvalidImageDimesnions(0, this.props.index);
                    })
                }
            }
        }
    };

    toggleEditing = () => this.setState(state => ({editing: !state.editing}));

    // close modal when clicking black area
    handleModalClick = e => {
        if(e.target.classList.contains('modal')) {
            this.toggleEditing();
        }
    };

    render() {
        return (
        <div className="upload" >
            <div className="upload__heading">{this.props.heading}</div>
            <div className="upload__message">Drag an image here, or click to select file</div>
            <div className="upload__message_mobile">Click to select file</div>
            <input className="unpload__input" id={`upload${this.props.index}`} type="file" onChange={this.handleChange} value=''/>
            {/* Hidden cropper for automatic editing image */}
            <div className="upload__hidden">
                <UploadEditor 
                        pathToFile={this.state.pathToFile}
                        width={this.props.dimensions[this.props.index].width}
                        height={this.props.dimensions[this.props.index].height}
                        index={this.props.index}
                        pushIntoFiles={this.props.pushIntoFiles}
                        pushIntoFileNames={this.props.pushIntoFileNames}
                        fileName={this.state.fileName}
                        setValidImage={this.setValidImage}
                        toggleEditing={this.toggleEditing}
                        auto={this.state.auto}
                    />
            </div>
            {
                this.state.pathToFile && (
                    <div className="upload__result">
                        <div className="upload__image-container">
                            <div className="upload__image">
                                <img onLoad={this.onImgLoad} src={this.state.pathToFile} alt="Uploaded"/>
                                {
                                    this.state.editing && (
                                        <div className="modal" onClick={this.handleModalClick}>
                                            <div className="upload__modal">
                                                <UploadEditor 
                                                    pathToFile={this.state.pathToFileCopy}
                                                    width={this.props.dimensions[this.props.index].width}
                                                    height={this.props.dimensions[this.props.index].height}
                                                    index={this.props.index}
                                                    pushIntoFiles={this.props.pushIntoFiles}
                                                    pushIntoFileNames={this.props.pushIntoFileNames}
                                                    fileName={this.state.fileName}
                                                    setValidImage={this.setValidImage}
                                                    toggleEditing={this.toggleEditing}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="upload__btns">
                                    {!this.state.editing && <button className="upload__btn_2 btn_4" onClick={this.toggleEditing}>Edit</button>}
                                    <button className="upload__btn_2 btn_4 btn_4_upload-delete" onClick={this.deleteImage}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {this.state.error && <div className="input__error input__error_upload">{this.state.error}</div>}
        </div>
        )
    }
};

Upload.propTypes = {
    deleteFromFileNames: PropTypes.func.isRequired,
    deleteFromFiles: PropTypes.func.isRequired,
    editInvalidImageDimesnions: PropTypes.func.isRequired,
    fileName: PropTypes.string,
    heading: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    pathToFile: PropTypes.string.isRequired,
    pushIntoFileNames: PropTypes.func.isRequired,
    pushIntoFiles: PropTypes.func.isRequired,
    recentLoaded: PropTypes.bool.isRequired,
    checkDimensions: PropTypes.bool
};

Upload.defaultProps = {
    checkDimensions: true
};

export default Upload;
