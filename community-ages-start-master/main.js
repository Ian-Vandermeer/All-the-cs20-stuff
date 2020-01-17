// COMMUNITY AGES ASSIGNMENT

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 500;

// Global Variables
let ages = [];
let max = 100; // array values should be b/t 0 and max

for (let i = 0; i < 150; i++) {
    ages.push(randomInt(0, 100))
}
// Main Program Loop
requestAnimationFrame(draw);

function draw() {
    // Logic
    let barWidth = cnv.width / ages.length;

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Draw Bar Graph
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "grey";
    for (let i = 0; i < ages.length; i++) {
        // Calculate scaled bar height based on cnv.height and canvasMax
        let barHeight = ages[i] * (cnv.height / max);

        ctx.fillRect(i * barWidth, cnv.height - barHeight, barWidth, barHeight);
        ctx.strokeRect(i * barWidth, cnv.height - barHeight, barWidth, barHeight);
    }

    // Request another Animation Frame
    requestAnimationFrame(draw);
}

// MAIN MENU EVENTS

// DOM Elements
let outputEl = document.getElementById('output');

// Main Menu & Go Button
document.getElementById('go').addEventListener('click', mainMenu);

function mainMenu() {
    // Get value of menu select element
    let selection = document.getElementById('menu').value;

    // Take action based on menu selection
    if (selection == 'demographics') {
        let avg = 0
        let maxage = ages[0]
        let minage = ages[0]
        let kid = 0
        let teen = 0
        let adult = 0
        let boomer = 0
        let oldPeop = 0

        for (let i = 0; i < ages.length; i++) {
            avg += ages[i]
            if (ages[i] > maxage) {
                maxage = ages[i]
            }
            if (ages[i] < minage) {
                minage = ages[i]
            }
            if (ages[i] < 17) {
                kid++
            } else if (ages[i] < 25) {
                teen++
            } else if (ages[i] < 49) {
                adult++
            } else if (ages[i] < 69) {
                boomer++
            } else {
                oldPeop++
            }
        }

        outputEl.innerHTML = 'Max age: ' + maxage + ', Min age ' + minage + ', avg age ' + (avg / ages.length).toFixed(2) + "<br> Ages 0 to 17: " + kid + "<br> Ages 18 to 25: " + teen + "<br> Ages 26 to 49: " + adult + "<br> Ages 50 to 69: " + boomer + "<br> Ages 70 and up: " + oldPeop
    } else if (selection == 'add-member') {
        let newMember = prompt("Age for New Member")
        Number(ages.push(newMember))
        outputEl.innerHTML = 'A New Member Has Been Added That Is ' + newMember + ' years old';

    } else if (selection == 'alien-abduction') {
       
        let abductee = randomInt(0, ages.length)
        outputEl.innerHTML = 'A ' + ages[abductee] + " year old was Abducted";
        ages.splice(abductee, 1)
        

    } else if (selection == 'move-to-college') {
        movers = 0
        for (let i = ages.length - 1; i >= 0; i--) {
            if (ages[i] <= 25 && ages[i] >= 18) {
                ages.splice(i, 1)
                movers++
            }
        }
        outputEl.innerHTML = movers + ' Moved to College';
    } else if (selection == 'time-travel') {
        timetravel = prompt("Number of years traved")
        for (let i = 0; i < ages.length; i++) {
            ages[i] += Number(timetravel)
        }
        outputEl.innerHTML = 'Time Travel';
    } else if (selection == 'flu-epidemic') {
        let deaths = 0
        let survivors = 0
        for (let i = ages.length - 1; i >= 0; i--) {
            if (ages[i] < 70) {
                let randnum = Math.random()
                if(randnum <= 0.3) {
                    ages.splice(i,1)
                    deaths++
                } else {
                    survivors++
                }

            } else if (ages[i] >= 70) {
                let randnum = Math.random()
                if(randnum <= 0.5) {
                    ages.splice(i,1)
                    deaths++
                } else {
                    survivors++
                }
            }
        }
        outputEl.innerHTML = 'Flu Epidemic Killed ' + deaths + " people <br> " + survivors + " Survived";
    }
}

function randomInt(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.floor(Math.random() * (high - low) + low);
}