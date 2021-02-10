define(function () {
   
    function httpRequest(method, url, successCallback, errorCallback) {
      var httpclient = new kony.net.HttpRequest();
      httpclient.open(method, url);
      httpclient.responseType = constants.HTTP_RESPONSE_TYPE_JSON;
      httpclient.onReadyStateChange = function() {
        if (this.readyState !== constants.HTTP_READY_STATE_DONE) {
          return;
        }
        if (this.status === 200) {
          successCallback(this.response);
        } else {
          errorCallback(this.response);
        }
      }
      httpclient.send();
    }
  
    return {
       httpRequest: httpRequest,
    };
});