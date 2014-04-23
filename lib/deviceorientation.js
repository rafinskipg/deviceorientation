var requestAnimFrame = (function(){
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

var canvas, ctx, updateWays =[],enabledWayIndex = 0,lastTime = Date.now();
var ball = {
  pos : {
    x : 0,
    y : 0
  },
  velocity: {
    x : 0,
    y : 0
  },
  speed :{
    x:200,
    y:200
  }
};

var acceleration = {
  x : 0,
  y : 0
}

var main = function() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;
  update(dt);
  render();
  lastTime = now;
  requestAnimFrame(main);
};

function initCanvas(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
};

function initControls(){
  var fragment = document.createDocumentFragment();
  for ( var e = 0; e < updateWays.length; e++ ) {
    var div = document.createElement('div');
    var t =  document.createTextNode(updateWays[e].name);
    div.appendChild(t);
    div.setAttribute('data-id', e)
    div.className = 'controlButton';
    div.onclick = function(e){
      enabledWayIndex = e.target.getAttribute('data-id');
      console.log(e,'Enabled way '+(enabledWayIndex+1))
      document.getElementById('message').innerHtml = 'Enabled way '+(enabledWayIndex+1);
    }
    fragment.appendChild(div);
  }

  var controlsContainer = document.getElementById('controls');
  controlsContainer.appendChild(fragment);
}

function update(dt){
  updateWays[enabledWayIndex].update(dt);
  checkCanvasLimits();
}

function updateWay1(dt){
  ball.velocity.x = ball.velocity.x + acceleration.x * dt;
  ball.pos.x = ball.pos.x + ball.velocity.x * dt;

  ball.velocity.y = ball.velocity.y + acceleration.y * dt;
  ball.pos.y = ball.pos.y + ball.velocity.y * dt;
}

function updateWay2(dt){
  ball.velocity.x = ball.velocity.x + Math.pow(acceleration.x,2) * dt;
  ball.pos.x = ball.pos.x + ball.velocity.x * dt;

  ball.velocity.y = ball.velocity.y + Math.pow(acceleration.y,2) * dt;
  ball.pos.y = ball.pos.y + ball.velocity.y * dt;
}

function updateWay3(dt){
  ball.velocity.x = ball.velocity.x + acceleration.x* dt;
  ball.pos.x = ball.pos.x + ball.velocity;
  ball.velocity.y = ball.velocity.y + acceleration.y * dt;
  ball.pos.y = ball.pos.y + ball.velocity.y;
}

function updateWay4(dt){
  ball.velocity.x = ball.speed.x * dt;
  ball.velocity.y = ball.speed.y * dt;

  if(acceleration.x < 0){
    ball.pos.x = ball.pos.x - ball.velocity.x;  
  }else{
    ball.pos.x = ball.pos.x + ball.velocity.x;
  }

  if(acceleration.y < 0){
    ball.pos.y = ball.pos.y - ball.velocity.y;  
  }else{
    ball.pos.y = ball.pos.y + ball.velocity.y;
  }

}

function updateWay5(dt){

  var relativeValueX = (acceleration.x / 180 ) ;
  var relativeValueY = (acceleration.y / 180 ) ;
  ball.velocity.x = relativeValueX * ball.speed.x * dt;
  ball.velocity.y = relativeValueY * ball.speed.y * dt;

  ball.pos.x = ball.pos.x + ball.velocity.x;  
  ball.pos.y = ball.pos.y + ball.velocity.y;
}


function render(){
  clearCanvas();
  ctx.beginPath();
  ctx.arc(ball.pos.x, ball.pos.y, 10, 0, 2 * Math.PI, false);
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

function clearCanvas(){
  ctx.save();
  ctx.fillStyle = 'black'; 
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.restore();
}

function checkCanvasLimits(){
  if(ball.pos.x < 0) {
    ball.pos.x = 0;
  }
  else if(ball.pos.x > canvas.width) {
    ball.pos.x = canvas.width;
  }

  if(ball.pos.y < 0) {
    ball.pos.y = 0;
  }
  else if(ball.pos.y > canvas.height) {
    ball.pos.y = canvas.height;
  } 
}

window.addEventListener('deviceorientation',function(e){
  acceleration.x = e.gamma;
  acceleration.y = e.beta;
});

document.addEventListener( "DOMContentLoaded", function(){
  document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
  initCanvas();
  updateWays = [
    {
      update: updateWay1,
      name: 'Way 1'
    },
    {
      update: updateWay2,
      name: 'Way 2'
    },
    {
      update: updateWay3,
      name: 'Way 3'
    },
    {
      update: updateWay4,
      name: 'Way 4'
    },
    {
      update: updateWay5,
      name: 'Way 5'
    }
  ];
  initControls();
  main();
}, false );