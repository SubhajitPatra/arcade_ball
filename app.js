var platform= document.getElementById("platform")
var topLimit= platform.offsetTop;
var leftLimit= platform.offsetLeft;
var bottomLimit= topLimit + 500;
var rightLimit= leftLimit + 800;
var ball = document.getElementById("ball");
var paddle = document.getElementById("paddle");
var posBX= bottomLimit-10;
var posBY= (leftLimit+rightLimit)/2;
var posPX= bottomLimit;
var posPY= (leftLimit+rightLimit)/2;
var gamestate = "reset";
var gameinfo= document.getElementById("gameinfo");
var gamestate_status= document.getElementById("gamestate_status");
var moveDisUnit=5;
var dirBX= false;
var dirBY= false;
var playloop= null;
var score=0;
window.addEventListener("mousemove", (e)=>{
  paddle.style.top = bottomLimit + "px";
  if(e.clientX>rightLimit-50){
    paddle.style.left= rightLimit-50;
  }
  else if(e.clientX<leftLimit+50){
    paddle.style.left=leftLimit+50;
  }
  else{
    paddle.style.left= e.clientX +"px";
    posPY = e.clientX;
  }
})
window.addEventListener("load",(e)=>{
  console.log("game loaded");
 
  beforestart();
})
window.addEventListener("keydown",(e)=>{
  switch(e.key){
    case " ": 
    gamestate=gamestate=== "reset"? "play": "reset"
  }
  if(gamestate==="play"){
    gameinfo.innerHTML="";
    startPlay()
  }
  if(gamestate==="reset"){
    beforestart();  
    clearInterval(playloop);
  }
})
function beforestart(){
 gameinfo.innerHTML="press space button to start";
}
function showBallPaddle(){
    ball.style.top= posBX+ "px";
  ball.style.left= posBY + "px";
  paddle.style.top= posPX + "px";
  paddle.style.left= posPY + "px";
  console.log("showing");
}
function waitingForStart(){
  gameinfo.innerHTML="press enter to start";
  
  
}
function moveball(){
  
  //check ball is touching the paddle or the bottom side of platform
  // console.log("executing move ball; position of ball:", posBX, posBY)
    console.log(
      "top: ",
      topLimit,
      " | left: ",
      leftLimit,
      " | bottom: ",
      bottomLimit,
      " | right: ",
      rightLimit,
      " | poxPX: ",
      posPX
    );
  
  if(posBX>(bottomLimit-10)){
    console.log("posBX: ", posBX, " | posBY: ", posBY , " | posPX: ", posPX, " | posPY: ", posPY  )
    // console.log("top: ", topLimit, " | left: ", leftLimit , " | bottom: ", bottomLimit, " | right: ", rightLimit  )
    if(Math.abs(posBY-posPY)<= 50){
      moveDisUnit++;
      score++;
    }
    else{
      gamestate= "over";
      moveDisUnit=5;
      score--;
    platform.style.backgroundColor= "#bb3333"
      setTimeout(() => {

        platform.style.backgroundColor= "#ff7bb5"
      }, 500);
    }
  }
  animate(ball, moveDisUnit)
  gamestate_status.innerHTML= "score: " + score;

}
function startPlay(){
  playloop= setInterval(() => {
    moveball()
    console.log("moving ball");
}, 100);
}
function animate(elem,moveUnit) {
  var i=0;
  var id= null;
  clearInterval(id);
  id = setInterval(frame, 50);
  function frame() {
    
    if (i===moveUnit) {
      clearInterval(id);
    } 
    else { 
      i++;
      if(posBX>(bottomLimit-5)){
        dirBX= false;
      }
      if(posBX< (topLimit+10)){
        dirBX= true;
      }
      if(posBY> rightLimit-10){
        dirBY= false;
      }
      if(posBY<(leftLimit+10)){
        dirBY= true;
      }
      posBX= dirBX?posBX+ 1 : posBX-1; 
      posBY= dirBY?posBY+ 1  : posBY-1;
      
      elem.style.top = posBX + 'px';
      elem.style.left = posBY + 'px';
    }
  }
}
