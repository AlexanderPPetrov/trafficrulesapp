import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import Ui from '../../common/ui';
import {
    Text,
    Icon
} from "native-base";
import DatePicker from 'react-native-datepicker'

class CommonDatePicker extends Component {

    render() {
        return (
            <View style={Ui.datePickerContainer}>
                {/*<Text style={Ui.datePickerLabel}>{this.props.title}</Text>*/}
                <DatePicker
                    style={{width:105, alignItems:'flex-end'}}
                    date={this.props.date}
                    customStyles={Ui.datePickerStyles}
                    format="YYYY-MM-DD"
                    mode="date"
                    iconComponent={<Icon active name='ios-calendar-outline' style={Ui.calendarIcon}/>}
                    // minDate={new Date('2017-1-1')}
                    maxDate={new Date()}
                    placeholder={I18n.t('from')}
                    onDateChange={(date) => {
                        this.props.onDateChange(date)
                    }}
                    confirmBtnText={I18n.t('ok')}
                    cancelBtnText={I18n.t('cancel')}
                    btnTextConfirm={I18n.t('ok')}
                    btnTextCancel={I18n.t('cancel')}
                />
            </View>
        );
    }
}

export default CommonDatePicker;
