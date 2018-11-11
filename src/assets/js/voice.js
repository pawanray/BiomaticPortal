
    //webkitURL is deprecated but nevertheless
    window.URL = window.URL || window.webkitURL;

    var gumStream; 						//stream from getUserMedia()
    var rec; 							//Recorder.js object
    var input; 							//MediaStreamAudioSourceNode we'll be recording
    var userId;
    // shim for AudioContext when it's not avb. 
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext //audio context to help us record
    
    // var recordButton = document.getElementById("recordButton");
    // var stopButton = document.getElementById("stopButton");
    // var pauseButton = document.getElementById("pauseButton");
    
    // //add events to those 2 buttons
    // recordButton.addEventListener("click", startRecording);
    // stopButton.addEventListener("click", stopRecording);
    // pauseButton.addEventListener("click", pauseRecording);
    
    
    
    function startRecording(e, userid) {
        
        console.log("recordButton clicked");
        userId = userid;
       
        
        var constraints = { audio: true, video:false }
    
        
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
    
          
            audioContext = new AudioContext();
    
            //update the format 
            document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
    
            /*  assign to gumStream for later use  */
            gumStream = stream;
            
            /* use the stream */
            input = audioContext.createMediaStreamSource(stream);
    
          
            rec = new Recorder(input,{numChannels:1})
    
            //start the recording process
            rec.record()
        
            console.log("Recording started");
      document.getElementsByClassName('voice-overlay')[0].style.display = 'flex';
      document.getElementById('recordingsList').style.display = 'none'
        }).catch(function(err) {
              //enable the record button if getUserMedia() fails
            // recordButton.disabled = false;
            // stopButton.disabled = true;
            // pauseButton.disabled = true
        });
    }
    
    function pauseRecording(){
        console.log("pauseButton clicked rec.recording=",rec.recording );
        if (rec.recording){
            //pause
            rec.stop();
            pauseButton.innerHTML="Resume";
        }else{
            //resume
            rec.record();
            pauseButton.innerHTML="Pause";
    
        }
    }
    // $(document).click(function(event) {
    // 	if(event.target.id=="recordButton"){
    // 		setTimeout(function(){
    // 			debugger
    // 				rec.stop();
    // 				gumStream.getAudioTracks()[0].stop();
            
    // 			rec.exportWAV(createDownloadLink);
    // 			$(".voice-overlay").css('display','none')
    // 			pauseButton.innerHTML="Resume";
    // 			createDownloadLink();
                
    // 		},5000)
    // 		if($("#recordingsList").html!= ""){
    // 			$("#recordingsList").html("")
    // 		}
    // 	}
    // 	console.log(event.target)
    //     //var text = $(event.target).text();
    // });
    
    
    
    
    
    
    function stopRecording(name) {
        console.log("stopButton clicked");
    
        //disable the stop button, enable the record too allow for new recordings
        // stopButton.disabled = true;
        // recordButton.disabled = false;
        // pauseButton.disabled = true;
    
        //reset button just in case the recording is stopped while paused
        //pauseButton.innerHTML="Pause";
        
        //tell the recorder to stop the recording
        rec.stop();
    
        //stop microphone access
        gumStream.getAudioTracks()[0].stop();
    
        //create the wav blob and pass it on to createDownloadLink
        rec.exportWAV(createDownloadLink,name);
        
    }
    
    function createDownloadLink(blob) {
        
        var url = window.URL.createObjectURL(blob);
        var au = document.createElement('audio');
        var li = document.createElement('li');
        var link = document.createElement('a');
    
        //name of .wav file to use during upload and download (without extendion)
        var filename = new Date().toISOString();
    
        //add controls to the <audio> element
        au.controls = true;
        au.src = url;
    
        //save to disk link
        link.href = url;
        link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
        link.innerHTML = "Save to disk";
    
        //add the new audio element to li
        li.appendChild(au);
        
        //add the filename to the li
        li.appendChild(document.createTextNode(filename+".wav "))
    
        //add the save to disk link to li
        li.appendChild(link);
        
        //upload link
        var upload = document.createElement('a');
        upload.href="#";
        upload.innerHTML = "Upload";
    
        // upload.addEventListener("click", function(event){
              var xhr=new XMLHttpRequest();
              xhr.onload=function(e) {
                  if(this.readyState === 4) {
                    console.log("Server returned: ",e.target.responseText);
    
                    var data = e.target.responseText;
                    var jsonResponse = JSON.parse(data);
                    
                    console.log(jsonResponse["code"]);
                    console.log(jsonResponse["message"]);
                    if(jsonResponse["status"] == 'SUCC'){
                        document.getElementById("dataResult").innerHTML = `<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>` +
                        jsonResponse["message"] + "<br>";
                        setTimeout(function(){
                            document.getElementById("dataResult").innerHTML = ""
                        },10000)
                    	}
                    	//$('#voiceId').html('true');
                    else{
                    	document.getElementById("dataResult").innerHTML =`<p style='background-color:#F6795E; color:white; padding:20px 20px 20px 20px'>` +
                        jsonResponse["message"] + "<br>"
                        setTimeout(function(){
                            document.getElementById("dataResult").innerHTML = ""
                        },10000)
                    }           
                  }
              };
              if(blob.type=="voiceenrol"){
              var userId =document.getElementById("userId").innerText
              var fd=new FormData();
              fd.append("audio",blob, filename);
              xhr.open("POST",`https://biometric-access.herokuapp.com/biometric/enrol/${userId}/voice`,true);
              xhr.send(fd);
            //   document.getElementById("voiceEnrolSucess").style.display="inline-block"
            //   setTimeout(function(){
            //     document.getElementById("voiceEnrolSucess").style.display="none"
            //   },1000)
              
              console.log('voice recored succesfuly')
            }

            if(blob.type=="voiceverify"){
                var fd=new FormData();
                fd.append("audio",blob, filename);
                xhr.open("POST",`https://biometric-access.herokuapp.com/biometric/verify/voice`,true);
                xhr.send(fd);
                console.log('voice verify succesfuly')
            //     document.getElementById("voiceVerifySucess").style.display="inline-block"
            //   setTimeout(function(){
            //     document.getElementById("voiceVerifySucess").style.display="none"
            //   },1000)
              }

              // recordButton.disabled = false;
        // })
        
    
        li.appendChild(document.createTextNode (" "))//add a space in between
        li.appendChild(upload)//add the upload link to li
    
        //add the li element to the ol
      recordingsList.appendChild(li);
      //  set your counter to 1
          
    }
    
    document.addEventListener("click",function(e){
        if(e.target.id =="recordButton"){
          setTimeout(function () {    //  call a 3s setTimeout when the loop is called
             // alert('hello');          //  your code here
                      //  if the counter < 10, call the loop function
                 stopRecording("voiceEnrol");
                 document.getElementsByClassName('voice-overlay')[0].style.display = 'none';  
                 document.getElementById('recordingsList').style.display = 'block'         
           }, 5000)
          
          }
        })
        
        document.addEventListener("click",function(e){
            if(e.target.id =="voiceVerify"){
              setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                 // alert('hello');          //  your code here
                          //  if the counter < 10, call the loop function
                     stopRecording("voiceVerify");
                     
                     document.getElementsByClassName('voice-overlay')[0].style.display = 'none';  
                     document.getElementById('recordingsList').style.display = 'block'         
               }, 5000)
              }
            })
            document.addEventListener("click",function(e){
                
                if(e.target.className =="btn btn-xs btn-default viewIcon"){
                    document.getElementById('voiceIcon').style.display = 'none';
                    document.getElementById('voiceVerify').style.display = 'none';
                  }
                  else if(e.target.className =="fa fa-eye"){
                    document.getElementById('voiceIcon').style.display = 'none';
                    document.getElementById('voiceVerify').style.display = 'none';
                  }
                })
            