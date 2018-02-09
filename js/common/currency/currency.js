import React, {Component} from "react";
import {Text} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';

let currencies = ['usd', 'btc', 'eur', 'inr', 'gbp'];

class CurrencyIcon extends Component {

    constructor(props){
        super(props)
    }
    getCurrencyIcon = () => {

        if(!this.props.currency){
            return null;
        }
        if (currencies.indexOf(this.props.currency.toLowerCase()) != -1) {
            let iconName = 'currency-' + this.props.currency.toLowerCase()
            return <MaterialCommunityIcons name={iconName} size={this.props.size} color={this.props.color}/>
        }

        return <Text style={{color: this.props.color, fontSize: this.props.size*0.9}}>{this.props.currency}</Text>

    }

    render() {
        return this.getCurrencyIcon()
    }
}

export default CurrencyIcon;