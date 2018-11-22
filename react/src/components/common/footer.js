import React from 'react';
import Logo from '../../components/common/logo';

// Images 
import SO_logo from '../../assets/img/footer/SmartOrange_logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper wrapper">
                <div className="footer__item footer__item_left">
                    <Logo />
                    <div className="footer__copyright">Copyright &copy; 2018 <span className="footer__color">IQ</span>flyers</div>
                </div>
                <div className="footer__item footer__item_center">
                    <ul className="footer__navs">
                        <li><a href="">Privacy</a></li>
                        <li><a href="">Terms and Conditions</a></li>
                        <li><a href="">About us</a></li>
                    </ul>
                </div>
                <div className="footer__item footer__item_right footer__item_logo">
                    <a target="_blank" href="http://smartorange.com.ua/" rel="noopener noreferrer">
                        <div className="smart-orange">
                            <div className="smart-orange__designed">
                                <div>Designed by</div>
                                <div><img src={SO_logo} alt="Smart Orange Logo"/></div>
                            </div>
                            <div className="footer__color">SMART ORANGE</div>
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;