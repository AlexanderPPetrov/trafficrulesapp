import FormData from 'FormData';

const baseUrl = 'http://api-prmts.dev.cc/index.php/v1/';
const appKey = '122$sads1CCssa@$%AScccaas552112';
let auth = '';

import { Toast } from "native-base";
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

        return fetch(_url, _data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(opts.success && responseJson._status == 'success'){
                    if(opts.url == 'login'){
                        auth =  responseJson._payload._userLoginHash;
                    }
                    opts.success(responseJson._payload)
                }else{
                    Toast.show({
                        text: I18n.t(responseJson._payload._message),
                        buttonText: I18n.t('ok')
                    })
                }
                if(responseJson._status == 'error' && opts.error){
                    opts.error(responseJson._payload._message)

                }
            })
            .catch((error) => {
                console.error(error);

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
            }
        };

        if(type == 'POST'){
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
