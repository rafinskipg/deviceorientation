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

var canvas, ctx, lastTime = Date.now();
var ball = {
  pos : {
    x : 0,
    y : 0
  },
  velocity: {
    x : 0,
    y : 0
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

function update(dt){
  ball.velocity.x = ball.velocity.x + acceleration.x * dt;
  ball.pos.x = ball.pos.x + ball.velocity.x * dt;

  ball.velocity.y = ball.velocity.y + acceleration.y * dt;
  ball.pos.y = ball.pos.y + ball.velocity.y * dt;

  checkCanvasLimits();
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
  main();
}, false );