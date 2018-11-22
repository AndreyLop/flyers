import React from 'react';
import {Link} from 'react-router-dom';
import Contacts from './common/contacts';
import Slider from "react-slick";
import { debounce } from '../assets/js/functions-vars';
import {SlickNextArrow, SlickPrevArrow } from '../components/common/slick-arrows';

// Images import
import slide1 from '../assets/img/home/slide1.png';
import hiw_picture from '../assets/img/home/picture.png';
import hiw_notes from '../assets/img/home/notes.png';
import hiw_videocall from '../assets/img/home/video-call.png';
import slide2 from '../assets/img/home/slide2.png';

class Home extends React.Component {

    state = {
        windowWidth: window.innerWidth,
        slickItems: window.innerWidth < 767 ? 1 : 3
    }

    componentWillMount() {
        window.addEventListener('resize', this.debouncedHandleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedHandleResize);
    }

    handleResize = (e) => {
        let slickItems = 3;
        if(window.innerWidth < 767) {
            slickItems = 1;
        } else {
            slickItems = 3;
        }
        this.setState({slickItems: slickItems});
    }

    debouncedHandleResize = debounce(this.handleResize, 200);

    render() {
        let slickSettings = {
            dots: false,
            infinite: false,
            slidesToShow: this.state.slickItems,
            slidesToScroll: 1,
            nextArrow: <SlickNextArrow />,
            prevArrow: <SlickPrevArrow />
        }
        return (
            <div className="home">
                <div className="home__top-carousel">
                    <div className="wrapper">
                        <Slider {...slickSettings}  slidesToShow={1} adaptiveHeight={true} dots={true}>
                            <div className="home__top-carousel-item">
                                <div className="home__top-carousel-image">
                                    <img src={slide1} alt=""/>
                                    <div className="home__top-carousel-tagline">Professional real estate flyers at your fingertips</div>
                                </div>
                                <div className="home__top-carousel-text">
                                    <h3 className="home__top-carousel-heading">Your next deal is just iq flyers</h3>
                                    <div className="home__top-carousel-line"></div>
                                    <p className="home__top-carousel-paragraph">
                                        Professional real estate flyers ar your fingertips-for web and print for flyer 
                                        templates are designed to look perfectly across all devices, and in print
                                    </p>
                                    <Link className="home__call-to-action btn_1" to="/login">i am ready to start</Link>
                                </div>
                            </div>
                            <div className="home__top-carousel-item">
                                <div className="home__top-carousel-image">
                                    <img src={slide1} alt=""/>
                                    <div className="home__top-carousel-tagline">Professional real estate flyers at your fingertips</div>
                                </div>
                                <div className="home__top-carousel-text">
                                    <h3 className="home__top-carousel-heading">Your next deal is just iq flyers</h3>
                                    <div className="home__top-carousel-line"></div>
                                    <p className="home__top-carousel-paragraph">
                                        Professional real estate flyers ar your fingertips-for web and print for flyer 
                                        templates are designed to look perfectly across all devices, and in print
                                    </p>
                                    <Link className="home__call-to-action btn_1" to="/login">i am ready to start</Link>
                                </div>
                            </div>
                            <div className="home__top-carousel-item">
                                <div className="home__top-carousel-image">
                                    <img src={slide1} alt=""/>
                                    <div className="home__top-carousel-tagline">Professional real estate flyers at your fingertips</div>
                                </div>
                                <div className="home__top-carousel-text">
                                    <h3 className="home__top-carousel-heading">Your next deal is just iq flyers</h3>
                                    <div className="home__top-carousel-line"></div>
                                    <p className="home__top-carousel-paragraph">
                                        Professional real estate flyers ar your fingertips-for web and print for flyer 
                                        templates are designed to look perfectly across all devices, and in print
                                    </p>
                                    <Link className="home__call-to-action btn_1" to="/login">i am ready to start</Link>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="home__hiw">
                    <div className="home__hiw-white-strip"></div>
                    <div className="wrapper">
                        <div className="home__hiw-line line"></div>
                            <h3 className="home__hiw-headig heading_1">how it works?</h3>
                            <div className="home__hiw-items">
                            <Slider {...slickSettings}>
                                <div className="home__hiw-item">
                                    <img src={hiw_picture} alt=""/>
                                    <p>Choose a template you like</p>
                                </div>
                                <div className="home__hiw-item">
                                    <img src={hiw_notes} alt=""/>
                                    <p>Fill info of your property</p>
                                </div>
                                <div className="home__hiw-item">
                                    <img src={hiw_videocall} alt=""/>
                                    <p>Get your flyer ready</p>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
                    <div className="home__sample">
                        <div className="wrapper">
                            <h3 className="home__sample-heading heading_1">a sample of our templates:</h3>
                            <Slider {...slickSettings}  slidesToShow={1}>
                                <div className="home__bottom-carousel-item">
                                    <img src={slide2} alt=""/>
                                </div>
                                <div className="home__bottom-carousel-item">
                                    <img src={slide2} alt=""/>
                                </div>
                            </Slider>
                        </div>
                    </div>

                    <Contacts />
                </div>
        );
    }

};

export default Home;