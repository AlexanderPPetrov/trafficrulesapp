import React, {Component} from "react";

import { Svg } from 'expo';
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
    Text,
    Use,
    Defs,
    Stop
} = Svg;

class Logo extends Component {

    render() {

        return (

            <Svg  style={{ flex: 1 }} id="Layer_1" xmlns="http://www.w3.org/2000/svg" width={this.props.scale*500} height={this.props.scale*100}>
                <G scale={this.props.scale}>
                    <Path fill="#BE1E2D" d="m139.9 57.8c-5.9 7.1-23.2 24.1-51.9 33.8-14.8 5-41.6 4.9-50.2-7.4 0-0.1-0.1-0.1-0.1-0.2s-0.1-0.1-0.1-0.1c-0.2-0.3-0.3-0.5-0.5-0.8 0 0 5.9 1.6 14.1 1.3h0.9c8.6-0.5 18.1-2.8 26.9-6.1 6.5-2.5 12.7-5.5 17.7-8.7 12.3-7.8 24.4-17.1 33-29.7 9.5-13.9 11.1-32.1 7.3-38.1-0.2-0.3-0.4-0.6-0.6-0.8 0.1 0.1 7.2 2.7 12.4 15.5 2.1 5.5 5.8 23.6-8.9 41.3z"/>
                    <Path fill="#EF4927" d="m60.6 7.3c-0.6 1.5-0.9 2.2-1.3 3.3-2.1 5.3-2.6 6.7-4.5 13.7-2.8 10-4.5 19.1-4.5 19.2l-0.4 2.2-3.8-3c0.1-0.5 1.5-9.5 4.3-19.5 2.5-9 6.4-18.5 6.9-19-0.1-0.1 3.3 3.1 3.3 3.1z"/>
                    <Path fill="#BE1E2D" d="m57.1 4.2v0c-3.7 9.8-4.1 10-6.6 19-2.8 10-4.5 18.9-4.6 19.5l-23.7-23.7c12.7-6.2 33.1-14.1 34.8-14.7l0.1-0.1z"/>
                    <Path fill="#BE1E2D" d="m37.4 90c-4-1.8-14.6-7.1-20-12.8-5.9-6.1-9.4-15.5-7.6-26.8s9.7-22.4 9.7-22.4c-0.8-0.5-6-4.1-6-4.1 0.5-0.4 1-0.7 1.7-1.1l21.6 18.1c-9.2 15.1-9.9 24.2-9 30 0.8 5.2 2.3 9.1 3.9 12.1-0.2-0.1-0.3-0.1-0.3-0.1 1.6 2.7 3.7 5.1 6 7.1z"/>
                    <Path fill="#EF4927" d="m155.2 28.5c0.1 9.3-2.7 20.9-11.9 32-3.3 3.9-21.1 24-53.8 35.1-5.8 2-13.3 3.2-20.6 3.3h-2.8-1.3-0.2c-0.5 0-0.9 0-1.4-0.1-1.5-0.1-3-0.2-4.4-0.4-0.5-0.1-0.9-0.1-1.4-0.2s-0.9-0.1-1.4-0.2c-0.7-0.1-1.4-0.2-2-0.4-0.7-0.1-1.3-0.3-2-0.5-0.6-0.2-1.3-0.3-1.9-0.5-4.7-1.7-7.2-3.4-11.4-6.1-0.7-0.4-4-2.5-6.9-7.7-1.6-2.9-3.9-6.6-4.6-11.8-0.9-5.8 0.4-19.2 11.5-34.6l4.3 3.5c-0.3 0-2.5 3.4-2.7 3.7-6.5 10.8-9.5 19.5-8.1 26.5 1.6 7.9 5.6 13.7 5.6 13.7l0.1 0.1c0 0.1 0.1 0.1 0.1 0.2 8.6 12.2 35.4 12.4 50.2 7.4 28.6-9.7 46-26.7 51.9-33.8 14.6-17.6 11-35.8 8.7-41.3-4.7-11.1-11.1-14.7-12.5-15.4 2.7-0.2 8.4 1.6 11.7 5.6 1.4 1.7 3 4 4.7 8.2 1.3 3.3 2.4 8.1 2.5 13.7z"/>
                    <Path fill="#BE1E2D" d="m38.6 90.6c-0.1 0-0.2-0.1-0.4-0.2s-0.5-0.2-0.8-0.3c-2.3-2-4.3-4.4-6-7.2 0 0 0.1 0 0.3 0.1 2.9 5.1 6.2 7.2 6.9 7.6z"/>
                    <Path fill="#BE1E2D" d="m139.9 57.8c-5.9 7.1-23.2 24.1-51.9 33.8-14.8 5-41.6 4.9-50.2-7.4 8.7 8.1 8.5 2.5 14.7 2.5 0.3 0 0-1-0.4-2.2 0-0.1 0-0.1-0.1-0.2 8.6-0.5 18.1-2.8 26.9-6.1 1.3 0.1 2.6 0.1 4 0 5.1-0.2 10.1-1.1 14-2.6 18.4-7.1 30.6-18.6 36.5-25.6 1-1.2 1.8-2.2 2.5-3.1 11-15 8.3-30.4 6.6-35.1-1.8-4.9-3.9-8.1-5.6-10.1-0.2-0.3-0.4-0.6-0.6-0.8 0 0 7.2 2.7 12.4 15.5 2.2 5.6 5.9 23.7-8.8 41.4z"/>
                    <LinearGradient id="g" x1="18.053" x2="36.053" y1="25.122" y2="69.466" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F16522" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.3203"/>
                        <Stop stopColor="#F89D3A" offset="0.5918"/>
                        <Stop stopColor="#FAAF44" offset="0.8286"/>
                        <Stop stopColor="#FBB548" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#g)" d="m57.1 4.2v0c-3.7 9.8-4.1 10-6.6 19-2.8 10-4.5 18.9-4.6 19.5-2.5-2.2-7.1-5.1-7.1-5.1-0.7 1.1-1.4 2.2-2.1 3.3-9.2 15.1-9.9 24.2-9 30 0.8 5.2 2.3 9.1 3.9 12.1 2.9 5.2 6.2 7.3 6.9 7.7-0.1 0-0.2-0.1-0.4-0.2s-0.5-0.2-0.8-0.3c-4-1.8-14.6-7.1-20-12.8-5.9-6.1-9.4-15.5-7.6-26.8s9.8-22.6 9.8-22.6c-0.8-0.5-6-4.1-6-4.1 0.5-0.4 1-0.7 1.7-1.1 1.8-1.1 4.1-2.4 6.9-3.7 12.8-6.3 33.2-14.2 34.9-14.8l0.1-0.1z"/>
                    <LinearGradient id="f" x1="11.453" x2="29.017" y1="29.596" y2="72.865" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F16522" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.3203"/>
                        <Stop stopColor="#F89D3A" offset="0.5918"/>
                        <Stop stopColor="#FAAF44" offset="0.8286"/>
                        <Stop stopColor="#FBB548" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#f)" d="m56.7 4.4c-1.4 1.1-2.8 2.3-4.1 3.3-24.9 20.9-30.6 36.1-31.8 46.5-1.1 9.3-0.2 16.9 1.5 22.8 0.6 2.2 1.3 4.2 2.1 5.9-2.6-1.8-5.1-3.7-7-5.7-5.9-6.1-9.4-15.5-7.6-26.8s9.7-22.4 9.7-22.4c-0.8-0.5-6-4.1-6-4.1 0.5-0.4 1-0.7 1.7-1.1 1.8-1.1 4.1-2.4 6.9-3.7 12.2-6 31.5-13.5 34.6-14.7z"/>
                    <LinearGradient id="e" x1="18.319" x2="35.52" y1="47.547" y2="76.242" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F16522" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.345"/>
                        <Stop stopColor="#F68D33" offset="0.5217"/>
                        <Stop stopColor="#F9A643" offset="0.8966"/>
                        <Stop stopColor="#F9A946" stopOpacity="0.3" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#e)" d="m56.7 4.4c-1.4 1.1-2.8 2.2-4.1 3.3-24 22.3-30.4 32.2-33 46-1.7 9.2-0.1 16.6 1.5 22.5 0.6 2.2 2.5 4.9 3.3 6.7-2.6-1.8-5.1-3.7-7-5.7-5.9-6.1-9.4-15.5-7.6-26.8s9.7-22.4 9.7-22.4c-0.8-0.5-6-4.1-6-4.1 0.5-0.4 1-0.7 1.7-1.1 1.8-1.1 4.1-2.4 6.9-3.7 12.2-6 31.5-13.5 34.6-14.7z"/>
                    <LinearGradient id="d" x1="63.51" x2="116.75" y1="29.64" y2="57.219" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F16522" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.1442"/>
                        <Stop stopColor="#F89D3A" offset="0.486"/>
                        <Stop stopColor="#FAAF44" offset="0.7842"/>
                        <Stop stopColor="#FBB548" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#d)" d="m139.9 57.8c-5.9 7.1-23.2 24.1-51.9 33.8-14.8 5-41.6 4.9-50.2-7.4 0-0.1-0.1-0.1-0.1-0.2s-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.3-0.3-0.4s-0.2-0.2-0.2-0.4c0 0 5.9 1.6 14.1 1.3h0.9c8.6-0.5 18.1-2.8 26.9-6.1 6.5-2.5 12.7-5.5 17.7-8.7 12.3-7.8 24.4-17.1 33-29.7 9.5-13.9 11.1-32.1 7.3-38.1-0.2-0.3-0.4-0.5-0.6-0.8 0 0 0.3 0.1 0.8 0.4 2 1.1 7.5 4.9 11.6 15.1 2.1 5.5 5.8 23.6-8.9 41.3z"/>
                    <LinearGradient id="c" x1="79.83" x2="134.43" y1="28.302" y2="92.215" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F05F22" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.1527"/>
                        <Stop stopColor="#F5862D" offset="0.1815"/>
                        <Stop stopColor="#F89938" offset="0.3009"/>
                        <Stop stopColor="#FAA740" offset="0.4397"/>
                        <Stop stopColor="#FBAF45" offset="0.614"/>
                        <Stop stopColor="#FBB146" offset="0.9366"/>
                        <Stop stopColor="#FAAC47" stopOpacity="0.1" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#c)" d="m133.3 51.6c-5.9 7.1-23.2 24.1-51.9 33.8-12.1 4.1-32.4 4.8-44-1.9-0.1-0.1-0.2-0.2-0.2-0.4 0 0 5.9 1.6 14.1 1.3h0.9c8.6-0.5 18.1-2.8 26.9-6.1 6.5-2.5 12.7-5.5 17.7-8.7 12.3-7.8 24.4-17.1 33-29.7 9.5-13.9 11.1-32.1 7.3-38.1-0.2-0.3-0.4-0.5-0.6-0.8 0 0 0.3 0.1 0.8 0.4 1.7 2.2 3.4 5.1 5 9 2 5.4 5.6 23.6-9 41.2z"/>
                    <LinearGradient id="b" x1="61.655" x2="143.42" y1="-1.657" y2="94.064" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F05F22" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.1527"/>
                        <Stop stopColor="#F4822D" offset="0.1586"/>
                        <Stop stopColor="#F79C51" offset="0.2314"/>
                        <Stop stopColor="#FAB270" offset="0.31"/>
                        <Stop stopColor="#FCC589" offset="0.3963"/>
                        <Stop stopColor="#FDD39C" offset="0.4923"/>
                        <Stop stopColor="#FEDDAA" offset="0.6032"/>
                        <Stop stopColor="#FFE2B2" offset="0.7423"/>
                        <Stop stopColor="#FFE4B4" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#b)" d="m67.3 93.5c-12.1 0-21.7-2.8-26.8-8l-0.5-0.6 0.8 0.1c3.4 0.5 7 0.7 10.6 0.6h0.9c8.2-0.5 17.9-2.7 27.2-6.2 6.5-2.5 12.7-5.5 17.9-8.8 9.7-6.2 23.8-16 33.3-30 8.2-12 10.7-27.1 8.9-35.3l-0.2-0.8 0.6 0.6c2.1 2 5.1 5.7 7.7 11.9 2.8 6.9 4.6 24.1-8.6 40.1-3.1 3.7-20.1 22.8-51.3 33.4-5.8 1.8-13.2 3-20.5 3zm-25.8-7.9c5.2 4.7 14.3 7.3 25.9 7.3 7.2 0 14.5-1.1 20.2-3 31.1-10.6 48-29.5 51.1-33.3 13-15.7 11.3-32.7 8.5-39.5-2.3-5.6-4.9-9.1-6.9-11.1 1.5 8.4-1.1 23.2-9.1 34.8-9.6 14.1-23.7 23.9-33.5 30.1-5.2 3.3-11.4 6.3-18 8.8-9.4 3.6-19.1 5.8-27.4 6.2h-0.9c-3.4 0.3-6.7 0.2-9.9-0.3z"/>
                    <LinearGradient id="a" x1="10.982" x2="61.207" y1="31.602" y2="90.398" gradientTransform="matrix(1 0 0 -1 0 102)" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F05F22" offset="0"/>
                        <Stop stopColor="#F4802A" offset="0.1527"/>
                        <Stop stopColor="#F4822D" offset="0.1586"/>
                        <Stop stopColor="#F79C51" offset="0.2314"/>
                        <Stop stopColor="#FAB270" offset="0.31"/>
                        <Stop stopColor="#FCC589" offset="0.3963"/>
                        <Stop stopColor="#FDD39C" offset="0.4923"/>
                        <Stop stopColor="#FEDDAA" offset="0.6032"/>
                        <Stop stopColor="#FFE2B2" offset="0.7423"/>
                        <Stop stopColor="#FFE4B4" offset="1"/>
                    </LinearGradient>
                    <Path fill="url(#a)" d="m32.4 86.3l-0.9-0.5c-4.1-2.2-9.7-5.7-13.3-9.4-6.2-6.5-8.9-15.9-7.3-25.7 1.7-10.8 9.5-21.9 9.6-22l0.7-1-1-0.7c-0.5-0.3-2.6-1.8-4.2-2.9l-0.3-0.2 0.3-0.2c1.6-1 4-2.2 6.7-3.6 9.8-4.8 24.2-10.6 31.8-13.6l0.5-0.2-0.9 2.3c-2.1 5.3-2.7 6.9-4.7 14.2-2 7.2-3.5 13.9-4.1 17.2l-0.1 0.4-0.3-0.2c-2.4-1.9-5.2-3.6-5.3-3.7l-1-0.6-0.6 1c-0.6 1-1.4 2.1-2.1 3.3-7.6 12.2-10.6 22.3-9.3 30.8 0.7 4.7 2.1 8.9 4 12.5 0.4 0.7 0.8 1.3 1.2 1.9l0.6 0.9zm-15.8-62.4c1.5 1.1 3.4 2.4 3.9 2.6l1.5 1-1 1.4c-0.1 0.1-7.8 11.1-9.5 21.8-1.5 9.7 1.1 18.9 7.2 25.3 3.2 3.4 8.3 6.6 12.3 8.8-0.2-0.4-0.4-0.7-0.6-1.1-2-3.6-3.4-7.9-4.1-12.7-1.3-8.6 1.7-18.8 9.2-31.1 0.7-1.1 1.4-2.3 2.1-3.3l0.9-1.4 1.4 0.9c0.1 0.1 2.7 1.7 5.1 3.5 0.7-3.5 2.2-9.9 4.1-16.9 2-7.3 2.6-8.9 4.7-14.3l0.5-1.3c-7.8 3.1-21.6 8.7-31.2 13.3-2.7 1.4-4.9 2.5-6.5 3.5z"/>
                    <Path fill={this.props.primary} d="m69.5 57c-1.9 0-3.8-0.4-5.8-1.2v-8.1c0.8 0.7 1.6 1.1 2.4 1.3s1.9 0.3 3.4 0.3c2.2 0 3.9-0.7 5.1-2s1.8-2.9 1.8-4.7c0-2-0.6-3.6-1.8-5s-2.9-2.1-5-2.1c-1.9 0-3.5 0.5-4.9 1.6s-2.2 2.5-2.5 4.2v32.4h-8.9v-32.5c0-4.4 1.6-7.9 4.8-10.6s7-4 11.4-4c4.9 0 8.7 1.5 11.4 4.5s4.1 6.6 4.1 10.8c0 4.1-1.4 7.7-4.1 10.7-2.7 2.9-6.5 4.4-11.4 4.4z"/>
                    <Path fill={this.props.primary} d="m102.4 26.6v7.7c-2.5 0-4.2 0.5-5.3 1.3-1.1 0.9-1.6 2.2-1.6 4v16.7h-8.1v-16.7c0-4.3 1.2-7.6 3.5-9.8 2.3-2.1 6.1-3.2 11.5-3.2z"/>
                    <Path fill={this.props.primary} d="m137 39.3c0-4.6 1.5-7.9 4.6-9.8s6.1-2.9 9-2.9c2.4 0 4.4 0.3 6 1s2.9 1.4 4 2.2c1-1 2.3-1.8 4-2.4s3.4-0.8 5.2-0.8c3.9 0 7.3 1.1 10.2 3.2 2.9 2.2 4.3 5.3 4.3 9.4v17h-8.1v-17c0-1.6-0.6-2.8-1.7-3.8-1.2-0.9-2.5-1.4-4-1.4-1.6 0-2.9 0.4-4 1.3s-1.7 2.1-1.7 3.8v17h-8.1v-16.9c0-1.6-0.6-2.8-1.7-3.7s-2.5-1.3-4-1.3c-1.6 0-3 0.4-4.1 1.3s-1.7 2.1-1.7 3.7v17.1h-8.2v-17z"/>
                    <Path fill={this.props.primary} d="m190.3 17.5c-0.8-0.9-1.2-1.9-1.2-3.1s0.4-2.3 1.2-3.2 1.9-1.3 3.3-1.3 2.5 0.4 3.3 1.3 1.2 1.9 1.2 3.2c0 1.2-0.4 2.2-1.1 3.1s-1.9 1.3-3.4 1.3c-1.3 0.1-2.5-0.4-3.3-1.3zm-0.7 9.1h8.1v29.6h-8.1v-29.6z"/>
                    <Path fill={this.props.primary} d="m202.8 44.5v-17h8.1v17c0 1.6 0.6 2.8 1.7 3.7s2.5 1.3 4.1 1.3 3-0.4 4.1-1.3 1.7-2.1 1.7-3.7v-17h8.1v17c0 4-1.4 7.1-4.1 9.4-2.7 2.2-6 3.4-9.8 3.4s-7.1-1.1-9.8-3.4c-2.7-2.2-4.1-5.4-4.1-9.4z"/>
                    <Path fill={this.props.primary} d="m232.6 39.3c0-4.6 1.5-7.9 4.6-9.8s6.1-2.9 9-2.9c2.4 0 4.4 0.3 6 1s2.9 1.4 4 2.2c1-1 2.3-1.8 4-2.4s3.4-0.8 5.2-0.8c3.9 0 7.3 1.1 10.2 3.2 2.9 2.2 4.3 5.3 4.3 9.4v17h-8.1v-17c0-1.6-0.6-2.8-1.7-3.8-1.2-0.9-2.5-1.4-4-1.4-1.6 0-2.9 0.4-4 1.3s-1.7 2.1-1.7 3.8v17h-8.1v-16.9c0-1.6-0.6-2.8-1.7-3.7s-2.5-1.3-4-1.3c-1.6 0-3 0.4-4.1 1.3s-1.7 2.1-1.7 3.7v17.1h-8.1l-0.1-17z"/>
                    <Path fill={this.props.secondary} d="m297.8 10l0.1 11h7.2v8.1l-7.2 0.1v27.1h-8l-0.1-27.1h-7.1v-8.1l7.1-0.1v-11h8z"/>
                    <Path fill={this.props.secondary} d="m322.8 26.6v7.7c-2.5 0-4.2 0.5-5.3 1.3-1.1 0.9-1.6 2.2-1.6 4v16.7h-8.1v-16.7c0-4.3 1.2-7.6 3.5-9.8 2.3-2.1 6.1-3.2 11.5-3.2z"/>
                    <Path fill={this.props.secondary} d="m345.4 26.7h7.9v29.8h-7.9v-1.2c-2.3 1.3-4.7 1.9-7.4 1.9-2.2 0-4.3-0.4-6.2-1.2s-4-2.4-6.2-4.7c-2.2-2.4-3.3-5.5-3.3-9.6 0-4 1.1-7.2 3.2-9.5 2.2-2.3 4.3-3.9 6.3-4.7 2.1-0.8 4.1-1.2 6.2-1.2 1.3 0 2.6 0.2 3.9 0.5 1.3 0.4 2.4 0.8 3.4 1.5v-1.6h0.1zm-13.2 20.4c1.5 1.5 3.4 2.3 5.6 2.3 2.3 0 4.1-0.7 5.5-2.2s2-3.2 2-5.4c0-2.1-0.7-3.9-2-5.4-1.4-1.5-3.2-2.2-5.5-2.2s-4.1 0.8-5.5 2.3-2.1 3.3-2.1 5.3 0.7 3.8 2 5.3z"/>
                    <Path fill={this.props.secondary} d="m371.8 26.6c1.8 0 3.8 0.4 5.8 1.2v8.1c-0.8-0.7-1.6-1.1-2.4-1.3s-1.9-0.3-3.4-0.3c-2.2 0-3.9 0.7-5.1 2s-1.8 2.9-1.8 4.7c0 2 0.6 3.6 1.8 5s2.9 2.1 5 2.1c1.8 0 3.5-0.5 4.9-1.6s2.2-2.5 2.5-4.2v-32.3h8.9v32.4c0 4.4-1.6 7.9-4.8 10.6s-7 4-11.4 4c-4.9 0-8.7-1.5-11.4-4.5s-4-6.6-4-10.7 1.4-7.7 4.1-10.8c2.6-2.9 6.4-4.4 11.3-4.4z"/>
                    <Path fill={this.props.secondary} d="m393.4 17.5c-0.8-0.9-1.2-1.9-1.2-3.1s0.4-2.3 1.2-3.2 1.9-1.3 3.3-1.3 2.5 0.4 3.3 1.3 1.2 1.9 1.2 3.2c0 1.2-0.4 2.2-1.1 3.1s-1.9 1.3-3.4 1.3c-1.3 0.1-2.4-0.4-3.3-1.3zm-0.7 9.1h8.1v29.6h-8.1v-29.6z"/>
                    <Path fill={this.props.secondary} d="m405.9 39.3c0-4 1.4-7.1 4.1-9.4 2.7-2.2 6-3.4 9.8-3.4s7.1 1.1 9.8 3.4c2.7 2.2 4.1 5.4 4.1 9.4v17h-8.1v-17c0-1.6-0.6-2.8-1.7-3.7s-2.5-1.3-4.1-1.3c-1.5 0-2.9 0.4-4 1.3-1.2 0.9-1.7 2.1-1.7 3.7v17h-8.1l-0.1-17z"/>
                    <Path fill={this.props.secondary} d="m457.7 41.2c-0.3-1.7-1.1-3.1-2.5-4.2s-3-1.6-4.8-1.6c-2.1 0-3.8 0.7-5 2.2-1.2 1.4-1.9 3.1-1.9 5s0.6 3.4 1.7 4.7c1.2 1.3 2.9 2 5.1 2 1.3 0 2.4-0.1 3.3-0.3 0.8-0.2 1.7-0.6 2.5-1.3v8.1c-1 0.4-2 0.7-2.9 0.9s-1.9 0.3-2.9 0.3c-4.9 0-8.7-1.5-11.4-4.5s-4-6.6-4-10.7 1.4-7.7 4.1-10.8c2.7-3 6.5-4.5 11.4-4.5 4.3 0 8.1 1.4 11.3 4.1s4.9 6.2 4.9 10.6v23.5c0 4.6-1.1 8-3.4 10s-6.2 3-11.6 3v-8c2.5 0 4.1-0.4 4.9-1.2s1.2-2.1 1.2-3.9v-23.4z"/>
                    <Path fill={this.props.secondary} d="m469.4 47.8c2.6 0 4.4-0.7 5.4-2s1.5-3 1.5-5c0-4.5 0.8-8 2.4-10.4 1.6-2.5 5.6-3.7 12-3.7v8.5c-2.6 0-4.2 0.5-4.8 1.4-0.6 1-1.1 3.1-1.5 6.5s-1.4 6.4-3.1 9.2c-1.7 2.7-5.7 4.1-12 4.1v-8.6h0.1z"/>
                    <Path fill={this.props.slogan} d="m162.5 79h-2.9c0-0.1-0.2-0.6-0.6-1.7-0.5-1.1-0.9-2.2-1.4-3.3h-1.9v-2.6h2.2c0.6 0 1.1-0.1 1.4-0.4s0.5-0.6 0.5-0.9c0-0.4-0.2-0.7-0.5-0.9-0.3-0.3-0.8-0.4-1.4-0.4h-3.1v10.2h-2.6v-12.9h5.5c1.9 0 3.2 0.4 4 1.1s1.2 1.6 1.2 2.7c0 0.6-0.1 1.1-0.3 1.6s-0.5 0.9-0.9 1c-0.3 0.2-0.6 0.3-0.9 0.5-0.2 0.2-0.3 0.3-0.4 0.5 0.1 0 0.4 1 1.1 2.8s1 2.7 1 2.7z"/>
                    <Path fill={this.props.slogan} d="M174.9,63.4h2.7V79h-2.7V63.4z"/>
                    <Path fill={this.props.slogan} d="m180 66c-0.3-0.3-0.4-0.6-0.4-1s0.1-0.8 0.4-1.1 0.6-0.4 1.1-0.4 0.9 0.1 1.1 0.4c0.3 0.3 0.4 0.6 0.4 1.1 0 0.4-0.1 0.7-0.4 1s-0.6 0.4-1.1 0.4-0.8-0.1-1.1-0.4zm-0.3 3h2.7v10h-2.7v-10z"/>
                    <Path fill={this.props.slogan} d="m191.3 69.1h2.7v10h-2.7v-0.4c-0.8 0.4-1.6 0.6-2.5 0.6-0.7 0-1.4-0.1-2.1-0.4s-1.3-0.8-2.1-1.6c-0.7-0.8-1.1-1.9-1.1-3.2 0-1.4 0.4-2.4 1.1-3.2s1.4-1.3 2.1-1.6 1.4-0.4 2.1-0.4c0.4 0 0.9 0.1 1.3 0.2s0.8 0.3 1.1 0.5l0.1-0.5zm-4.4 6.8c0.5 0.5 1.1 0.8 1.9 0.8s1.4-0.2 1.9-0.7 0.7-1.1 0.7-1.8-0.2-1.3-0.7-1.8-1.1-0.7-1.9-0.7-1.4 0.3-1.9 0.8-0.7 1.1-0.7 1.8c0 0.5 0.2 1.1 0.7 1.6z"/>
                    <Path fill={this.props.slogan} d="m200.6 69c1.6 0 2.9 0.5 3.8 1.5s1.4 2.2 1.4 3.6-0.5 2.6-1.4 3.6-2.2 1.5-3.8 1.5c-1.5 0-2.7-0.5-3.8-1.4s-1.6-2.1-1.6-3.6v-10.8h3v10.9c0.1 0.6 0.4 1 0.8 1.4 0.5 0.4 1 0.5 1.6 0.5 0.7 0 1.3-0.2 1.7-0.7s0.6-1 0.6-1.7c0-0.6-0.2-1.2-0.6-1.6s-1-0.7-1.7-0.7c-0.5 0-0.8 0-1.1 0.1s-0.6 0.2-0.8 0.4v-2.7c0.3-0.1 0.7-0.2 1-0.3h0.9z"/>
                    <Path fill={this.props.slogan} d="M206.8,63.4h2.7V79h-2.7V63.4z"/>
                    <Path fill={this.props.slogan} d="m236.9 69.1h2.7v10h-2.7v-0.4c-0.8 0.4-1.6 0.6-2.5 0.6-0.7 0-1.4-0.1-2.1-0.4-0.6-0.3-1.3-0.8-2.1-1.6-0.7-0.8-1.1-1.9-1.1-3.2 0-1.4 0.4-2.4 1.1-3.2s1.4-1.3 2.1-1.6 1.4-0.4 2.1-0.4c0.4 0 0.9 0.1 1.3 0.2s0.8 0.3 1.1 0.5l0.1-0.5zm-4.5 6.8c0.5 0.5 1.1 0.8 1.9 0.8s1.4-0.2 1.9-0.7 0.7-1.1 0.7-1.8-0.2-1.3-0.7-1.8-1.1-0.7-1.9-0.7-1.4 0.3-1.9 0.8-0.7 1.1-0.7 1.8c0.1 0.5 0.3 1.1 0.7 1.6z"/>
                    <Path fill={this.props.slogan} d="m248.1 74.4c0-0.9-0.4-1.5-0.8-1.8s-1-0.5-1.6-0.5c-0.7 0-1.3 0.2-1.7 0.7s-0.6 1-0.6 1.7c0 0.6 0.2 1.2 0.6 1.6s1 0.7 1.7 0.7c0.4 0 0.8 0 1.1-0.1s0.6-0.2 0.8-0.4v2.7c-0.3 0.1-0.7 0.2-1 0.3s-0.6 0.1-1 0.1c-1.7 0-2.9-0.5-3.9-1.5-0.9-1-1.4-2.2-1.4-3.6s0.5-2.6 1.4-3.6 2.2-1.5 3.8-1.5c1.5 0 2.7 0.5 3.8 1.4s1.6 2.1 1.6 3.6v7.9c0 1.6-0.4 2.7-1.2 3.4s-2.1 1-3.9 1v-2.7c0.8 0 1.6-0.1 1.9-0.4s0.4-0.7 0.4-1.3v-7.7z"/>
                    <Path fill={this.props.slogan} d="m257.6 76.7c0.6 0 1.1-0.2 1.6-0.5 0.5-0.4 0.8-0.8 0.9-1.4 0.6 0.1 1.2 0.2 1.7 0.3 0.6 0.1 0.8 0.1 0.8 0.1-0.2 1.2-0.8 2.2-1.8 3s-2.1 1.1-3.4 1.1c-0.4 0-1.1-0.1-1.9-0.4-0.8-0.2-1.6-0.8-2.2-1.7-0.7-0.9-1-2-1-3.1 0-0.5 0.1-1.1 0.3-1.8 0.2-0.8 0.8-1.5 1.7-2.3 1-0.8 2.4-1.1 3.3-1.1s1.7 0.2 2.1 0.4c0.5 0.2 1.1 0.6 1.4 0.9 0.6 0.6 1.1 1.3 1.4 2.5l-6.4 3.7s0.8 0.3 1.5 0.3zm0.2-5.1c-0.5 0-1.1 0.2-1.6 0.6s-0.8 1.1-0.9 1.3-0.2 0.6-0.2 0.6l3.8-2.2s-0.5-0.3-1.1-0.3z"/>
                    <Path fill={this.props.slogan} d="m387.4 76.7c0.6 0 1.1-0.2 1.6-0.5 0.5-0.4 0.8-0.8 0.9-1.4 0.6 0.1 1.2 0.2 1.7 0.3 0.6 0.1 0.8 0.1 0.8 0.1-0.2 1.2-0.8 2.2-1.8 3s-2.1 1.1-3.4 1.1c-0.4 0-1.1-0.1-1.9-0.4-0.8-0.2-1.6-0.8-2.2-1.7-0.7-0.9-1-2-1-3.1 0-0.5 0.1-1.1 0.3-1.8 0.2-0.8 0.8-1.5 1.7-2.3 1-0.8 2.4-1.1 3.3-1.1s1.7 0.2 2.1 0.4c0.5 0.2 1.1 0.6 1.4 0.9 0.6 0.6 1.1 1.3 1.4 2.5l-6.4 3.7s0.8 0.3 1.5 0.3zm0.2-5.1c-0.5 0-1.1 0.2-1.6 0.6s-0.8 1.1-0.9 1.3-0.2 0.6-0.2 0.6l3.8-2.2s-0.6-0.3-1.1-0.3z"/>
                    <Path fill={this.props.slogan} d="m428.9 76.7c0.6 0 1.1-0.2 1.6-0.5 0.5-0.4 0.8-0.8 0.9-1.4 0.6 0.1 1.2 0.2 1.7 0.3 0.6 0.1 0.8 0.1 0.8 0.1-0.2 1.2-0.8 2.2-1.8 3s-2.1 1.1-3.4 1.1c-0.4 0-1.1-0.1-1.9-0.4-0.8-0.2-1.6-0.8-2.2-1.7-0.7-0.9-1-2-1-3.1 0-0.5 0.1-1.1 0.3-1.8 0.2-0.8 0.8-1.5 1.7-2.3 1-0.8 2.4-1.1 3.3-1.1s1.7 0.2 2.1 0.4c0.5 0.2 1.1 0.6 1.4 0.9 0.6 0.6 1.1 1.3 1.4 2.5l-6.4 3.7s0.8 0.3 1.5 0.3zm0.2-5.1c-0.5 0-1.1 0.2-1.6 0.6s-0.8 1.1-0.9 1.3-0.2 0.6-0.2 0.6l3.8-2.2s-0.6-0.3-1.1-0.3z"/>
                    <Path fill={this.props.slogan} d="m216.1 76.7c0.6 0 1.1-0.2 1.6-0.5 0.5-0.4 0.8-0.8 0.9-1.4 0.6 0.1 1.2 0.2 1.7 0.3 0.6 0.1 0.8 0.1 0.8 0.1-0.2 1.2-0.8 2.2-1.8 3s-2.1 1.1-3.4 1.1c-0.4 0-1.1-0.1-1.9-0.4-0.8-0.2-1.6-0.8-2.2-1.7-0.7-0.9-1-2-1-3.1 0-0.5 0.1-1.1 0.3-1.8 0.2-0.8 0.8-1.5 1.7-2.3 1-0.8 2.4-1.1 3.3-1.1s1.7 0.2 2.1 0.4c0.5 0.2 1.1 0.6 1.4 0.9 0.6 0.6 1.1 1.3 1.4 2.5l-6.4 3.7s0.8 0.3 1.5 0.3zm0.2-5.1c-0.5 0-1.1 0.2-1.6 0.6s-0.8 1.1-0.9 1.3-0.2 0.6-0.2 0.6l3.8-2.2s-0.6-0.3-1.1-0.3z"/>
                    <Path fill={this.props.slogan} d="m168.7 76.7c0.6 0 1.1-0.2 1.6-0.5 0.5-0.4 0.8-0.8 0.9-1.4 0.6 0.1 1.2 0.2 1.7 0.3 0.6 0.1 0.8 0.1 0.8 0.1-0.2 1.2-0.8 2.2-1.8 3s-2.1 1.1-3.4 1.1c-0.4 0-1.1-0.1-1.9-0.4-0.8-0.2-1.6-0.8-2.2-1.7-0.7-0.9-1-2-1-3.1 0-0.5 0.1-1.1 0.3-1.8 0.2-0.8 0.8-1.5 1.7-2.3 1-0.8 2.4-1.1 3.3-1.1s1.7 0.2 2.1 0.4c0.5 0.2 1.1 0.6 1.4 0.9 0.6 0.6 1.1 1.3 1.4 2.5l-6.4 3.7s0.8 0.3 1.5 0.3zm0.2-5.1c-0.5 0-1.1 0.2-1.6 0.6s-0.8 1.1-0.9 1.3-0.2 0.6-0.2 0.6l3.8-2.2s-0.6-0.3-1.1-0.3z"/>
                    <Path fill={this.props.primary} d="m119.3 49.4c1.8 0 3.3-0.6 4.8-1.5 1.5-1.2 2.4-2.4 2.7-4.2 1.8 0.3 3.6 0.6 5.1 0.9 1.8 0.3 2.5 0.4 2.5 0.4-0.6 3.6-2.5 6.4-5.5 8.8s-6.3 3.3-10.2 3.3c-1.2 0-3.3-0.3-5.7-1.2-2.4-0.6-4.8-2.4-6.6-5.1-2.1-2.7-3-6-3-9.3 0-1.5 0.3-3.3 0.9-5.4 0.6-2.4 2.4-4.5 5.1-6.9 3-2.4 7.1-3.3 9.9-3.3 2.7 0 4.9 0.7 6.4 1.2 1.4 0.5 3.2 1.7 4.1 2.6 1.8 1.7 3.2 3.8 4.2 7.6l-19.1 11.1c-0.1 0.1 2.3 1.1 4.4 1zm0.6-15.2c-1.5-0.1-3.3 0.6-4.8 1.8s-2.4 3.2-2.7 3.9-0.6 1.8-0.6 1.8l11.4-6.6c-0.1 0-1.7-0.9-3.3-0.9z"/>
                    <Path fill={this.props.slogan} d="m263.7 73.3c0-1.4 0.5-2.4 1.4-3.2s2-1.1 3.3-1.1 2.4 0.4 3.3 1.1c0.9 0.8 1.4 1.8 1.4 3.2v5.7h-2.7v-5.7c0-0.5-0.2-1-0.6-1.2-0.4-0.3-0.8-0.4-1.4-0.4-0.5 0-1 0.1-1.4 0.4s-0.6 0.7-0.6 1.2v5.7h-2.7v-5.7z"/>
                    <Path fill={this.props.slogan} d="m280.5 75.3h2.9c-0.2 0.9-0.7 1.8-1.5 2.7s-2 1.4-3.5 1.4-2.8-0.5-3.8-1.6-1.5-2.3-1.5-3.6c0-1.4 0.5-2.6 1.5-3.6 1-1.1 2.2-1.6 3.8-1.6 0.7 0 1.4 0.1 2.1 0.4 0.6 0.3 1.2 0.6 1.6 1.1s0.7 0.9 0.9 1.2c0.2 0.4 0.4 0.8 0.5 1.2h-2.9l-0.3-0.5c-0.2-0.3-0.5-0.5-0.8-0.6s-0.7-0.2-1-0.2c-0.8 0-1.4 0.3-1.9 0.8s-0.7 1.1-0.7 1.8 0.2 1.2 0.5 1.6 0.7 0.6 1 0.8 0.7 0.2 1.1 0.2 0.7-0.1 1-0.2 0.5-0.3 0.7-0.6c0.1-0.3 0.2-0.5 0.3-0.7z"/>
                    <Path fill={this.props.slogan} d="m290.8 78.9c-0.5 0.2-1.1 0.3-1.8 0.3-1.3 0-2.4-0.3-3.3-1-1-0.7-1.5-1.8-1.5-3.2v-5.7h2.7v5.7c0 0.5 0.2 0.9 0.6 1.2s0.8 0.4 1.4 0.4 1-0.1 1.4-0.4 0.6-0.7 0.6-1.2v-5.7h2.7l-0.1 12.6c0 1.6-0.4 2.7-1.2 3.4s-2.1 1-3.9 1v-2.7c0.9 0 1.5-0.1 1.9-0.4 0.4-0.2 0.5-0.7 0.5-1.3v-3z"/>
                    <Path fill={this.props.slogan} d="m310.2 69.1h2.7v10h-2.7v-0.4c-0.8 0.4-1.6 0.6-2.5 0.6-0.7 0-1.4-0.1-2.1-0.4-0.6-0.3-1.3-0.8-2.1-1.6-0.7-0.8-1.1-1.9-1.1-3.2 0-1.4 0.4-2.4 1.1-3.2s1.4-1.3 2.1-1.6 1.4-0.4 2.1-0.4c0.4 0 0.9 0.1 1.3 0.2s0.8 0.3 1.1 0.5v-0.5h0.1zm-4.5 6.8c0.5 0.5 1.1 0.8 1.9 0.8s1.4-0.2 1.9-0.7 0.7-1.1 0.7-1.8-0.2-1.3-0.7-1.8-1.1-0.7-1.9-0.7-1.4 0.3-1.9 0.8-0.7 1.1-0.7 1.8c0 0.5 0.3 1.1 0.7 1.6z"/>
                    <Path fill={this.props.slogan} d="M318.8,63.4v3.7h2.4v2.7h-2.4V79h-2.7v-9.1h-2.4v-2.7h2.4v-3.7h2.7V63.4z"/>
                    <Path fill={this.props.slogan} d="m336.7 78.9c-0.5 0.2-1.1 0.3-1.8 0.3-1.3 0-2.4-0.3-3.3-1-1-0.7-1.5-1.8-1.5-3.2v-5.7h2.7v5.7c0 0.5 0.2 0.9 0.6 1.2s0.8 0.4 1.4 0.4 1-0.1 1.4-0.4 0.6-0.7 0.6-1.2v-5.7h2.7l-0.1 12.6c0 1.6-0.4 2.7-1.2 3.4s-2.1 1-3.9 1v-2.7c0.9 0 1.5-0.1 1.9-0.4 0.4-0.2 0.5-0.7 0.5-1.3v-3z"/>
                    <Path fill={this.props.slogan} d="m341.1 70.6c1-1.1 2.3-1.6 3.8-1.6 0.7 0 1.4 0.1 2.1 0.4s1.2 0.7 1.7 1.2 0.8 1.1 1.1 1.7c0.2 0.6 0.4 1.3 0.4 1.9 0 1.4-0.4 2.5-1.1 3.2-0.7 0.8-1.4 1.3-2.1 1.6s-1.4 0.4-2.1 0.4c-1.5 0-2.8-0.5-3.8-1.6s-1.5-2.3-1.5-3.6c0.1-1.4 0.6-2.6 1.5-3.6zm1.9 5.3c0.5 0.5 1.1 0.8 1.9 0.8s1.4-0.2 1.9-0.7 0.7-1.1 0.7-1.8-0.2-1.3-0.7-1.8-1.1-0.7-1.9-0.7-1.4 0.3-1.9 0.8-0.7 1.1-0.7 1.8c0 0.6 0.3 1.1 0.7 1.6z"/>
                    <Path fill={this.props.slogan} d="m350.5 75.1v-5.7h2.7v5.7c0 0.5 0.2 1 0.6 1.2 0.4 0.3 0.8 0.4 1.4 0.4 0.5 0 1-0.1 1.4-0.4s0.6-0.7 0.6-1.2v-5.7h2.7v5.7c0 1.4-0.5 2.4-1.4 3.2s-2 1.1-3.3 1.1-2.4-0.4-3.3-1.1c-0.9-0.8-1.4-1.9-1.4-3.2z"/>
                    <Path fill={this.props.slogan} d="m365.6 69v2.6c-0.8 0-1.4 0.2-1.8 0.5s-0.5 0.7-0.5 1.3v5.6h-2.7v-5.6c0-1.5 0.4-2.5 1.2-3.3 0.7-0.7 2-1.1 3.8-1.1z"/>
                    <Path fill={this.props.slogan} d="m373.9 76.2c0.9 0 1.5-0.2 1.8-0.7 0.3-0.4 0.5-1 0.5-1.7 0-1.5 0.3-2.7 0.8-3.5s1.9-1.3 4-1.3v2.9c-0.9 0-1.4 0.2-1.6 0.5s-0.4 1.1-0.5 2.2-0.5 2.2-1 3.1c-0.6 0.9-1.9 1.4-4 1.4v-2.9z"/>
                    <Path fill={this.props.slogan} d="m398.5 69v2.6c-0.8 0-1.4 0.2-1.8 0.5s-0.5 0.7-0.5 1.3v5.6h-2.7v-5.6c0-1.5 0.4-2.5 1.2-3.3 0.7-0.7 2-1.1 3.8-1.1z"/>
                    <Path fill={this.props.slogan} d="m400.6 76.9l-2-7.6h2.7l1.3 4.8 1.4-4.8h2.8l-2 7.6c-0.2 0.8-0.5 1.5-0.7 1.8-0.2 0.4-0.7 0.6-1.4 0.6-0.6 0-1.1-0.2-1.3-0.6-0.4-0.5-0.6-1.1-0.8-1.8z"/>
                    <Path fill={this.props.slogan} d="m408.8 66c-0.3-0.3-0.4-0.6-0.4-1s0.1-0.8 0.4-1.1 0.6-0.4 1.1-0.4 0.9 0.1 1.1 0.4c0.3 0.3 0.4 0.6 0.4 1.1 0 0.4-0.1 0.7-0.4 1s-0.6 0.4-1.1 0.4c-0.4 0-0.8-0.1-1.1-0.4zm-0.3 3h2.7v10h-2.7v-10z"/>
                    <Path fill={this.props.slogan} d="m419.7 75.3h2.9c-0.2 0.9-0.7 1.8-1.5 2.7s-2 1.4-3.5 1.4-2.8-0.5-3.8-1.6-1.5-2.3-1.5-3.6c0-1.4 0.5-2.6 1.5-3.6 1-1.1 2.2-1.6 3.8-1.6 0.7 0 1.4 0.1 2.1 0.4s1.2 0.6 1.6 1.1 0.7 0.9 0.9 1.2c0.2 0.4 0.4 0.8 0.5 1.2h-2.9l-0.3-0.5c-0.2-0.3-0.5-0.5-0.8-0.6s-0.7-0.2-1-0.2c-0.8 0-1.4 0.3-1.9 0.8s-0.7 1.1-0.7 1.8 0.2 1.2 0.5 1.6 0.7 0.6 1 0.8c0.3 0.1 0.7 0.2 1.1 0.2s0.7-0.1 1-0.2 0.5-0.3 0.7-0.6 0.3-0.5 0.3-0.7z"/>
                    <Path fill={this.props.slogan} d="m429.8 71.6"/>
                    <Path fill={this.props.slogan} d="m428.9 71.6"/>
                </G>
            </Svg>

        );
    }
}


export default Logo;
