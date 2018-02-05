import React, {Component} from "react";
import {VictoryPie,VictoryContainer, VictoryPortal, VictoryLabel} from 'victory-native';
import {View, Text, Dimensions, AsyncStorage} from 'react-native';
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import ColorScheme from "../../common/colorscheme";
import Ui from '../../common/ui';


class PieChartBalance extends Component {

    constructor (props) {
        super(props)
        let {width, height} = Dimensions.get('window');
        let chartWidth = width*0.7;
        let labelRadius = chartWidth*0.6;
        let innerRadius = (chartWidth*0.5)*0.65;
        let padding = (width - chartWidth)*0.5;
        this.state = {
            width:width,
            pieHeight:width,
            labelRadius:labelRadius,
            innerRadius:innerRadius,
            padding: padding,
            currency:''
        };
    }

    componentDidMount (){
        AsyncStorage.getItem('accountSettings').then((value) => {
            this.setState({
                currency:JSON.parse(value)._currency
            })
        });
    }
    render() {


        return (
            <View style={styles.pieChartContainer}>
                <Text style={Ui.cardHeader}>
                    {I18n.t('distributionIn')} {this.state.currency}
                </Text>
                <View style={{paddingTop:15}} pointerEvents="none">
                    <VictoryPie
                        style={{
                            data: {
                                // stroke: (data) => data.y > 75 ? ColorScheme.light : ColorScheme.darker
                                // stroke: ColorScheme.darkest
                            }
                        }}
                        padding={{left: this.state.padding, right: this.state.padding }}
                        width={this.state.width}
                        height={this.state.pieHeight}
                        padAngle={1}
                        startAngle={45}
                        endAngle={405}
                        renderInPortal={true}
                        labelComponent={<VictoryPortal style={{
                            fill:ColorScheme.dark,
                            fontSize:"18",
                            fontFamily:'Roboto_light'
                            }}><VictoryLabel/></VictoryPortal>}
                        innerRadius={this.state.innerRadius}
                        colorScale={[ColorScheme.BTC, ColorScheme.USD, ColorScheme.GBP, ColorScheme.EUR, ColorScheme.P, ColorScheme.INR]}
                        data={this.props.data}
                    />
                </View>
            </View>

        );
    }
}


export default PieChartBalance;
