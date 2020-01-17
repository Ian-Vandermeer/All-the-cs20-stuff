// CAUGHT SPEEDING ASSIGNMENT START CODE

// HTML Elements
let calcBtnEl = document.getElementById('calc-btn');
let speedEl = document.getElementById('speed');
let limitEl = document.getElementById('limit');
let birthdayEl = document.getElementById('birthday');
let ticketEl = document.getElementById('ticket-type');
let decisionEl = document.getElementById('decision');

// Add Event Listener
calcBtnEl.addEventListener('click', caughtSpeeding);

// Event Function
function caughtSpeeding() {
    // Inputs
    let speedInput = Number(speedEl.value);
    let limitInput = Number(limitEl.value);
    let birthdayInput = birthdayEl.value;

    // Determine Result
    if (isInputValid(speedInput, limitInput)) {
        ticketEl.innerHTML = determineTicketType(speedInput, limitInput);
        decisionEl.innerHTML = determineDecision(birthdayInput)
    }

}

// YOUR FUNCTIONS
function isInputValid(speed, limit) {
    if (speed > limit) {
        return true;
    } else {
        alert("The car speed must be greater than the speed limit.")
        return false;
    }
}

function determineTicketType(speed, limit) {
    if (limit + 20 >= speed ) {
        return "Small Ticket"
    } else {
        return "Big Ticket"
    }
}

function determineDecision(birthday) {
    if (birthday == "yes") {
        let randNum = Math.random()

        if (randNum < 0.25) {
            return "Pay Ticket in Full"
        } else if (randNum < 0.5) {
            return "Pay Half of Ticket"
        } else if (randNum < 0.75) {
            return "Pay Quarter of Ticket"
        } else {
            return "No Ticket Issued"
        }
    } else {
        return "Pay Ticket in Full"
    }
}