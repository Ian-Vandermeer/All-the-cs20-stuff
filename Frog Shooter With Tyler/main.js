// Gmaning time 

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

// Main Program Loop
requestAnimationFrame(draw);


// Da Glob Vars
let mouseIsPressed = false;
let mouseX, mouseY;

let xbullets = [];
let ybullets = [];
let rbullets = [];
let xspdbullets = [];
let yspdbullets = [];

let bulletTimeout = 0


let player = {
    image: document.getElementById("froggy"),
    x: 400,
    y: 100,
    w: 75,
    h: 75,
    firerate: 20, 
}

// let juul = {
//     image: document.getElementById("juul"),
//     x: 400,
//     y: 100,
//     w: 11,
//     h: 65,

// }



function draw() {
    // Logic
    
    if (bulletTimeout < player.firerate) {
        bulletTimeout++
    } else {
        bulletTimeout = 0
        shoot()
    }

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    updateBullets()


    ctx.drawImage(player.image, player.x, player.y, player.w, player.h)
    //ctx.drawImage(juul.image, juul.x, juul.y, juul.w, juul.h)



    // ctx.fillStyle = 'black';
    // ctx.stroke()
    // ctx.beginPath();
    // ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    // ctx.fill();

    movePlayer()

    juul.x = player.x + player.w / 2 - 4.5;
    juul.y = player.y + 10;

    // Request another Animation Frame
    requestAnimationFrame(draw);
}




// document.getElementById("checkvibe").addEventListener("click", vibecheck);
// function vibecheck() {

//     if (Math.random() >= 0.5) {
//         document.getElementById("ishevibin").innerHTML = "yeah he vibin";
//         document.getElementById("vibinpic").src = "img/juul.png";
//     }
//     else if (Math.random() <= 0.5) {
//         document.getElementById("ishevibin").innerHTML = "nah he aint vibin";
//         document.getElementById("vibinpic").src = "img/Sup.jpg";
//     }

// }



