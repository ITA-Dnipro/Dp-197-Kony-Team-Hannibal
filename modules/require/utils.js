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
  
    function navigateToForm(formId, data) {
      var navigator = new kony.mvc.Navigation(formId);
      navigator.navigate(data);
    }
  
    function getUniqId() {
      return '' + new Date().getTime();
    }

    function validateUserData(userData) {
      var err;
      switch (true) {
        case (!/[a-zA-Z]+ [a-zA-Z]+/.test(userData.fullName)): {
          err = 'User full name must include only letters and only one space between words';
          break;
        }
        case (!/\S+@[a-z]+\.[a-z]{2,3}/.test(userData.email)): {
          err = 'Email must be valid';
          break;
        }
        case (!/\S{3,8}/.test(userData.login)): {
          err = 'User login must not include spaces and contain at least 5 symbols';
          break;
        }
        case (!/\S{6,}/.test(userData.password)): {
          err = 'Password must include at least 6 symbols';
          break;
        }
        case (userData.password !== userData.passwordConfirm): {
          err = 'Password and password confirmation must match';
          break;
        }
        default:
          err = null;
      }
      return err;
    }
  
    function confirmAlert(message, actionCb) {
    var basicConf = {
    message: message,
    alertType: constants.ALERT_TYPE_CONFIRMATION,
    alertHandler:alertHandlerCallBck,
    };
    
    var pspConfig = {
    contentAlignment: constants.ALERT_CONTENT_ALIGN_CENTER
  };
    
    var alert = new kony.ui.Alert(basicConf, pspConfig);
    
    function alertHandlerCallBck(alertAnswer) {
      if(alertAnswer){
        actionCb();
      }		
	}
  }
  
    return {
       httpRequest: httpRequest,
       navigateToForm: navigateToForm,
       getUniqId: getUniqId,
       validateUserData: validateUserData,
       confirmAlert: confirmAlert,
    };
});