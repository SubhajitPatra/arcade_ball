var platform= document.getElementById("platform")
var ball= document.getElementById("ball")
var paddle=document.getElementById("paddle")
var posBX= 500;
var posBY= 400;
var posPX= 500;
var posPY= 400;
var gamestate = "reset"
var gameinfo
var gamestate_status= document.getElementById("gamestate_status");
while(gamestate!== "quit"){
  gamestate_status.innerHTML= gamestate;
  console.log("game loop")
  if(gamestate==="playing"){
    
  }
  else if(gamestate==="paused"){
    
    
  }
  else if(gamestate==="reset"){
    showBallPaddle()
    break;
  }
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

