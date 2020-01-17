// setup the canvas and the graphocs context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 850;

let backgx = -200;
let backgy = -200;

let currentBg = document.getElementById("bg")

let isChasing = true;

var rtRadian;
var sideY; 
var sideX; 

var middleX;
var middleY;

var dx; 
var dy; 
var distance;

var playerdx; 
var playerdy;
var playerdistance;



let player = {
    img: document.getElementById("shaq"),
    x: 550,
    y: 400,
    width: 50,
    height: 50,
    r: 17,
    right: false,
    left: false,
    up: false,
    down: false,
    //color: "black",
    speed: 5,
    shooting: false,
    //counter clockwise
    ccw: false,
    // clockwise
    cw: false,
    rotation: 0,
    rtSpd: 2.5
};

let enemy = {
    img: document.getElementById("enemy1"),
    x: 100,
    y: 700,
    width: 50,
    height: 50,
    r: 17,
    right: false,
    left: false,
    up: false,
    down: false,
    speed: 5,
    shooting: false,
    //counter clockwise
    ccw: false,
    // clockwise
    cw: false,
    rotation: 0,
    rtSpd: 2.5
};


let bg1 = {
    x: 0,
    y: 0,
    width: 1800,
    height: 2000,
    img: document.getElementById("bg")
};

let neptune = {
    img: document.getElementById("neptune"),
    x: 400,
    y: 400,
    width: 100,
    height: 100,
    r: 40
}

let sun = {
    img: document.getElementById("sun"),
    x: 1200,
    y: 1000,
    width: 450,
    height: 450,
    r: 60
}

let beam = {
    img: document.getElementById("beam"),
    x: 525,
    y: 425,
    width: 100,
    height: 100,
    
}




requestAnimationFrame(loop);
function loop() {

    // Draw backgorund
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);


    // Draw background image
    ctx.drawImage(currentBg, bg1.x + backgx, bg1.y + backgy, bg1.width, bg1.height);


    ctx.drawImage(neptune.img, neptune.x + backgx, neptune.y + backgy, neptune.width, neptune.height);

    ctx.drawImage(sun.img, sun.x + backgx, sun.y + backgy, sun.width, sun.height);


    //draws player
    drawRotate();


    ctx.drawImage(enemy.img, enemy.x + backgx, enemy.y + backgy, enemy.width, enemy.height);
    findPlayer()

    // border
    ctx.beginPath();
    ctx.lineWidth = "10";
    ctx.strokeStyle = "red";
    ctx.rect(backgx, backgy, 1800, 2000);
    ctx.stroke();

    // Handles movement
    checkMove();


    // draws crosshair
    drawCrosshair();
    
    requestAnimationFrame(loop);   
}
    

// dx = (player.x - neptune.x);
    // dy = (player.y - neptune.y);
    // distance = Math.sqrt(dx * dx + dy * dy);
    // if (distance < player.r + neptune.r) {
    //     currentBg = document.getElementById("neptunesurface")
    // }

    // ctx.beginPath();
    // ctx.lineWidth = "2";
    // ctx.strokeStyle = "red";
    // ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.r, 0, 2 * Math.PI);
    // ctx.stroke();