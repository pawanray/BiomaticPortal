const constraints = { "video": { width: { max: 400 } }, "audio" : false };

var theStream;
var theRecorder;
var blob;
var recordedChunks = [];

function startFunction() {
   // document.getElementById("imgIcon").style.display="none";
   // $(".face-container").css({'transform':'scale(1.1)', 'transition':'0.5s ease-in-out'})
  navigator.mediaDevices.getUserMedia(constraints)
      .then(gotMedia)
      .catch(e => { console.error('getUserMedia() failed: ' + e); });
}

function gotMedia(stream) {
  theStream = stream;
  var video = document.querySelector('video');
  video.src = URL.createObjectURL(stream);
  try {
    recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
  } catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    return;
  }
  
  theRecorder = recorder;
  recorder.ondataavailable = 
      (event) => { recordedChunks.push(event.data); };
  recorder.start(100);
  document.getElementsByClassName('face-overlay')[0].style.display = 'flex';
//document.getElementById("imgIcon").style.display="none";
}

// From @samdutton's "Record Audio and Video with MediaRecorder"
// https://developers.google.com/web/updates/2016/01/mediarecorder
function download(name) {
  theRecorder.stop();
  theStream.getTracks().forEach(track => { track.stop(); });

  blob = new Blob(recordedChunks, {type: "video/webm"});
  var url =  URL.createObjectURL(blob);
  setTimeout(function() { URL.revokeObjectURL(url); }, 100); 

   var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {
                  console.log("Server returned: ",e.target.responseText);
                 // a.style = "display: none";

                var data = e.target.responseText;
                var jsonResponse = JSON.parse(data);
                
                if(jsonResponse["status"] == 'SUCC'){
					document.getElementById("dataResult").innerHTML =`<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>` +
                    jsonResponse["message"] + "<br>";
                    setTimeout(function(){
                        document.getElementById("dataResult").innerHTML = ""
                    },10000)
				}else{
					document.getElementById("dataResult").innerHTML = `<p style='background-color:#F6795E; color:white; padding:20px 20px 20px 20px'>` +
                    jsonResponse["message"] + "<br>";
                    setTimeout(function(){
                        document.getElementById("dataResult").innerHTML = ""
                    },10000)
					
				}  

		      }
          };
          if(name=="faceEnrol"){
          var userId =document.getElementById("userId").innerText
         
            var fd=new FormData();
            fd.append("video",blob);
            xhr.open("POST",`https://biometric-access.herokuapp.com/biometric/enrol/${userId}/face`,true);
            xhr.send(fd);
             console.log("Face Enrolment succesfuly")
            //  document.getElementById("faceEnrolSucess").style.display="inline-block"
            //  setTimeout(function(){
            //    document.getElementById("faceEnrolSucess").style.display="none"
            //  },1000)
        }
        else if(name=="faceVerify"){
             var fd=new FormData();
             fd.append("video",blob);
             xhr.open("POST",`https://biometric-access.herokuapp.com/biometric/verify/face`,true);
             xhr.send(fd);
              console.log("Face Verify succesfuly")
            //   document.getElementById("faceVerifySucess").style.display="inline-block"
            //   setTimeout(function(){
            //     document.getElementById("faceVerifySucess").style.display="none"
            //   },1000)
        }
          
         
}

document.addEventListener("click",function(e){
    
	if(e.target.id=="videoRecoder"){
		setTimeout(function(){
            //theRecorder.stop();
            download("faceEnrol");
            document.getElementsByClassName('face-overlay')[0].style.display = 'none';
           // document.getElementById("imgIcon").style.display="block";
		},10000)
		document.getElementById("faceVerify").style.display="none";
	}
	console.log(event.target)
});

document.addEventListener("click",function(e){
    
	if(e.target.id=="faceVerify"){
		setTimeout(function(){
            download("faceVerify");
		},10000)
		
	}
	console.log(event.target)
});

