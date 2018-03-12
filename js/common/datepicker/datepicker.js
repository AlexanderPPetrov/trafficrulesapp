import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import Ui from '../../common/ui';
import DatePicker from 'react-native-datepicker'
import {EvilIcons} from '@expo/vector-icons';

class CommonDatePicker extends Component {

    render() {
        return (
            <View style={Ui.datePickerContainer}>
                <DatePicker
                    style={{width:118, alignItems:'flex-end'}}
                    date={this.props.date}
                    customStyles={Ui.datePickerStyles}
                    format="YYYY-MM-DD"
                    mode="date"
                    iconComponent={<EvilIcons active name='calendar' style={Ui.calendarIcon}/>}
                    // minDate={new Date('2017-1-1')}
                    maxDate={new Date()}
                    placeholder={this.props.title}
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
