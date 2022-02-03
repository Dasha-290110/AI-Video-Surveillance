video = "";
object = [];
status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 400);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 400);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status = objects detected"
            document.getElementById("no_of_obj").innerHTML = "Number of object detected are " + object.length;

            fill("#DC143C")
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("FFD700");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById('status').innerHTML = "status: detecting object";
}

function modalLoaded() {
    console.log('modal is loaded')
    status = true
    video.play();
    video.speed(1);
    video.volume(0);
}

function restart() {
    video.play();
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result)
        object = result;
    }
}