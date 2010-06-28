var RECORDER;
SC.Connect.options = {
  'request_token_endpoint': '/oauth/request_token',
  'access_token_endpoint': '/oauth/access_token',
  'callback': function(params) {
    RECORDER.post(params['post_uri']);
  }
};

var connected = false;

function formatMs(ms) {
  var s = Math.floor((ms/1000) % 60);
  if (s < 10) { s = "0"+s; }
  return Math.floor(ms/60000) + "." + s;
}

$(document).ready(function(){

  var postURI = "http://localhost:3000/upload";
  RECORDER = new Recorder($('.recorder embed')[0]);
  CALLBACK_REGISTRY.bind('debug', function(arg){
    //console.log(arg);    
  });

  CALLBACK_REGISTRY.bind('recordingStart', function(arg){
    console.log('rec 1');    
    $('#record-stop').css('display','block').animate({'opacity':1});
    $("#time").removeClass("hidden");
    // start the rec timer
    var oT = new Date();
    recTimer = setInterval(function() {
      $("#time").html(formatMs((new Date()).getTime()-oT.getTime()));
    },300);
  });

  CALLBACK_REGISTRY.bind('recordingStop', function(arg){
    console.log('rec 0');    
  });

  CALLBACK_REGISTRY.bind('playingStart', function(arg){
    console.log('pl 1');    
  });

  CALLBACK_REGISTRY.bind('playingStop', function(arg){
    console.log('pl 0');    
  });

  CALLBACK_REGISTRY.bind('uploadComplete', function(arg){
    console.log('upload 1');    
  });

  $("body").one('mousemove',function() {
    $("h1,h2,#record-instruction").removeClass("hidden");
    $("#record-instruction").addClass("moveup");
  });

  $('#share').click(function(){
    SC.Connect.initiate();
    return false;
  });
  
  var recTimer;
  
  $('a#record,a#record-stop').click(function(){
    if(RECORDER.isRecording){
      //$('a#record').html('record');
      $('#record-stop').animate({'opacity':0},function() {
        $('#record-stop').css('display','block');
      });
      $("#play").removeClass("hidden");
      $("#share").removeClass("hidden");
      
      $("body").one('mousemove',function() {
        $("#play-instruction, #share-instruction").removeClass("hidden").addClass("moveup");
      });
      
      clearInterval(recTimer);
      $("#time").addClass("hidden");
      RECORDER.stopRecording();
    } else {
      RECORDER.startRecording();
      $("#record-instruction").addClass("hidden").removeClass("moveup");
    }
    
    return false;
  });
  
  $('#play').click(function(){
    if(RECORDER.isPlaying){
      $('#play').html('play');
      $('#play').removeClass('playing');      
      RECORDER.stopPlaying();
    }else{
      RECORDER.startPlaying();
      $('#play').html('stop');
      $('#play').addClass('playing');
    }
    
    return false;
  });
});