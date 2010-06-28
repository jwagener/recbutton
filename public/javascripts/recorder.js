var CALLBACK_REGISTRY = {
  triggerCallbacks: function(eventName, arg){
    //console.log('trig ', eventName, arg);
    var cs = this.getCallbacks(eventName);
    for(var i=0; i < cs.length; i++){
      cs[i](arg);
    } 
  },
  
  callbacks: {},
  
  getCallbacks: function(eventName){
    if(!this.callbacks[eventName]){
      this.callbacks[eventName] = [];
    }
    
    return this.callbacks[eventName];
  },
  
  bind: function(eventName, f){
    this.getCallbacks(eventName).push(f);
  }
}

function Recorder(swfObject){
   this.swfObject   = swfObject;
   this.isPlaying   = false;
   this.isRecording = false;
   
   this.send = function(message){
     return swfObject.sendToActionScript(message);
   };
   
   this.post = function(uri){
     return this.send('post ' + uri);
   };
   
   this.setup = function(){
     return this.send('setup');
   };
   
   this.startRecording = function(){
     this.isRecording = true;
     return this.send('startRecording');
   };
   
   this.stopRecording = function(){
     this.isRecording = false;
     return this.send('stopRecording');
   };
   
   this.startPlaying = function(){
     this.isPlaying = true;
     return this.send('startPlaying');
   };
   
   this.stopPlaying = function(){
     this.isPlaying = false;
     return this.send('stopPlaying');
   };
   
   this.getDebugLog = function(){
     return this.send('getDebugLog');
   };
}