
            /* Drag'n drop stuff */
            var drag = document.getElementById("drag");
            var fbutton = document.getElementById("fbutton");
            var createvideo = document.getElementById("createvideo");
            var format   = document.getElementById("format");
            var files = document.getElementById("filesinput");

            var ctx = 0;

            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");

            //image to video via Whammy
            var video = new Whammy.Video(15);

            var filesarr = [];


            createvideo.addEventListener("click", function() {

                document.getElementById('status').innerHTML = "Working... Please Wait.";

                document.getElementById('awesome').src = "";
                ctx = 0;

                canvas.width = document.getElementById("width").value;
                canvas.height = document.getElementById("height").value;
                video = new Whammy.Video(document.getElementById("framerate").value);

                //if we have images loaded
                if(filesarr.length>0){

                    //loop through them and process
                    for(i=0; i<filesarr.length; i++) {
                        var file = filesarr[i];
                        if(file.type.match(/image.*/)){
                            process(file);
                        } else {
                            document.getElementById('status').innerHTML = "This file does not seem to be a image.";
                        }
                    }

                } else {
                    document.getElementById('status').innerHTML = "Please select some images.";
                }

            }, false);

            fbutton.addEventListener("click", function() {
                document.getElementById('filesinput').click();
            }, false);

            drag.ondragover = function(e) {e.preventDefault()}
            drag.ondrop = function(e) {
                e.preventDefault();
                filesarr = e.dataTransfer.items;
                document.getElementById('status').innerHTML = "Please select options and click on Create Video.";
            }

            //process files VIA INPUT
            files.addEventListener("change", function (e) {
                filesarr = e.target.files;
                document.getElementById('status').innerHTML = "Please select options and click on Create Video.";
            }, false);



            /* main process function */
            function process(file) {

                var reader = new FileReader();
                reader.onload = function(event) {
                    var dataUri = event.target.result;
                    var img = new Image();
                 
                    //load image and drop into canvas
                    img.onload = function() {

                        //a custom fade in and out slideshow
                        context.globalAlpha = 0.2;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);
                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 0.4;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);
                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 0.6;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);
                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 0.8;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);                       
                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 1;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);

                        //this should be a loop based on some user input
                        video.add(context);
                        video.add(context);
                        video.add(context);
                        video.add(context);
                        video.add(context);
                        video.add(context);
                        video.add(context);

                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 0.8;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);
                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 0.6;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);
                        context.clearRect(0,0,context.canvas.width,context.canvas.height);
                        context.globalAlpha = 0.4;
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        video.add(context);
                              
                        ctx++;
                        finalizeVideo();

                    };
                    img.src = dataUri;
                };

                reader.onerror = function(event) {
                    console.error("File could not be read! Code " + event.target.error.code);
                };

                reader.readAsDataURL(file);

            }      


function finalizeVideo(){
  //check if its ready
  if(ctx==filesarr.length){

      var start_time = +new Date;
      var output = video.compile();
      var end_time = +new Date;
      var url = webkitURL.createObjectURL(output);
      if (format.value != "GIF") {
            document.getElementById('downloadmp4').style.display = '';
            document.getElementById('downloadmp4').href = url;
      }else{
            document.getElementById('downloadgif').style.display = '';
            document.getElementById('downloadgif').href = url;
      }
      

      document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
      
      document.getElementById('status').innerHTML = "Compiled Video in " + (end_time - start_time) + "ms, file size: " + Math.ceil(output.size / 1024) + "KB";

  }

}