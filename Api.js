import FormData from 'FormData';
import CryptoJS from 'crypto-js';

const baseUrl = 'https://api.premiumtradings.com/index.php/v1/';
const translationsUrl = 'https://prmts-translations.dev.cc/'

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
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const monthKeys =  ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


let Api = {
    auth:'',
    accountSettings: {},
    deviceToken: '',
    setLocale:false,
    post: (opts = {}) => {
        Api.executeRequest(opts, 'POST')
    },

    get: (opts = {}) => {
        Api.executeRequest(opts, 'GET')
    },


    atob: (input:string = '') => {
        let str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
             buffer = str.charAt(i++);

             ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
             bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = chars.indexOf(buffer);
        }

        return output;
    },

    decrypt: (encryptedString = '') => {

        var key256Bits  = CryptoJS.PBKDF2("0000", Api.key, { keySize: 256/32, iterations: 1000, hasher: CryptoJS.algo.SHA256 });

        var rawData = Api.atob(encryptedString);
        var rawPieces = rawData.split(":");

        var crypttext = rawPieces[0];
        var iv = CryptoJS.enc.Hex.parse(rawPieces[1]);

        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(crypttext)});

        var plaintextArray = CryptoJS.AES.decrypt(
            cipherParams,
            key256Bits,
            { iv: iv }
        );

        var output = CryptoJS.enc.Utf8.stringify(plaintextArray);
        return JSON.parse(output)
    },



    executeRequest: (opts, type, domain = baseUrl) => {

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

        var _url = domain + opts.url;


        if (type === 'GET' && Object.keys(data).length > 0) {
            _url = _url + '?' + Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
        }
        let count = 1;

        if(loader){
            Loader.show();
        }
        console.log(_url)
        const attempt = () => {

            return fetch(_url, _data)
                .then(response => response.json())
                .then(responseJson => {

                    if (opts.success && responseJson._status == 'success') {
                        if (opts.url === 'login') {
                            Api.auth = responseJson._payload._userLoginHash;
                            Api.key = responseJson._payload._key;
                        }

                        opts.success(responseJson._payload)

                    } else {

                        if(responseJson._payload._message === 'user_not_authorized'){
                            Controller.navigateTo('Landing')
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
                    if (count < retries) {
                        console.log('retry fetch')
                        count++
                        setTimeout(() => {
                            attempt()
                        },50)
                    } else {
                        let message = error.message;
                        if (message === 'Network request failed') {
                            message = I18n.t('network_request_failed')
                        }

                        Alert.alert(
                            I18n.t('error_title'),
                            message,
                            [
                                {text: I18n.t('ok'), onPress: () => {

                                }

                                } ,
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

    getMonthAbbr: (month) => {
        return I18n.t(monthKeys[month]).substring(0, 3).toUpperCase()
    },

    getDate: date => {
        const t = date.split(/[- :]/),
            d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]),
            fixedDate = new Date(d);
        return fixedDate
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
                'Cache-Control': 'no-cache',
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
