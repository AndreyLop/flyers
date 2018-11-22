import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Nav from './nav';
import MyFlyers from './flyers/my-flyers';
import MyCampaings from './campaigns/my-campaigns';
import Flyer from './flyer/flyer';
import Profile from './profile';
import Campaign from './campaigns/campaign';
import CampaignReport from './campaigns/campaign-report';
import NotFound from './common/404';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div>
                    <Switch>
                        <Route path={'/dashboard/my-flyers'} component={MyFlyers} />
                        <Route exact path={'/dashboard/my-campaigns'} component={MyCampaings} />
                        <Route path={'/dashboard/profile'} component={Profile} />
                        <Route path={'/dashboard/flyer'} component={Flyer} />
                        <Route path={'/dashboard/campaign'} component={Campaign} />
                        <Route path={'/dashboard/my-campaigns/report/:id'} component={CampaignReport} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard;