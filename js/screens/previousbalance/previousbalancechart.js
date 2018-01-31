import React, {Component} from "react";
import {
    VictoryChart,
    VictoryArea,
    VictoryScatter,
    VictoryAxis,
    VictoryLine,
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

        console.log(this.props.maxValue, this.props.maxValue)
    }

    componentDidMount = () => {

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
                <VictoryChart scale={{x: "time", y: "linear"}} height={300}
                               padding={{top: 45, left: 60, bottom: 45, right: 60}}
                >
                    <Defs>
                        <LinearGradient id="gradient1"
                                        x1="0%" y1="0%" x2="0%" y2="100%"
                        >
                            <Stop offset="0%" stopColor={ColorScheme.chartBalance}/>
                            <Stop offset="100%" stopColor={'rgba(255, 255, 255, 0.5)'}/>
                        </LinearGradient>

                    </Defs>
                    <VictoryAxis crossAxis={false} dependentAxis style={{
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
                        offsetY={45}
                        tickFormat={(x, i) => this.getDate(x, i)}
                        style={{
                            axis: {
                                stroke: ColorScheme.lighter
                            },
                            tickLabels: {
                                fontSize: '12',
                                fontFamily: 'Roboto_light',
                                padding: 15,
                                fill:ColorScheme.dark
                            }
                        }}
                    />
                    <VictoryArea key={0}
                        interpolation={"catmullRom"}
                        style={{
                            data: {
                                stroke: ColorScheme.chartBalance,
                                fill: "url(#gradient1)",
                                fillOpacity: 0.5
                            }
                        }}
                        data={this.props.balance}
                        y0={() => this.props.minValue}
                    />


                    <VictoryLine key={1}
                                 interpolation={"catmullRom"}
                        style={{
                            data: {
                                stroke: ColorScheme.chartChange,
                                fillOpacity: 0.5
                            }
                        }}
                        data={this.props.change}
                        y0={() => this.props.minValue}

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
                                    y0={() => this.props.minValue}
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
                                    y0={() => this.props.minValue}
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
