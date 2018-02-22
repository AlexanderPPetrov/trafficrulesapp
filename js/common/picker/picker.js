import React, {Component} from 'react'
import {
    Picker,
    Header,
    Title,
    Left,
    Body,
    Right,
    Button,
    Icon

} from "native-base";

import {View} from 'react-native';

import Ui from '../../common/ui';
import ColorScheme from '../../common/colorscheme';
import StatusBar from '../../common/header/statusbar';
import style from "../../screens/sidebar/style";

class CommonPicker extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return <View style={Ui.inputContainer}>
                <Picker
                    style={Ui.pickerStyle}
                    mode="dropdown"
                    placeholder=""
                    iosHeader=" "
                    textStyle={{color:ColorScheme.darkest}}
                    iosIcon={<Icon name="ios-arrow-down-outline"/>}
                    selectedValue={this.props.selectedValue}
                    onValueChange={(value) => this.props.onValueChange(value)}
                    renderHeader={backAction =>
                        <Header >
                            <StatusBar/>
                            <Left>
                                <Button transparent onPress={backAction}>
                                    <Icon name="arrow-back"  />
                                </Button>
                            </Left>
                            <Body style={{ flex: 4 }}>
                                <Title style={{paddingLeft:15}}>{this.props.title}</Title>
                            </Body>
                        </Header>}
                    note={true}
                >
                    {this.props.listItems}
                </Picker>
            </View>

    }
}

export default CommonPicker;
