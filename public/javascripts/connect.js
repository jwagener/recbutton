/*
    SoundCloud Connect JS component
    full documentation: http://connect.soundcloud.com
    
    SC.Connect.options = {
      'request_token_endpoint': '/oauth/request_token',
      'access_token_endpoint': '/oauth/access_token',
      'callback': function(query_obj){
        console.log(query_obj);
      } 
    };
    
    HTML:
    <a href="#" onclick="SC.Connect.initiate();" id="sc-connect" style="border: 0; background: transparent url('http://connect.soundcloud.com/connect-button.png') top left no-repeat;display: block;
        text-indent: -9999px; width: 242px; height: 31px; margin-bottom: 10px;">Connect with SoundCloud</a>
*/

if(SC == undefined){
  var SC = {};
}

SC.Connect = {
  'options' : {
    'request_token_endpoint': null,
    'access_token_endpoint': null,
    'callback': function(query_obj){
      window.location.reload();
    }
  },

  'initiate' : function(){
    var options = SC.Connect.options;
    if(options.request_token_endpoint && options.access_token_endpoint){
      SC.Connect.popup_window = window.open(options.request_token_endpoint,"sc_connect_popup","location=1, width=456, height=500,toolbar=no,scrollbars=yes");
    }else{
      SC.Connect.log("Please set both SC.Connect.options.request_token_endpoint and SC.Connect.options.access_token_endpoint!");
    }
    
    return false;
  },  
  
  'onComplete' : function(){    
    var queryToObject = function(query) {
      var obj = {};
      var query = window.location.search.replace('?','');
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        obj[pair[0]] = decodeURIComponent(pair[1]);
      }
      return(obj);
    };
    
    window.opener.SC.Connect.callback(queryToObject());
  },

  'callback' : function(params){
    var callback = SC.Connect.options.callback;
    SC.Connect.popup_window.close();
    callback(params);
  },
  
  'log' : function(msg){
    if(window.console && window.console.log){
      window.console.log(msg);
    }
  }  
};
