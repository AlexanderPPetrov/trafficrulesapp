import FormData from 'FormData';

const baseUrl = 'http://api-prmts.dev.cc/v1/';
const appKey = '122$sads1CCssa@$%AScccaas552112';
import fetch from 'react-native-fetch-polyfill';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'react-native'
import { NavigationActions } from 'react-navigation';
import type { NavigationParams, NavigationRoute } from 'react-navigation';
import Controller from './Controller'

import {Toast} from "native-base";
import Loader from "./js/common/loader/index";
import I18n from './i18n/i18n';


let Api = {

    auth:'',
    post: (opts = {}) => {
        Api.executeRequest(opts, 'POST')
    },

    get: (opts = {}) => {
        Api.executeRequest(opts, 'GET')
    },

    executeRequest: (opts, type) => {

        let loader = true,
            retries = 2;

        if(opts.loader === false){
            loader = false;
        }

        if(opts.retries){
            retries = opts.retries;
        }

        if (!opts.url) {
            throw new Error('url is required');
        }

        var data = {
            ...opts.data
        };

        var _data = Api.prepareData(data, type);

        var _url = baseUrl + opts.url;

        if (type === 'GET' && Object.keys(data).length > 0) {
            _url = _url + '?' + Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
        }
        let count = 1;

        if(loader){
            Loader.show();
        }
        const attempt = () => {

            return fetch(_url, _data)
                .then(response => response.json())
                .then(responseJson => {

                    if (opts.success && responseJson._status == 'success') {
                        if (opts.url === 'login') {
                            Api.auth = responseJson._payload._userLoginHash;
                        }

                        opts.success(responseJson._payload)

                    } else {

                        if(responseJson._payload._message === 'user_not_authorized'){
                            console.log('navigate to home')
                            Controller.navigateTo('Home')
                            return;
                        }

                        if(opts.error){
                            opts.error(responseJson._payload._message)
                        }

                        let message = I18n.t(responseJson._payload._message)

                        if (responseJson._payload._code === 404) {
                            message = responseJson._payload._message
                        }

                        if(responseJson._payload.errors && responseJson._payload.errors.length > 0) {
                            message = '';
                            for(let i = 0; i < responseJson._payload.errors.length; i++){
                                message+= responseJson._payload.errors[i] +'\n'
                            }
                        }


                        Toast.show({
                            text: message,
                            buttonText: I18n.t('ok')
                        })

                    }
                    if (opts.always) {
                        opts.always()
                    }
                    if(loader){
                        Loader.hide();
                    }

                })
                .catch(error => {
                    console.log(count, retries)
                    if (count < retries) {
                        console.log('retry fetch')
                        count++
                        attempt()
                    } else {
                        let message = error.message;
                        if (message === 'Network request failed') {
                            message = I18n.t('network_request_failed')
                        }

                        Alert.alert(
                            I18n.t('error_title'),
                            message,
                            [
                                {text: 'OK'},
                            ]
                        )
                        if (opts.always) {
                            opts.always()
                        }
                    }
                    if(loader){
                        Loader.hide();
                    }

                })
        }

        attempt()
    },

    formatDate: date => {

        Number.prototype.padLeft = function (base, chr) {
            var len = (String(base || 10).length - String(this).length) + 1;
            return len > 0 ? new Array(len).join(chr || '0') + this : this;
        }

        date = [date.getFullYear(),
                (date.getMonth() + 1).padLeft(),
                date.getDate().padLeft()].join('-') +
            ' ' +
            [date.getHours().padLeft(),
                date.getMinutes().padLeft(),
                date.getSeconds().padLeft()].join(':');

        return date;
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
                'Authorization': Api.auth
            },
            timeout: 20 * 1000
        };

        if (type == 'POST') {
            bodyData = new FormData();
            Object.keys(data).map(function (key) {
                if(Array.isArray(data[key])){
                    for (let i = 0; i < data[key].length; i++) {
                        bodyData.append(key + '['+ i +']', data[key][i]);
                    }
                }else{
                    bodyData.append(key, data[key]);
                }
            });

            requestData.body = bodyData;


            console.log(bodyData)
        }

        return requestData
    }

}

export default Api;
