var RECORDER;
SC.Connect.options = {
  'request_token_endpoint': '/oauth/request_token',
  'access_token_endpoint': '/oauth/access_token',
  'callback': function(params) {
    RECORDER.post(params['post_uri']);
  }
};

var connected = false;

var checkFlashVersion = function(){
  var flashVersion = swfobject.getFlashPlayerVersion();
  if(!(flashVersion.major >= 10 && flashVersion.minor >= 1)){
    alert('Please install a current flash version. Your version: ' + flashVersion.major + '.' + flashVersion.minor);  
  }  
};

function formatMs(ms) {
  var s = Math.floor((ms/1000) % 60);
  if (s < 10) { s = "0"+s; }
  return Math.floor(ms/60000) + "." + s;
}

$(document).ready(function(){
  checkFlashVersion();
  
  $('#permalink-url').attr('value',"");

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
    $('#play').removeClass('playing');      
  });

  CALLBACK_REGISTRY.bind('uploadComplete', function(evt){
    var response = evt.target.loader.data;
    var permalinkUrl = $(response).find('permalink-url').html();
    
    $('#permalink-url').attr('value', permalinkUrl);
    $(".share-actions").removeClass("hidden");
    $(".share-actions").css("z-index",1000);
    
  });

  // share
  
  $("#share-fb").click(function() {
    window.open('http://facebook.com/sharer.php?u=' + encodeURIComponent($('#permalink-url').attr('value')));
    return false;
  });

  $("#share-twitter").click(function() {
    $('#permalink-url').attr('value');
    return false;
  });
  
  $("#permalink-url").click(function() {
    $(this).select();
  });

  $("body").one('mousemove',function() {
    $("h1,#record-instruction").removeClass("hidden");
    $("#record-instruction").addClass("moveup");
  });

  $('#share').click(function(){
    $("#share-instruction").addClass("hidden").removeClass("moveup");
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
      $('#play').removeClass('playing');      
      RECORDER.stopPlaying();
    }else{
      RECORDER.startPlaying();
      $("#play-instruction").addClass("hidden").removeClass("moveup");
      $('#play').addClass('playing');
    }
    
    return false;
  });
});