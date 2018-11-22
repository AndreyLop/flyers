import React, {Component} from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import Loading from '../common/loading';
import CampaignMap from './campaign-map';

//query for US states
import getStates from '../../queries/get-states';

//query for app state
import {GET_ID} from '../../state/queries';

import { tokenControl } from '../../assets/js/functions-vars';

import CheckboxTree from 'react-checkbox-tree';


class CampaignStateModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            states: [],
            selectedState: '',
            loadedDistributors: null,
            idToPrice: {},
            nodes: [],
            checked: [],
            expanded: []
        }
    }

    componentDidMount() {
        this.props.client.query({
            query: GET_ID
        })
        .then(res=> {
            return this.props.client.query({
                query: getStates,
                variables: {
                    id: Number(this.props.userId),
                    accessToken: tokenControl.getToken()
                } 
            })
        })
        .then(res => {
            this.setState({
                states: [{id: 0, state: 'Select State'}, ...res.data.state],
            })
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loading: true
        }, this.getDistributors);
    }

    getDistributors = () => {
        let state = this.state.states.find(state => state.state === this.state.selectedState).id;
        if(state !== 0) {
            this.props.client.query({
                query: getStates,
                variables: {
                    id: Number(this.props.userId),
                    accessToken: tokenControl.getToken(),
                    state: state
                }
            })
            .then(res => {

                let nodes = [];
                let expanded = [];
                let checked = [];
                let idToPrice = {};

                res.data.state[0].region_list.forEach((region, index) => {
                    let temp = {}
                    temp.value = region.region_name;
                    temp.label = region.region_name;
                    temp.children = [];
                    region.distribution_list.forEach(distributor => {
                        temp.children.push({
                            value: Number(distributor.distribution_id),
                            label: distributor.distribution
                        });
                        idToPrice[distributor.distribution_id] = distributor.price;
                    })
                    expanded.push(region.region_name);
                    nodes.push(temp);
                })
                
                this.setState({
                    // loadedDistributors: res.data.state[0],
                    nodes: nodes,
                    checked: checked,
                    expanded: expanded,
                    idToPrice: idToPrice,
                    loading: false
                })
            })
        }
    }

    sendToParent = () => {
        let {nodes, checked, idToPrice} = this.state;
        let newExpanded = [];
        let newNodes = [];
        nodes.forEach(node => {
            let temp = {};
            temp.children = [];
            node.children.forEach(childNode => {
                if(checked.indexOf(String(childNode.value))!==-1) {
                    temp.value = node.value;
                    temp.label = node.label;
                    temp.children.push({
                        value: childNode.value,
                        label: childNode.label
                    });
                    newExpanded.push(node.value);
                }
            });
            if(temp.value) {
                newNodes.push(temp);
            }
        })
        this.props.populateDataForNestedCheckboxesInParent(newNodes, checked, newExpanded, idToPrice);
        this.props.closeModal();
    }

    render() {
        return (
            <div className="modal">
                <div className="campaign-modal">
                    <h4 className="campaign-modal__heading">SELECT DISTRIBUTION</h4>
                    <div className="campaign-modal__map">
                        <CampaignMap selectedState={this.state.selectedState}/>
                    </div>
                    <div className="campaign-modal__body">
                        <div>
                            <label htmlFor="selectedState" className="label">State:</label>
                            <select 
                                className="input input_state" 
                                id="selectedState"
                                name="selectedState" 
                                type="text"
                                value={this.state.state}
                                onChange={this.handleInputChange}
                            >
                            {this.state.states.map(state => {
                                return (
                                    <option key={state.id} value={state.state}>{state.state}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div>
                            <label className="label">Distribution lists:</label>
                            {
                                this.state.loading ? (
                                    <div>
                                        <div>Please wait while distribution lists are loading.</div>
                                        <Loading width={44} borderWidth={4} />
                                    </div>
                                ) : (
                                    this.state.nodes.length !== 0 && (
                                        <div className="campaign-modal__checkbox-tree checkbox-tree">
                                            <CheckboxTree 
                                                nodes={this.state.nodes}
                                                checked={this.state.checked}
                                                expanded={this.state.expanded}
                                                onCheck={checked => this.setState({ checked })}
                                                onExpand={expanded => this.setState({ expanded })}
                                            />

                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div className="campaign-modal__controls">
                            <button className="btn_3 btn_3_campaign-modal" onClick={this.props.closeModal}>CANCEL</button>
                            <button className="btn_3 btn_3-cont btn_3_campaign-modal" onClick={this.sendToParent}>CONTINUE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CampaignStateModal.propTypes = {
    userId: PropTypes.string.isRequired
};

export default withApollo(CampaignStateModal);