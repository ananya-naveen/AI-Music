song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftScore=0;
song1Status="";
song2Status="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.position(450,225);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftScore=results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score: "+leftScore);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist X: "+leftWristX+" left wrist Y: "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist X: "+rightWristX+" right wrist Y: "+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("Blue");
    stroke("Blue");
    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();
    if(leftScore>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1Status==false){
            song1.play();
            document.getElementById("name").innerHTML="Playing- Harry Potter Theme";
        }
    }
}