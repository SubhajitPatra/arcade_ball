var platform= document.getElementById("platform")
var ball= document.getElementById("ball")
var paddle=document.getElementById("paddle")
var posBX= 489;
var posBY= 400;
var posPX= 500;
var posPY= 400;
var gamestate = "reset"
var gameinfo= document.getElementById("gameinfo");
var gamestate_status= document.getElementById("gamestate_status");
var moveDisUnit=5;
var dirBX= false;
var dirBY= false;
var playloop= null;
var score=0;
window.addEventListener("mousemove", (e)=>{
  
  if(e.clientX>800-50){
    paddle.style.left= 750;
  }
  else if(e.clientX<0+50){
    paddle.style.left=50;
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
  if(posBX>490){
    console.log("posBX: ", posBX, " | posBY: ", posBY , " | posPX: ", posPX, " | posPY: ", posPY  )
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
      if(posBX>490){
        dirBX= false;
      }
      if(posBX< 10){
        dirBX= true;
      }
      if(posBY>790){
        dirBY= false;
      }
      if(posBY<10){
        dirBY= true;
      }
      posBX= dirBX?posBX+ 1 : posBX-1; 
      posBY= dirBY?posBY+ 1  : posBY-1;
      
      elem.style.top = posBX + 'px';
      elem.style.left = posBY + 'px';
    }
  }
}
