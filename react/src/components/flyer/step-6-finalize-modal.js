import React, {Component} from 'react';
import Loading from '../common/loading';
import {withApollo} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

//mutation
import saveFlyer from '../../mutations/save-flyer';

// app state mutation
import { SET_FLYER_NAME } from '../../state/mutations';

import {tokenControl} from '../../assets/js/functions-vars';


class Step6FinalizeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.client.mutate({
            mutation: saveFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 7,
                accessToken: tokenControl.getToken(),
                flyer_name: this.props.flyerName
            }
        })
        .then((res)=>{
            if(res.data.saveFlyer === 1) {
                this.props.client.mutate({
                    mutation: SET_FLYER_NAME,
                    variables: {
                        flyerName: this.props.flyerName
                    }
                })
                this.props.history.push('/dashboard/flyer/ready-flyer');
            }
        })
    }

    stopFinalization = () => {
        // Stop grphql here
        this.props.closeFinalizationModal();
    }

    render() {
        return (
            <div className="modal">
                <div className="step-6__modal step-6__modal_finalization">
                    <h4 className="step-6__modal-heading">Finalizing</h4>
                    <div className="step-6__modal-body">
                        <p>Please wait while <span className="step-6__modal-flyer-name">{this.props.flyerName}</span> is being generated.</p>
                    </div>
                    <div className="step-6__modal_loading">
                        <Loading />
                    </div>
                    <button className="btn_3 btn_3-prev step-6__modal-btn" onClick={this.stopFinalization}>PREVIOUS</button>
                </div>
            </div>
        )
    }
};

Step6FinalizeModal.propTypes = {
    flyerName: PropTypes.string.isRequired
};

export default withRouter(withApollo(Step6FinalizeModal));