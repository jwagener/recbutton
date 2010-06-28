var RECORDER;
SC.Connect.options = {
  'request_token_endpoint': '/oauth/request_token',
  'access_token_endpoint': '/oauth/access_token',
  'callback': function(params) {
    RECORDER.post(params['post_uri']);
  }
};

var connected = false;

$(document).ready(function(){
  var postURI = "http://localhost:3000/upload";
  RECORDER = new Recorder($('.recorder embed')[0]);
  CALLBACK_REGISTRY.bind('debug', function(arg){
    console.log(arg);    
  });

  $('a#share').click(function(){
    SC.Connect.initiate();
    return false;
  });
  
  $('a#record').click(function(){
    if(RECORDER.isRecording){
      $('a#record').html('record');
      RECORDER.stopRecording();
    }else{
      RECORDER.setup();
      $('a#record').html('stop');
      RECORDER.startRecording();
    }
    
    return false;
  });
  
  $('a#play').click(function(){
    if(RECORDER.isPlaying){
      $('a#play').html('play');
      RECORDER.stopPlaying();
    }else{
      RECORDER.startPlaying();
      $('a#play').html('stop');
    }
    
    return false;
  });
});