document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
    mouseIsPressed = true;
}
function mouseupHandler() {
    mouseIsPressed = false;
}


document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
    let cnvRect = cnv.getBoundingClientRect();

    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);

}

//Detect key press

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)


function keyDownHandler(event) {
    if (event.key == "a") {
        player.left = true;

    } else if (event.key == "d") {
        player.right = true;

    }

    if (event.key == "w") {
        player.up = true;

    } else if (event.key == "s") {
        player.down = true;
    }

}

function keyUpHandler(event) {
    if (event.key == "a") {
        player.left = false;
    } else if (event.key == "d") {
        player.right = false;
    }


    if (event.key == "w") {
        player.up = false;
    } else if (event.key == "s") {
        player.down = false;
    }

}



function movePlayer() {
    // player movement
    if (player.up && player.left == true) {
        player.x -= 2.82842712475;
        player.y -= 2.82842712475;
        
    }
    else if (player.up && player.right == true) {
        player.x += 2.82842712475;
        player.y -= 2.82842712475;
    }

    else if (player.down && player.left == true) {
        player.x -= 2.82842712475;
        player.y += 2.82842712475;
    }

    else if (player.down && player.right == true) {
        player.x += 2.82842712475;
        player.y += 2.82842712475;
    } else {
        if (player.right == true) {
            player.x += 4
        }
        if (player.up == true) {
            player.y -= 4
        }
        if (player.down == true) {
            player.y += 4
        }
        if (player.left == true) {
            player.x -= 4
        }

    }
    
}

function findxVibes() {
    run = player.x - mouseX
    rise = player.y - mouseY
    h = Math.hypot(run, rise)
    dx = (run / h) * 12
    return -dx
}

function findyVibes() {
    rise = player.y - mouseY
    run = player.x - mouseX
    h = Math.hypot(run, rise)
    dy = (rise / h) * 12
    return -dy
}


function shoot() {
    if (mouseIsPressed == true) {
        xbullets.push(player.x);
        ybullets.push(player.y);
        rbullets.push(3);
        xspdbullets.push(findxVibes());
        yspdbullets.push(findyVibes());
    }
    
}

function updateBullets() {
    for (i = 0; i < xbullets.length; i++) {
        // Update bullet
        xbullets[i] += xspdbullets[i];
        ybullets[i] += yspdbullets[i];
        // Draw bullet
        ctx.fillStyle = "blue"
        ctx.strokeStyle = "blue"
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(xbullets[i], ybullets[i], rbullets[i], 0, 2 * Math.PI);
        ctx.fill();

        // removes offscreen bullets
        if (xbullets[i] > cnv.width + 50 || xbullets[i] < -50 && ybullets[i] > cnv.height + 50 || ybullets[i] < -50) {
            xbullets.splice(i, 1);
            ybullets.splice(i, 1);
            xspdbullets.splice(i, 1);
            yspdbullets.splice(i, 1);
            rbullets.splice(i, 1);
        }


    }
}
