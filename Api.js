import FormData from 'FormData';

const baseUrl = 'http://api-prmts.dev.cc/index.php/v1/';
const appKey = '122$sads1CCssa@$%AScccaas552112';

export default {

    req(url, data, success, error) {

        var _data = this.prepareData(data);
        console.log(_data);
        var _url = baseUrl + url;
        return fetch(_url, _data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(success && responseJson._status == 'success'){
                    success(responseJson._payload)
                }
                if(error && responseJson._status == 'error'){
                    error(responseJson._message)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },

    prepareData(data) {

        let formData = new FormData();
        Object.keys(data).map(function (key) {
            formData.append(key, data[key]);
        });


        let requestData = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'App-Key': appKey,
                'Accept-Language': 'en-US,en;q=0.5'
            }
        }

        return requestData
    }




}
