import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
    
    state = {
        valid: true
    }

    handleInputChange = (e) => {
        let {name, value} = e.target;
        if(this.props.maxCharLength && e.target.value.length > this.props.maxCharLength) {
            this.setState({valid: false}, () => {
                this.props.setValues(name, value.substring(0, this.props.maxCharLength));
            });
        } else {
            this.setState({valid: true}, () => {
                this.props.setValues(name, value);
            })
        }
    }

    render() {
        return (
            <div>
                {this.props.label && <label className="label" htmlFor={this.props.name}>{this.props.label}</label>}
                {this.props.additionalMessage && <div className="step-2__empty">{this.props.additionalMessage}</div>}
                <input
                    placeholder={this.props.placeholder}
                    className={`input ${this.props.additionalClass}`} 
                    type="text"
                    id={this.props.name} 
                    name={this.props.name} 
                    value={this.props.value} 
                    onChange={this.handleInputChange} />
                {!this.state.valid && <div className="input__error">This field should have maximum of {this.props.maxCharLength} characters including spaces</div>}
            </div>
        )
    }
}

InputField.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    additionalClass: PropTypes.string,
    value: PropTypes.string.isRequired,
    maxCharLength: PropTypes.number,
    setValues: PropTypes.func,
    additionalMessage: PropTypes.string
}

InputField.defaultProps = {
    additionalClass: '',
    label: '',
    placeholder: '',
    additionalMessage: ''
}

export default InputField;