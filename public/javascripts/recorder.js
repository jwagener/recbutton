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