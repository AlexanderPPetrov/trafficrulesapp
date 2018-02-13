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
import StatusBar from '../../common/header/statusbar';

class CommonPicker extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return <View style={Ui.inputContainer}>
                <Picker
                    style={{width:'100%'}}
                    mode="dropdown"
                    placeholder=""
                    iosHeader=" "
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
