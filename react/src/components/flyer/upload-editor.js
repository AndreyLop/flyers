import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

// toBlob pollyfill
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
        var canvas = this;
        setTimeout(function() {

        var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
        }

        callback( new Blob( [arr], {type: type || 'image/png'} ) );

        });
    }
    });
};

class UploadEditor extends Component {

    state = {
         img: '',
    }


    // Prmosifying toBlob (for getting image from canvas)
    getBlob = (canvas) => {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                resolve(blob);
            }, 'image/jpeg', 1);
        })
    };

    // Rotation of the image
    rotate = (angle) => {
        this.refs.cropper.rotate(angle);
    };

    save = (message) => {
        //let canvas = this.refs.cropper.getCroppedCanvas({width: this.props.width, height: this.props.height});
        let canvas = this.refs.cropper.getCroppedCanvas({
            width: this.props.width, 
            height: this.props.height,  
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });
        this.getBlob(canvas)
            .then(blob => {
                const newName = this.props.fileName.split('.')[0] + '.jpg';
                this.setState({img: URL.createObjectURL(blob)}, () => {
                    blob.name = newName;
                    this.props.setValidImage(blob, message);
                });
            });
    };

    cropAndScaleAutomatically = () => {
        let cropBox = this.refs.cropper.getCropBoxData();
        let image = this.refs.cropper.getImageData();
        if((cropBox.height !== image.naturalHeight) || (cropBox.width !== image.naturalWidth)) {
            let heightScale = cropBox.height / image.naturalHeight;
            let widthScale = cropBox.width / image.naturalWidth;
            if(widthScale > heightScale) {
                this.refs.cropper.zoomTo(widthScale);
            } else {
                this.refs.cropper.zoomTo(heightScale);
            }
        }
    };

    // for auto crop when image loaded and canvas created
    handleReady = () => {
        if(this.props.auto) {
            this.cropAndScaleAutomatically();
            this.save('We cropped your image');
        }
    };

    render() {
        return (
        <div className="upload__edit">
            <Cropper
                ref='cropper'
                crossorigin="anonymous"   
                src={this.props.pathToFile}
                style={{height: this.props.height + 50, width: '100%'}}
                cropBoxResizable={false}
                minCropBoxWidth={this.props.width}
                aspectRatio={this.props.width/this.props.height}
                checkCrossOrigin={false}
                checkImageOrigin={false}
                ready={ this.handleReady }
                />
            <div className="upload-editor__msg">Use mouse scroll to scale your image</div>
            <div className="upload-editor__btn">
                <button className="btn_4 btn_4_upload-editor btn_4_upload-editor-rotate" onClick={()=>this.rotate(90)} type="button">
                <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 28 28">
                    <g>
                        <path d="M14.133,28.265c-7.061,0-12.805-5.75-12.805-12.809c0-7.06,5.744-12.807,12.805-12.807c0.469,0,0.943,0.027,1.414,0.08
                            v-2.07c0-0.266,0.164-0.508,0.406-0.611c0.252-0.098,0.531-0.043,0.723,0.148l4.537,4.547c0.258,0.258,0.258,0.67,0,0.932
                            l-4.535,4.557c-0.193,0.188-0.473,0.246-0.725,0.143c-0.242-0.104-0.406-0.344-0.406-0.609V7.47
                            c-0.469-0.086-0.941-0.125-1.414-0.125c-4.473,0-8.113,3.639-8.113,8.111c0,4.471,3.641,8.113,8.113,8.113s8.111-3.643,8.111-8.113
                            c0-0.363,0.295-0.66,0.662-0.66h3.369c0.365,0,0.662,0.297,0.662,0.66C26.937,22.515,21.189,28.265,14.133,28.265z"/>
                    </g>
                </svg>
                </button>
                <button 
                    className="btn_4 btn_4_upload-editor btn_4_upload-editor-rotate" 
                    onClick={()=>this.rotate(-90)} 
                    type="button">
                <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 28 28">
                    <g transform="matrix(-1,0,0,1,28,0)">
                        <path d="M14.133,28.265c-7.061,0-12.805-5.75-12.805-12.809c0-7.06,5.744-12.807,12.805-12.807c0.469,0,0.943,0.027,1.414,0.08
                            v-2.07c0-0.266,0.164-0.508,0.406-0.611c0.252-0.098,0.531-0.043,0.723,0.148l4.537,4.547c0.258,0.258,0.258,0.67,0,0.932
                            l-4.535,4.557c-0.193,0.188-0.473,0.246-0.725,0.143c-0.242-0.104-0.406-0.344-0.406-0.609V7.47
                            c-0.469-0.086-0.941-0.125-1.414-0.125c-4.473,0-8.113,3.639-8.113,8.111c0,4.471,3.641,8.113,8.113,8.113s8.111-3.643,8.111-8.113
                            c0-0.363,0.295-0.66,0.662-0.66h3.369c0.365,0,0.662,0.297,0.662,0.66C26.937,22.515,21.189,28.265,14.133,28.265z"/>
                    </g>
                </svg>
                </button>
                <button className="btn_4 btn_4_upload-editor" onClick={this.save.bind(this, null)} type="button">Save</button>
                <button className="btn_4 btn_4_upload-editor" onClick={this.props.toggleEditing}>Cancel</button>
            </div>
        </div>
        )
    }
};

UploadEditor.propTypes = {
    pathToFile: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    fileName: PropTypes.string,
    pushIntoFiles: PropTypes.func.isRequired,
    pushIntoFileNames: PropTypes.func.isRequired
};

export default UploadEditor;
