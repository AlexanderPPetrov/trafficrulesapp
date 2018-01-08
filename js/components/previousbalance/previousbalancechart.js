import React, {Component} from "react";
import {
    VictoryChart,
    VictoryArea,
    VictoryScatter,
    VictoryAxis,
    VictoryLabel,
    VictoryZoomContainer
} from 'victory-native';
import {View, Text, Dimensions} from 'react-native';
import I18n from '../../../i18n/i18n';
import styles from "./styles";
import ColorScheme from "../../common/colorscheme";
import Ui from '../../common/ui';
import Api from '../../../Api';

import {Svg} from 'expo';

const {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} = Svg;

class PreviousBalanceChart extends Component {

    constructor(props) {
        super(props)
        let {width, height} = Dimensions.get('window');
        // this.state = {
        //     zoomDomain: { x: [this.props.balance[0], this.props.balance[this.props.balance.length - 1]] },
        //     selectedDomain: { x: [this.props.balance[0], this.props.balance[this.props.balance.length - 1]] }
        // };
    }

    componentDidMount = () => {

    }

    handleZoom = (domain) => {
        this.setState({selectedDomain: domain});
    }

    handleBrush = (domain) => {
        this.setState({zoomDomain: domain});
    }

    getDate = (x, index) => {
        var label = '';
        if (index == 0 || index == (this.props.balance.length - 1) ) {
            label = x.split(' ')[0]
        }
        return label;
    }

    render() {

        return (
            <View style={styles.pieChartContainer}>
                <Text style={Ui.cardHeader}>
                    {I18n.t('currentBalance')} {this.props.currentBalance} {this.props.currency}
                </Text>

                <VictoryChart scale={{x: "time", y: "linear"}} responsive={true}
                              padding={{top: 30, left: 60, bottom: 30, right: 60}}>
                    <VictoryArea
                        interpolation={"catmullRom"}
                        style={{
                            data: {
                                stroke: ColorScheme.chartBalance,
                                fill: ColorScheme.chartBalance,
                                fillOpacity: 0.5
                            },
                            parent: {border: "1px solid " + ColorScheme.chartBalance, overflow: 'visible'}
                        }}
                        data={this.props.balance}
                    />
                    <VictoryScatter data={this.props.balance}
                                    size={3}
                                    style={{
                                        data: {
                                            fill: ColorScheme.neutralLight,
                                            stroke: ColorScheme.chartBalance,
                                            strokeWidth: 1
                                        }
                                    }}
                    />

                    <VictoryArea
                        interpolation={"catmullRom"}
                        style={{
                            data: {
                                stroke: ColorScheme.chartChange,
                                fill: ColorScheme.chartChange,
                                fillOpacity: 0.5
                            },
                            parent: {border: "1px solid " + ColorScheme.chartChange, overflow: 'visible'}
                        }}
                        data={this.props.change}
                    />
                    <VictoryScatter data={this.props.change}
                                    size={3}
                                    style={{
                                        data: {
                                            fill: ColorScheme.neutralLight,
                                            stroke: ColorScheme.chartChange,
                                            strokeWidth: 1
                                        }
                                    }}
                    />
                    <VictoryAxis dependentAxis style={{
                        axis: {
                            stroke: ColorScheme.lighter
                        },
                        grid: {
                            stroke: 'rgba(0, 0, 0, 0.1)',
                            strokeWidth: 1,
                            strokeDasharray: '5, 5',
                        },
                        tickLabels: {
                            fontSize: '12',
                            fontFamily: 'Roboto_light',
                            padding: 5,
                            fill: ColorScheme.dark
                        }
                    }}
                                 tickFormat={(y) => parseFloat(y).toFixed(2)}
                    />
                    <VictoryAxis
                        tickFormat={(x, i) => this.getDate(x, i)}
                        style={{
                            axis: {
                                stroke: ColorScheme.lighter
                            },
                            tickLabels: {
                                fontSize: '12',
                                fontFamily: 'Roboto_light',
                                padding: 5,
                                fill:ColorScheme.dark
                            }
                        }}
                    />
                </VictoryChart>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingBottom: 10,
                    paddingRight: 10
                }}>
                    <View style={{
                        width: 10,
                        height: 10,
                        marginTop: 5,
                        marginLeft: 15,
                        marginRight: 7,
                        backgroundColor: ColorScheme.chartBalance
                    }}></View>
                    <Text style={styles.legendLabel}>{I18n.t('balance')}</Text>
                    <View style={{
                        width: 10,
                        height: 10,
                        marginTop: 5,
                        marginLeft: 15,
                        marginRight: 7,
                        backgroundColor: ColorScheme.chartChange
                    }}></View>
                    <Text style={styles.legendLabel}>{I18n.t('change')}</Text>
                </View>
            </View>


        );
    }
}


export default PreviousBalanceChart;
