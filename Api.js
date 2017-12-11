import FormData from 'FormData';

const baseUrl = 'http://api-prmts.dev.cc/index.php/v1/';
const appKey = '122$sads1CCssa@$%AScccaas552112';
import fetch from 'react-native-fetch-polyfill';
import {Alert} from 'react-native';

let auth = '';

import {Toast} from "native-base";
import I18n from './i18n/i18n';

let Api = {

    post: (opts = {}) => {
        Api.executeRequest(opts, 'POST')
    },

    get: (opts = {}) => {
        Api.executeRequest(opts, 'GET')
    },

    executeRequest: (opts, type) => {
        console.log(opts, type);

        if (!opts.url) {
            throw new Error('url is required');
        }

        var data = {
            ...opts.data
        };

        var _data = Api.prepareData(data, type);

        var _url = baseUrl + opts.url;

        if (type == 'GET') {
            _url = _url + '?' + Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
        }

        console.log(_url)

        return fetch(_url, _data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (opts.success && responseJson._status == 'success') {
                    if (opts.url == 'login') {
                        auth = responseJson._payload._userLoginHash;
                    }
                    opts.success(responseJson._payload)
                } else {

                    let message = I18n.t(responseJson._payload._message)
                    if (responseJson._payload._code == 404) {
                        message = responseJson._payload._message
                    }
                    Toast.show({
                        text: message,
                        buttonText: I18n.t('ok')
                    })
                }
                if (responseJson._status == 'error' && opts.error) {
                    opts.error(responseJson._payload._message)

                }
            })
            .catch((error) => {

                let message = error.message;
                if (message == 'Network request failed') {
                    message = I18n.t('error_timeout')
                }

                Alert.alert(
                    I18n.t('error_title'),
                    message,
                    [
                        {text: 'OK'},
                    ]
                )

            });
    },


    prepareData: (data, type) => {

        let bodyData = null;

        let requestData = {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'App-Key': appKey,
                'Accept-Language': 'en-US,en;q=0.5',
                'Authorization': auth
            },
            timeout: 20 * 1000
        };

        if (type == 'POST') {
            bodyData = new FormData();
            Object.keys(data).map(function (key) {
                bodyData.append(key, data[key]);
            });

            requestData.body = bodyData;
        }


        return requestData
    }


}


export default Api;
