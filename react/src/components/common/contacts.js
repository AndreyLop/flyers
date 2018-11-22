import React from 'react';

// Images imports
import placeholder from '../../assets/img/contacts/placeholder.png';
import telephone from '../../assets/img/contacts/telephone.png';

const Contacts = () => {
    return (
        <div className="contacts">
            <div className="wrapper">
                <h4 className="contacts__heading heading_1">our contacts</h4>
                <div className="contacts__line line"></div>
                <div className="contacts__address">
                
                    <div className="contacts__address-item">
                        <div className="contacts__address-icon">
                            <img src={placeholder} alt="Placeholder icon"/>
                        </div>
                        <div>
                            <ul>
                                <li>One Flyer Away LLC</li>
                                <li>10807 Falls Rd Suite 1362</li>
                                <li>Brooklandville, MD 21022</li>
                            </ul>
                        </div>
                    </div>
                    <div className="contacts__mobile-line"></div>
                    <div className="contacts__address-item">
                        <div className="contacts__address-icon">
                            <img src={telephone} alt="Telephone icon"/>
                        </div>
                        <div>
                            <ul>
                                <li>Phone: +1 800-511-6219</li>
                                <li>Fax: +1 800-511-6219</li>
                                <li>hello@oneflyeraway.com</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Contacts; 