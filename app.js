var platform= document.getElementById("platform")
var top= platform.clientTop;
var left= platform.clientLeft;
var bottom= top + 500;
var right= right + 800;
var ball= document.getElementById("ball")
var paddle=document.getElementById("paddle")
var posBX= bottom-10;
var posBY= (left+right)/2;
var posPX= bottom;
var posPY= (left+right)/2;
var gamestate = "reset"
var gameinfo= document.getElementById("gameinfo");
var gamestate_status= document.getElementById("gamestate_status");
var moveDisUnit=5;
var dirBX= false;
var dirBY= false;
var playloop= null;
var score=0;
window.addEventListener("mousemove", (e)=>{
  
  if(e.clientX>right-50){
    paddle.style.left= right-50;
  }
  else if(e.clientX<left+50){
    paddle.style.left=left+50;
  }
  else{
    paddle.style.left= e.clientX +"px";
    posPY= e.clientX
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
  console.log("executing move ball; position of ball:" ,posBX, posBY)
  if(posBX>(bottom-10)){
    // console.log("posBX: ", posBX, " | posBY: ", posBY , " | posPX: ", posPX, " | posPY: ", posPY  )
    console.log("top: ", top, " | left: ", left , " | bottom: ", bottom, " | right: ", right  )
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
      if(posBX>(bottom-5)){
        dirBX= false;
      }
      if(posBX< (top+10)){
        dirBX= true;
      }
      if(posBY> right-10){
        dirBY= false;
      }
      if(posBY<(left+10)){
        dirBY= true;
      }
      posBX= dirBX?posBX+ 1 : posBX-1; 
      posBY= dirBY?posBY+ 1  : posBY-1;
      
      elem.style.top = posBX + 'px';
      elem.style.left = posBY + 'px';
    }
  }
}
