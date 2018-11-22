import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// styles for this component are inside scss/flyers/flyers

//components
import Slider from "react-slick";
import RecentlyMadeFlyersModal from './recently-made-flyers-modal';
import {SlickNextArrow, SlickPrevArrow } from '../common/slick-arrows';

//queries
import getRecentFlyers from '../../queries/get-flyers-recent';

//mutation
import copyFlyer from '../../mutations/copy-flyer';

import {tokenControl, iq7FlyersURL, debounce } from '../../assets/js/functions-vars';


class RecentlyMadeFlyers extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loadedFlyers: [],
            modalOpen: false,
            modalImage: '',
            slidesToShow: 5,
            filter: {
                allFlyers: false,
                draftFlyers: false,
                firstEl: 0,
                limit: 20,
                listingProperty: false,
                resentFlyers: true,
                searchText: "",
                sortBy: 0
            }
        };
    };

    componentDidMount() {
        this.determineItemsToshow();
        this.props.client.query({
            query: getRecentFlyers,
            variables: {
                user: Number(this.props.userId),
                accessToken: tokenControl.getToken(),
                ...this.state.filter,
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            this.setState({
                loaded: true,
                recentFlyers: [...res.data.flyers]
            });
        });
    };

    copyFromRecentFlyer = (id) => {
        //if you need to block ui cause of large images
        if(this.props.loadingDataStarted) {
            this.props.loadingDataStarted();
        }
        this.props.client.mutate({
            mutation: copyFlyer,
            variables: {
                id: Number(this.props.userId),
                accessToken: tokenControl.getToken(),
                flyer_id: this.props.flyerId,
                copy_flyer_id: id,
            }
        })
        .then(res => {
            if(res.data.copyFlyer === 1) {
                //if you need to unblock ui
                if(this.props.loadingDataFinished) {
                    this.props.loadingDataFinished();
                }
                this.props.refetchFunc();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    openModal = (img) => {
        this.setState({
            modalOpen: true,
            modalImage: `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.userId}/template/${img}`
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false,
            modalImage: ''
        });
    };

    componentWillMount() {
        window.addEventListener('resize', this.handleResizeDebounced);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResizeDebounced);
    }

    determineItemsToshow = () => {
        let slidesToShow = 5;
        let width = window.innerWidth;
        if(width < 1200) {
            slidesToShow = 4;
        }
        if(width < 1024) {
            slidesToShow = 3;
        }
        if(width < 767) {
            slidesToShow = 2;
        }
        if(width < 500) {
            slidesToShow = 1;
        }
        this.setState({slidesToShow})
    }

    handleResizeDebounced = debounce(this.determineItemsToshow, 200);

    render() {
        let settings = {
            arrows: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: this.state.slidesToShow,
            slidesToScroll: 1,
            nextArrow: <SlickNextArrow />,
            prevArrow: <SlickPrevArrow />
        };
        
        return (
            this.state.recentFlyers &&  this.state.recentFlyers.length > 0 ? (
                <div className="recently-made-flyers-carousel">
                    {this.state.modalOpen && <RecentlyMadeFlyersModal img={this.state.modalImage} closeModal={this.closeModal}/>}
                    <h4 className="recently-made-flyers-carousel__heading">Resently made flyers:</h4>
                    <div className="recently-made-flyers-carousel__message">Click the button below to copy {this.props.msgText} in a flyer into your template.</div>
                    <Slider {...settings} >
                        {this.state.loaded && (
                            this.state.recentFlyers.map(flyer => {
                                return (
                                    <div key={flyer.id} className="recently-made-flyers-carousel__item">
                                        <div onClick={this.openModal.bind(this, flyer.flyer_preview)} className="recently-made-flyers-carousel__image">
                                            <img src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.userId}/template/${flyer.flyer_preview}`} alt="Flyer Preview"/>
                                            {/* <img src={`/upload/flyers_thumbnails_users/${this.props.userId}/template/${flyer.flyer_preview}`} alt="Flyer Preview"/> */}
                                            <div className="recently-made-flyers-carousel__dark-overlay"></div>
                                        </div>
                                        <div>
                                            <button 
                                                onClick={this.copyFromRecentFlyer.bind(this, Number(flyer.id))}
                                                className="btn_3 btn_3_recently-made-flyers-carousel"
                                                >
                                                {this.props.btnText}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </Slider>
                </div>
            ) : (
                ''
            )
        );
      } 
};

RecentlyMadeFlyers.propTypes = {
    btnText: PropTypes.string.isRequired,
    flyerId: PropTypes.number.isRequired,
    loadingDataFinished: PropTypes.func,
    loadingDataStarted: PropTypes.func,
    msgText: PropTypes.string.isRequired,
    refetchFunc: PropTypes.func,
    step: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired
};

export default withRouter(withApollo(RecentlyMadeFlyers));