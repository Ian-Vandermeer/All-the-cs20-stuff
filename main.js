// Gmaning time 

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;
let mouseIsPressed = false
let time = 0
let bottles = []
let MouseX, MouseY

class Bottle {
    constructor(x, y, color, Xposition, Yposition) {
        this.Xposition = Xposition
        this.Yposition = Yposition
        this.x = x;
        this.y = y;
        this.color = color;
    }
    // da funky funk


    // Draws bottles
    drawBottles() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x, this.y, 79, 79)
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x + 79 / 2, this.y + 79 / 2, 38, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black"
        ctx.fillText(this.Xposition + ", " + this.Yposition, this.x + 35, this.y + 35, 10)
    }


}



// Main Program Loop
requestAnimationFrame(draw)
function draw() {

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    time++

    // Add Bottles to an array
    if (time >= 240) {
        time = 0
        for (let i = bottles.length - 1; i >= 0; i--) {
            bottles[i].y -= 80
            bottles[i].Yposition++
        }
        for (let i = 0; i <= 800; i += 80) {
            bottles.push(new Bottle(i, 721, goodcolor(), i / 80, 0))
        }
    }

    // calls functions for all of the Bottles
    for (let j = bottles.length - 1; j >= 0; j--) {
        bottles[j].drawBottles()
    }

    onClick()

    // Request another Animation Frame
    requestAnimationFrame(draw);
}


function onClick() {
    if (mouseIsPressed == true) {
        mouseIsPressed = false;
        for (let i = bottles.length - 1; i >= 0; i--) {
            if (mouseX > bottles[i].x && mouseX < bottles[i].x + 79 && mouseY > bottles[i].y && mouseY < bottles[i].y + 79) {


                // More efficient but not complete
                //     let temp = i;

                //     for (let xoff = -1; xoff <= 1; xoff++) {
                //         if (bottles[temp].color == bottles[temp + xoff].color && bottles[temp + xoff].Xposition > 0) {
                //             bottles.splice(temp + xoff, 1);
                //             temp--;
                //         } 
                //     }
                // }


                // very inefficent method, but works
                right = [bottles[i].Xposition + 1, bottles[i].Yposition]
                left = [bottles[i].Xposition - 1, bottles[i].Yposition]
                up = [bottles[i].Yposition + 1, bottles[i].Xposition]
                down = [bottles[i].Yposition - 1, bottles[i].Xposition]
                color = bottles[i].color

                bottles.splice(i, 1)
                for (let j = bottles.length - 1; j >= 0; j--) {
                    if (bottles[j].Xposition == right[0] && bottles[j].Yposition == right[1] && bottles[j].color == color) {
                        
                        bottles.splice(j, 1)
                    }
                    if (bottles[j].Xposition == left[0] && bottles[j].Yposition == left[1] && bottles[j].color == color) {
                        bottles.splice(j, 1)
                    }
                    if (bottles[j].Yposition == down[0] && bottles[j].Xposition == down[1] && bottles[j].color == color) {
                        bottles.splice(j, 1)
                    }
                    if (bottles[j].Yposition == up[0] && bottles[j].Xposition == up[1] && bottles[j].color == color) {
                        bottles.splice(j, 1)
                    }
                }
            }
        }
    }
}








// clicky clicky 
document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
    let cnvRect = cnv.getBoundingClientRect();

    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);

}

document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
    mouseIsPressed = true;
}
function mouseupHandler() {
    mouseIsPressed = false;
}



// Helper Functions
function randomDec(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.random() * (high - low) + low;
}

function randomInt(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.floor(Math.random() * (high - low) + low);
}


function goodcolor() {
    colors = ['#52FF28', '#FF6C0C', '#FF0C91', '#0C9FFF']
    return colors[randomInt(0, colors.length)]
}