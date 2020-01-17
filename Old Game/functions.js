document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


// Detects if a key is pressed

function keyDownHandler(event) {

    if (event.key == "ArrowLeft") {
        player.ccw = true;

    } else if (event.key == "ArrowRight") {
        player.cw = true;
    }

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

    if (event.key == " ") {

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


    if (event.key == "ArrowLeft") {
        player.ccw = false;
    } else if (event.key == "ArrowRight") {
        player.cw = false;
    }

    if (event.key == " ") {
        
    }

}

function drawRotate() {

    if (player.ccw == true) {
        player.rotation -= player.rtSpd;
        ctx.save();
        ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
        ctx.rotate(player.rotation * Math.PI / 180);
        ctx.translate(-(player.x + player.width / 2), -(player.y + player.height / 2));
        ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
        ctx.drawImage(beam.img,  middleX-50, middleY+20, beam.width, beam.height);
        ctx.restore();

    } else if (player.cw == true) {
        player.rotation += player.rtSpd;
        ctx.save();
        ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
        ctx.rotate(player.rotation * Math.PI / 180);
        ctx.translate(-(player.x + player.width / 2), -(player.y + player.height / 2));
        ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
        ctx.drawImage(beam.img, middleX-50, middleY+20, beam.width, beam.height);
        ctx.restore();
    } else {
        // draws the player when nothing is happening
        ctx.save();
        ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
        ctx.rotate(player.rotation * Math.PI / 180);
        ctx.translate(-(player.x + player.width / 2), -(player.y + player.height / 2));
        ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
        ctx.drawImage(beam.img, middleX -50, middleY +20, beam.width, beam.height);
        ctx.restore();
    }
}



function checkMove() {

    // Checks if player is moving
    if (player.left == true) {

        // makes player return to centre (for right)
        if (player.x > cnv.width / 2) {
            player.x -= player.speed;
        } else {
            backgx += player.speed;
        }

        // check if player is at the wall and moves them towards it 
        if (player.x > 0 && backgx >= 0) {
            player.x -= player.speed;
        }

        // stops player at wall
        if (backgx > 0) {
            backgx = 0;
            if (player.x < 0) {
                player.x = 0
            }
        }

    } else if (player.right == true) {


        // makes player return to centre (for left)
        if (player.x < cnv.width / 2) {
            player.x += player.speed;
        } else {
            backgx -= player.speed;
        }

        // check if player is at the wall and moves towards it
        if (player.x + player.width < cnv.width && backgx <= -600) {
            player.x += player.speed;
        }

        // stops player at wall
        if (backgx < -600) {
            backgx = -600;
            if (player.x + player.width > cnv.width) {
                player.x = cnv.width - player.width;
            }
        }
    }


    if (player.up == true) {

        // makes player return to centre (for down)
        if (player.y > cnv.height / 2) {
            player.y -= player.speed;
        } else {
            backgy += player.speed;
        }

        // check if player is at the wall and moves them towards it 
        if (player.y > 0 && backgy >= 0) {
            player.y -= player.speed;
        }

        // stops player at wall
        if (backgy > 0) {
            backgy = 0;
            if (player.y < 0) {
                player.y = 0
            }
        }


    } else if (player.down == true) {

        // makes player return to centre (for up)
        if (player.y < cnv.height / 2) {
            player.y += player.speed;
        } else {
            backgy -= player.speed;
        }

        // check if player is at the wall and moves them towards it 
        if (player.y + player.height < cnv.height && backgy <= -1150) {
            player.y += player.speed;
        }

        // stops player at wall
        if (backgy < -1150) {
            backgy = -1150;
            if (player.y + player.height > cnv.height) {
                player.y = cnv.height - player.height;
            }
        }

    }

}

// draws crosshair
function drawCrosshair() {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "red";
    ctx.arc(middleX + sideX, middleY + sideY, 8, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.arc(middleX + sideX, middleY + sideY, 1, 0, 2 * Math.PI);
    ctx.stroke();
   

    // Turns degrees into radians and find the opposite and adjacent sides
    rtRadian = (player.rotation + 90) * 3.14 / 180;
    sideY = Math.sin(rtRadian) * 150;
    sideX = Math.cos(rtRadian) * 150;

    middleX = player.x + player.width / 2
    middleY = player.y + player.height / 2
}

function findPlayer(fx, fy) {
    playerdx = (player.x - enemy.x - backgx);
    playerdy = (player.y - enemy.y - backgy);
    playerdistance = Math.sqrt(playerdx * playerdx + playerdy * playerdy);

    fx = playerdx / 100;
    fy = playerdy / 100;

    if (isChasing == true) {
        enemy.x += fx;
        enemy.y += fy;
    }

     if (playerdistance > player.r + enemy.r) {
         isChasing = true;
    } else {
         isChasing = false;
    }


}




