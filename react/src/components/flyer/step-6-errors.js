import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Step6Errors = (props) => {
    const errors = {
        noImage: 'There is no image',
        noText: 'There is no text',
        invalidImageDimensions: 'Invalid Image Dimensions'
    }
    const fieldNames = {
        step2: {
            addressLine1: 'Property Address 1',
            addressLine2: 'Property Address 2',
            city: 'City',
            state: 'State',
            zip: 'ZIP',
            price: 'Price',
            mlsNumber: 'MLS Number',
            website: 'Property website/virtual tour',
        },
        step3: {
            headline: 'Headline',
            content: 'Content - text block'
        },
        step4: {
            realtorName: 'Reactor name',
            realtorSlogan: 'Realtor slogan',
            realtorPhone: 'Realtor phone',
            realtorEmail: 'Realtor email',
            realtorWebsite: 'Realtor website',
            realtorPhotoName: 'Realtor photo'
        },
        step5: {
            companyName: 'Company name',
            companyPhone: 'Company phone',
            companyFax: 'Company fax',
            addressLine1: 'Company Address 1',
            addressLine2: 'Company Addresss 2',
            city: 'City',
            state: 'State',
            zip: 'ZIP',
            companyPhotoName: 'Company photo'
        }
    }

    const detectErrorFieldName = (error) => {
        if(error.step === 1) {
            return error.key === 0 ? 'Main photo' : 'Photo ' + error.key;
        } else {
            return fieldNames[`step${error.step}`][error.key];
        }
    };

    const detectErrorType = (error) => {
        if(error.step === 1) {
            if(error.typ === 1) {
                return errors.noImage;
            } else if(error.typ === 2) {
                return errors.invalidImageDimensions;
            }
        }
        if(error.step === 4 && error.key === "realtorPhotoName") {
            if(error.typ === 1) {
                return errors.noImage;
            } else if(error.typ === 2) {
                return errors.invalidImageDimensions;
            }
        }
        if(error.step === 5 && error.key === "companyPhotoName") {
            if(error.typ === 1) {
                return errors.noImage;
            } else if(error.typ === 2) {
                return errors.invalidImageDimensions;
            }
        }
        return errors.noText;
    };

    return (
        <div className={props.errorsStyleClass}>
            <div className="step-6__errors-message">{props.messageText}</div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.errors.map((error, i) => {
                            return (
                                <tr key={i}>
                                    <td className="step-6__errors-field-name">
                                        {detectErrorFieldName(error)}
                                    </td>
                                    <td className="step-6__errors-error-text">
                                        {detectErrorType(error)}
                                    </td>
                                    <td className="step-6__errors-link">
                                        <Link to={`/dashboard/flyer/step-${error.step}`}>Change</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

Step6Errors.propTypes = {
    errorsStyleClass: PropTypes.string.isRequired,
    messageText: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        step: PropTypes.number.isRequired
    }))
}

export default Step6Errors;