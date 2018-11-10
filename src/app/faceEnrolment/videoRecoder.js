const constraints = { "video": { width: { max: 400 } }, "audio" : false };

var theStream;
var theRecorder;
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
  document.getElementsByClassName[0]("face-overlay").style.display="flex";
//document.getElementById("imgIcon").style.display="none";
}

// From @samdutton's "Record Audio and Video with MediaRecorder"
// https://developers.google.com/web/updates/2016/01/mediarecorder
function download() {
  theRecorder.stop();
  theStream.getTracks().forEach(track => { track.stop(); });

  var blob = new Blob(recordedChunks, {type: "video/webm"});
  var url =  URL.createObjectURL(blob);
  //var a = document.createElement("a");
  //document.body.appendChild(a);
 // a.style = "display: none";
  //a.href = url;
 // a.download = 'test.webm';
  //a.click();
  // setTimeout() here is needed for Firefox.
  setTimeout(function() { URL.revokeObjectURL(url); }, 100); 

   var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {
                  console.log("Server returned: ",e.target.responseText);
                  a.style = "display: none";

                var data = e.target.responseText;
                var jsonResponse = JSON.parse(data);
                
                // if(jsonResponse["status"] == 'SUCC'){
				// 	$("#dataResult").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" +
                //     jsonResponse["message"] + "<br>").fadeIn('slow', function(){
				// 		$('#dataResult').delay(6000).fadeOut()
				// 	});
				// }else{
				// 	$("#dataResult").html("<p style='background-color:#F6795E; color:white; padding:20px 20px 20px 20px'>" +
                //     jsonResponse["message"] + "<br>").fadeIn('slow', function(){
				// 		$('#dataResult').delay(6000).fadeOut()
				// 	});
				// }  

		      }
		  };
		//   var fd=new FormData();
		//   fd.append("video",blob);
		//   xhr.open("POST","https://biometric-access.herokuapp.com/biometric/verify/face",true);
        //   xhr.send(fd);
        //    console.log("Face Enrolment succesfuly")
}

// $(document).click(function(event) {
//     debugger
// 	if(event.target.id=="videoRecoder"){
// 		setTimeout(function(){
//             //theRecorder.stop();
//             download();
//             document.getElementById("video").style.display="none";
//            // document.getElementById("imgIcon").style.display="block";
// 		},10000)
		
// 	}
// 	console.log(event.target)
//     //var text = $(event.target).text();
// });