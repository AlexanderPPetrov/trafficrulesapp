import React, {Component} from "react";
import {Text} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';

let currencies = ['usd', 'btc', 'eur', 'inr', 'gbp'];

class CurrencyIcon extends Component {

    constructor(props){
        super(props)
    }
    getCurrencyIcon = () => {
        console.log(this.props.currency)

        if (currencies.indexOf(this.props.currency) != -1) {
            let iconName = 'currency-' + this.props.currency
            return <MaterialCommunityIcons name={iconName} size={this.props.size} color={this.props.color}/>
        }

        return <Text style={{color: this.props.color, fontSize: this.props.size*0.84}}>{this.props.currency}</Text>

    }

    render() {
        return this.getCurrencyIcon()
    }
}

export default CurrencyIcon;