import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

// components
import Loading from '../common/loading';
import TemplatesModal from './templates-modal';

//utility
import {tokenControl,getMinImageName, iq7FlyersURL} from '../../assets/js/functions-vars';

//queries
import flyerTemplate from '../../queries/templates';

// app state mutation
import { SET_FLYER_NAME } from '../../state/mutations';

class Templates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            template: null
        }
    }

    toggleModal = (template) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            template: template ? template : null,
        });
    }

    componentDidMount() {
        this.props.mutate({
            variables: {
                flyerName: 'New Flyer'
            }
        })
    }

    render() {
        return this.props.data.loading ? (
            <Loading />
        ) : (
            <div className="tempaltes">
                {this.state.modalOpen && <TemplatesModal 
                                            template={this.state.template} 
                                            toggleModal={this.toggleModal}
                                            setTemplateId={this.props.setTemplateId}
                                            setUploadedImages={this.props.setUploadedImages}
                                            userId={this.props.core.userId}
                                        />}
                <div className="templates__choose">
                    <div className="wrapper">
                        Сhoose a template
                    </div>
                </div>
                <div className="wrapper templates__list-wrapper">
                    <ul className="templates__list">
                        {
                            this.props.data.flyerTemplate.map(template => {
                                // Minified file for preview
                                let minTmplateName = getMinImageName(template.template_photo);
                                return (
                                    <li key={template.id} className="templates__list-item" onClick={this.toggleModal.bind(this, template)}>
                                        <div className="templates__list-item-wrapper">
                                            <div className="templates__list-heading">{template.template_name}</div>
                                            <div className="templates__list-image">
                                                <img src={`${iq7FlyersURL}/templates/flyer-${template.id}/${minTmplateName}`} alt={minTmplateName}/>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
};

Templates.propTypes = {
    core: PropTypes.shape({
        flyerId: PropTypes.number,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired
    })
};

export default compose(
    graphql(SET_FLYER_NAME),
    graphql(flyerTemplate, {
        options: (props) => {
            return {
                variables: {
                    accessToken: tokenControl.getToken()
                }
            }
        }
    })
)(Templates);