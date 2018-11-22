import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Nav = (props) => {

    let standardClass = "btn_2 nav__btn";
    let activeClass = "btn_2 nav__btn nav__btn_active";

    return (
        <div className="nav">
            <div className="wrapper nav__wrapper">
                <div className="nav__links">
                    <div>
                        <Link 
                        className={props.location.pathname === "/dashboard/my-flyers" ? activeClass : standardClass } 
                        to="/dashboard/my-flyers">My flyers</Link>
                    </div>
                    <div>
                        <Link 
                        className={props.location.pathname === "/dashboard/my-campaigns" ? activeClass : standardClass } 
                        to="/dashboard/my-campaigns">My Campaigns</Link>
                    </div>
                </div>
                <div className="nav_text">
                    <p>FREE - unlimited downloads of high-quality, printable flyers.</p>
                    <p>Email your flyer to thousands of real estate professionals - targeted by area, or nationwide.</p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Nav);