import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CheckboxTree from 'react-checkbox-tree';
import Loading from '../common/loading';
import CampaignStateModal from './campaign-state-modal';

// query for state
import { GET_ID, GET_FLYER_ID_AND_FLYER_IMAGE_NAME, GET_APP_TEST_STATE } from '../../state/queries';

// mutation for app state
import { SET_FLYER_ID_AND_FLYER_IMAGE_NAME } from '../../state/mutations';

// styles for datePicker
import 'react-datepicker/dist/react-datepicker.css';

// mutation to place order
import placeOrder from '../../mutations/place-order';

import { tokenControl, iq7FlyersURL } from '../../assets/js/functions-vars';



class Campaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            appTestState: false,
            modalOpen: false,
            userId: null,
            flyerId: null,
            totalPrice: 0,
            flyerImageName: '',
            senderName: '',
            emailSubject: '',
            creditCardNumber: '',
            cvv: '',
            expMM: '',
            expYYYY: '',
            zip: '',
            creditcardtype: 'Visa',
            paymentErrors: [],
            validSubject: true,
            validDistributors: true,
            filledPayment: true,
            validCVV: true,
            selectedDateRadio: 'sendNow',
            whenToSend: '',
            distributors: [],

            nodes: [],
            checked: [],
            expanded: [],
            idToPrice: {},

        }
    };

    openModal = () => {
        this.setState({
            modalOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };

    populateDataForNestedCheckboxesInParent = (nodes, checked, expanded, idToPrice) => {
        this.setState({
            nodes,
            checked,
            expanded,
            idToPrice,
            validDistributors: true
        }, this.calculateTotalPrice);
    };

    onCheck = (checked) => {
        let newNodes = [];
        let newChecked = [];
        this.state.nodes.forEach(node => {
            let temp = {};
            temp.children = [];
            node.children.forEach(childNode => {
                if(checked.indexOf(String(childNode.value)) !==-1) {
                    temp.value = node.value;
                    temp.label = node.label;
                    temp.children.push({
                        value: childNode.value,
                        label: childNode.label
                    });
                    newChecked.push(childNode.value)
                }
            });
            if(temp.value) {
                newNodes.push(temp);
            }
        })
        this.setState({ 
            checked: newChecked,
            nodes: newNodes
        }, this.calculateTotalPrice);
    };

    calculateTotalPrice = () => {
        let totalPrice = 0.00;
        this.state.checked.forEach(id => {
            totalPrice += Number(this.state.idToPrice[id]);
        });
        this.setState({
            totalPrice: totalPrice.toFixed(2)
        })
    }

    componentDidMount() {
        let userId = null;
        let flyerId = null;
        let flyerImageName = null;

        this.props.client.query({
            query: GET_FLYER_ID_AND_FLYER_IMAGE_NAME
        })
        .then((res)=>{
            flyerId = res.data.flyerId;
            flyerImageName = res.data.flyerImageName;

            return this.props.client.query({
                query: GET_ID
            })
        })
        .then(res => {
            userId = res.data.id;

            if(flyerId === null) {
                this.props.history.push('/dashboard/my-flyers');
            } else {
                this.setState({
                    loading: false,
                    userId: userId,
                    flyerId: flyerId,
                    flyerImageName: flyerImageName
                })
            }
        })

        // Check if app is in test state 
        this.props.client.query({
            query: GET_APP_TEST_STATE
        })
        .then(res=>{
            this.setState(state=>({...state, appTestState: res.data.appTestState}));
        });
    };

    componentWillUnmount() {
        this.props.client.mutate({
            mutation: SET_FLYER_ID_AND_FLYER_IMAGE_NAME,
            variables: {
                flyerId: '',
                flyerName: ''
            }
        })
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleInputChangeForSubject = (e) => {
        let validSubject = true;
        if(e.target.value === '') {
            validSubject = false
        } else {
            validSubject = true
        }
        this.setState({
            [e.target.name] : e.target.value,
            validSubject
        });
    }; 

    handleRadioChange = (e) => {
        let whenToSend = e.target.value === '' ? '' : Number(e.target.value);
        let selectedDateRadio = e.target.id;
        this.setState(state=>({
            ...state,
            whenToSend: whenToSend,
            selectedDateRadio: selectedDateRadio
        }));
    };

    datePickerChange = (date) => {
        this.setState({
            whenToSend: Number(date.format('x')),
            selectedDateRadio: 'sendLater'
        })
    };

    handleCardExpDateMonth = (e) => {
        if(e.target.value > 0 && e.target.value < 13) {
            this.setState({
                [e.target.name] : e.target.value
            })
        }
        if(e.target.value === '') {
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    };

    handleCardExpDateYear = (e) => {
        if(/^\d+$/.test(e.target.value) || e.target.value === "") {
            if(e.target.value <= 2200) {
                this.setState({
                    [e.target.name] : e.target.value
                });
            }
        }
    };

    handleOnlyNumbersInput = (e) => {
        if(/^\d+$/.test(e.target.value) || e.target.value === "") {
            this.setState({
                [e.target.name] : e.target.value
            });
        }
    };

    placeOrder = () => {
        this.props.client.mutate({
            mutation: placeOrder,
            variables: {
                id: Number(this.state.userId),
                accessToken: tokenControl.getToken(),
                campaign_name: this.state.senderName,
                campaign_subject: this.state.emailSubject,
                campaign_send_date: String(this.state.whenToSend),
                campaign_price: String(this.state.totalPrice),
                campaign_list: this.state.checked.map(id => Number(id)),
                flyer_id: this.state.flyerId,
                card: String(this.state.creditCardNumber),
                cvv2: String(this.state.cvv),
                expdate: this.state.expMM <= 9 ? `0${this.state.expMM}${this.state.expYYYY}` : `${this.state.expMM}${this.state.expYYYY}`,
                creditcardtype: this.state.creditcardtype,
                zip_code: String(this.state.zip)
            }
        })
        .then(res=>{
            let {errors} = JSON.parse(res.data.placeOrder);
            if(errors === 0) {
                this.props.history.push('/dashboard/my-campaigns');
            } else {
                const paymentErrors = JSON.parse(res.data.placeOrder);
                this.setState({
                    paymentErrors: [...paymentErrors.errors],
                    filledPayment: true,
                    validCVV: true,
                    loading: false
                });
            }
        })
        .catch(err=>console.log(err))
    };

    handleSubmit = () => {
        this.setState({loading: true})
        if(this.state.checked.length !== 0) {
            if(this.state.emailSubject !== ''){

                // app test state if in test we just 
                if(this.state.appTestState) {

                    this.placeOrder();

                } else {
                    // app is not in test state check credit cards data
                    if(this.state.creditCardNumber !== '' && 
                    this.state.cvv !== '' &&
                    this.state.expMM !== '' &&
                    this.state.expYYYY !== '' && 
                    this.state.zip !== '') {
                        if(this.state.cvv.length === 3 || this.state.cvv.length === 4) {
                            this.placeOrder();
                        } else {
                            // invalid cvv number
                            this.setState({
                                validCVV: false,
                                loading: false
                            });
                        }
                    } else {
                        // if at least one payment field is empty
                        this.setState({
                            filledPayment: false,
                            loading: false
                        })
                    }
                }
            } else {
                // if subject filed is empty
                this.setState({
                    validSubject: false,
                    loading: false
                });
            }

        } else {
            // if no distributors where selected
            this.setState({
                validDistributors: false,
                loading: false
            })
        }
    };

    render() {
        if(this.state.loading) return <Loading />

        return (
            <div className="wrapper">
                <h1 className="campaign__heading">Email flyer</h1>
                <div className="campaign">

                {this.state.modalOpen && <CampaignStateModal
                                            populateDataForNestedCheckboxesInParent={this.populateDataForNestedCheckboxesInParent}
                                            userId={this.state.userId}
                                            closeModal={this.closeModal} />}

                    <div className="campaign__body">
                        <div className="campaign__image">
                            <img 
                                src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.state.userId}/template/${this.state.flyerImageName}`} 
                                alt="Flyer Preview"/>
                        </div>
                        <div className="campaign__settings">
                            <h4 className="campaign__sub-heading">Campaign settings</h4>
                            <div>
                                <label htmlFor="senderName" className="campaign__label_1">Sender name</label>
                                <input 
                                    type="text"
                                    className="input input_campaign"
                                    placeholder="Sender name"
                                    value={this.state.senderName}
                                    onChange={this.handleInputChange}
                                    name="senderName"
                                    id="senderName"
                                    />
                            </div>
                            <div>
                                <label htmlFor="emailSubject" className="campaign__label_1">Email subject</label>
                                <input 
                                    type="text"
                                    className="input input_campaign"
                                    placeholder="Email subject"
                                    value={this.state.emailSubject}
                                    onChange={this.handleInputChangeForSubject}
                                    name="emailSubject"
                                    id="emailSubject"
                                    />
                                {!this.state.validSubject && <div className="input__error">Email subject required</div>}
                            </div>
                            <div>
                                <label className="campaign__label_1">When to send</label>
                                <div className="campaign__radio-container">
                                    <input
                                        checked={this.state.selectedDateRadio === "sendNow"} 
                                        id="sendNow" 
                                        name="whenToSend" 
                                        type="radio" 
                                        value={''}
                                        className="campaign__radio"
                                        onChange={this.handleRadioChange}
                                        />
                                    <label htmlFor="sendNow" className="campaign__fake-radio"><div></div></label>
                                    <label htmlFor="sendNow" className="campaign__label_2">Send now</label>
                                </div>
                                <div className="campaign__radio-container">
                                    <input 
                                        checked={this.state.selectedDateRadio === "sendLater"} 
                                        id="sendLater" 
                                        name="whenToSend" 
                                        type="radio" 
                                        value={Date.now()}
                                        className="campaign__radio"
                                        onChange={this.handleRadioChange}
                                        />
                                    <label htmlFor="sendLater" className="campaign__fake-radio"><div></div></label>
                                    <label htmlFor="sendLater" className="campaign__label_2">Schedule for sending at a specific date & time</label>
                                </div>
                                <div className="campaign__datepicker">
                                    <DatePicker
                                        id="datePicker"
                                        selected={this.state.whenToSend === '' ? moment(Date.now()) : moment(this.state.whenToSend)} 
                                        value={this.state.whenToSend === '' ? 'Send now' : moment(this.state.whenToSend).format("MM/DD/YYYY HH:mm A")} 
                                        onChange={this.datePickerChange} />
                                    <label className="campaign__datepicker-btn" htmlFor="datePicker"></label>
                                </div>
                                <div className="campaign__payment">
                                    <h4 className="campaign__sub-heading">Payment</h4>
                                    {!this.state.filledPayment && <div className="input__error">Please fill all the payment data</div>}
                                    {this.state.paymentErrors.length > 0 && (
                                        <ul>
                                            {this.state.paymentErrors.map((err, i) => {
                                                return <li key={i} className="input__error">{err}</li>
                                            })}
                                        </ul>
                                    )}
                                    <div>
                                        <label htmlFor="creditCardNumber" className="campaign__label_1">Credit card number</label>
                                        <input 
                                            type="text"
                                            className="input input_campaign"
                                            placeholder="Credit card number"
                                            value={this.state.creditCardNumber}
                                            onChange={this.handleOnlyNumbersInput}
                                            name="creditCardNumber"
                                            id="creditCardNumber"
                                            />
                                    </div>
                                    <div className="campaign__cvv-expires">
                                        <div>
                                            <label htmlFor="cvv" className="campaign__label_1">CVV</label>
                                            <input 
                                                type="text"
                                                className="input input_campaign"
                                                placeholder="CVV"
                                                value={this.state.cvv}
                                                onChange={this.handleOnlyNumbersInput}
                                                name="cvv"
                                                id="cvv"
                                                />
                                        </div>
                                        <div>
                                            <label className="campaign__label_1">Expires</label>
                                            <input 
                                                type="text"
                                                className="input input_campaign"
                                                placeholder="MM"
                                                value={this.state.expMM}
                                                onChange={this.handleCardExpDateMonth}
                                                name="expMM"
                                                id="expMM"
                                                />
                                        </div>
                                        <div>
                                            <input 
                                                type="text"
                                                className="input input_campaign input_campaign_yyyy"
                                                placeholder="YYYY"
                                                value={this.state.expYYYY}
                                                onChange={this.handleCardExpDateYear}
                                                name="expYYYY"
                                                id="expYYYY"
                                                />
                                        </div>
                                    </div>
                                    {!this.state.validCVV && <div className="input__error">Invalid CVV it must be 3 or 4 characters long</div>}
                                    <div>
                                        <div>
                                            <label htmlFor="creditcardtype" className="campaign__label_1">Credit card type</label>
                                            <select 
                                                className="input input_state campaign__select"
                                                id="creditcardtype"
                                                name="creditcardtype" 
                                                type="text"
                                                value={this.state.creditcardtype}
                                                onChange={this.handleInputChange}
                                                >
                                                <option value="Visa">VISA</option>
                                                <option value="MasterCard">MasterCard</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="zip" className="campaign__label_1">Billing ZIP code</label>
                                            <input 
                                                type="text"
                                                className="input input_campaign"
                                                placeholder="ZIP"
                                                value={this.state.zip}
                                                onChange={this.handleOnlyNumbersInput}
                                                name="zip"
                                                id="zip"
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="campaign__recipients">
                            <div className="campaign__recipients-subheading">
                                <h4 className="campaign__sub-heading">Recipients</h4>
                                <button className="btn_2 btn_2_campaign" onClick={this.openModal}>add</button>
                            </div>
                            <div className="campaign__recipients-message">
                                <p>For best results, we recommend targeting agents in the same region as where your listing is located</p>
                            </div>
                            <h4 className="campaign__sub-heading">Selected distribution lists:</h4>
                            <div>
                                {
                                    this.state.nodes.length !== 0 && (
                                        <div className="campaign__checkbox-tree checkbox-tree">
                                            <div className="campaign__checkbox-tree-scrollbar">
                                            <CheckboxTree 
                                                nodes={this.state.nodes}
                                                checked={this.state.checked}
                                                expanded={this.state.expanded}
                                                onCheck={this.onCheck}
                                                onExpand={expanded => this.setState({ expanded })}
                                            />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {!this.state.validDistributors && <div className="input__error">Select at least one distributor please</div>}
                            <div>Total: {this.state.totalPrice}</div>
                        </div>
                    </div>
                    <div className="campaign__order-price">
                        <div className="campaign__order-summary">Your order summary:</div>
                        <div>${this.state.totalPrice}</div>
                        <button className="btn_3 btn_3_campaign-order" onClick={this.handleSubmit}>Place order</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(Campaign);