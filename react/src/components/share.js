import React, {Fragment} from 'react'

import { iq7FlyersURL } from '../assets/js/functions-vars';

import Loading from './common/loading';

class Share extends React.Component {

    state = {
        loading: true,
        success: false
    };

    domain = iq7FlyersURL === '' ? 'https://www.iqflyer.com' : iq7FlyersURL;

    link1 = `${iq7FlyersURL}/upload/flyers_thumbnails_users`;
    link2 = this.props.location.pathname.replace(/share\//i, '');

    initFacebook = () => {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = `https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v3.1&appId=${process.env.REACT_APP_FACEBOOK_APP_ID}&autoLogAppEvents=1`;
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
    }

    componentWillMount() {
        this.initFacebook();
    }

    componentDidMount() {
        let img = document.createElement('img')
        img.src = `${this.link1}${this.link2}`;
        img.onload = this.handleImageLoad;
        img.onerror = this.handleImgError;
    };

    componentDidUpdate() {
        if(window.FB) {
            window.FB.XFBML.parse();
        }
    };

    handleShareClick = () => {
        window.FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:url': `${this.domain}${this.props.location.pathname}`,
                    'og:title': 'IQflyer.com',
                    'og:description': 'Create flyers and send them via email.',
                    'og:image': `${this.domain}${this.link1}${this.link2}`
                }
            })
        });
    };

    handleImageLoad = () => {
        this.setState({
            loading: false,
            success: true
        });
    };

    handleImgError = () => {
        this.setState({
            loading: false,
            success: false
        });
    };
    
    render() {

        return (
            <Fragment>
                <div className="wrapper share">
                    {this.state.loading ? <Loading /> : (
                        <Fragment>
                            {!this.state.success ?
                            (
                                <div>
                                    Sorry this link is broken :(
                                </div>
                            ) : (
                                <div>
                                    <div className="share__image">
                                        <img
                                            src={`${this.link1}${this.link2}`}  
                                            alt="Share your flyer"/>
                                    </div>

                                    <div id="fb-root"></div>

                                    <div id="fb-share-button" onClick={this.handleShareClick}>
                                        <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet">
                                            <path className="svg-icon-path" d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
                                        </svg>
                                        <span>Share</span>
                                    </div>
                                </div>
                                
                            )}
                        </Fragment>
                    )}
                </div>
            </Fragment>
        )
    };
}

export default Share;
