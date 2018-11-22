import React from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
// Flyer creation occurs here

//mutation
import newFlyer from '../../mutations/new-flyer';

// State mutation
import { SET_FLYER_INFO } from '../../state/mutations';

import { tokenControl, iq7FlyersURL } from '../../assets/js/functions-vars';

class TemplatesModal extends React.Component {
    
    chooseFlyerTemplate = () => {
        this.props.client.mutate({
            mutation: newFlyer,
            variables: {
                id: Number(this.props.userId),
                template_id: this.props.template.id,
                typ: 0,
                accesToken: tokenControl.getToken()
            }
        })
        .then(res => {
            if (res.access.result === 2) {
                this.props.client.mutate({
                    mutation: SET_FLYER_INFO,
                    variables: {
                        flyerId: res.data.newFlyer,
                        flyerName: 'NEW FLYER'
                    }
                })
            }
        })
        .then(()=> {
            this.props.history.push('/dashboard/flyer/step-1')
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        document.querySelector('body').style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.querySelector('body').style.overflow = 'auto';
    }

    handleBlackClick = (e) => {
        if(e.target.classList.contains('modal')) {
            this.props.toggleModal();
        }
    }

    render() {
        return (
            <div className="modal" onClick={this.handleBlackClick}>
                <div className="templates-modal">
                    <div className="templates-modal__name">
                        { this.props.template.template_name }
                    </div>
                    <div className="templates-modal__image">
                        <img src={`${iq7FlyersURL}/templates/flyer-${this.props.template.id}/${this.props.template.template_photo}`} alt={this.props.template.template_name} />
                    </div>
                    <div className="templates-modal__btns">
                        <input className="templates-modal__btn templates-modal__btn_back" type="button" value="Choose another" onClick={this.props.toggleModal} />
                        <input className="templates-modal__btn templates-modal__btn_cont" type="button" value="Continue" onClick={this.chooseFlyerTemplate} />
                    </div>
                </div>
            </div>
        )
    }
};

TemplatesModal.propTypes = {
    setTemplateId: PropTypes.func.isRequired,
    template: PropTypes.shape({
        id: PropTypes.number.isRequired,
        template_name: PropTypes.string.isRequired,
        template_photo: PropTypes.string.isRequired,
        template_properties: PropTypes.arrayOf(PropTypes.string)
    }),
    toggleModal: PropTypes.func,
    userId: PropTypes.string.isRequired
};

export default withRouter(withApollo(TemplatesModal));

