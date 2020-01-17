// DS ASGN MOVIE RATINGS (2D)

// DOM Elements
let outputEl = document.getElementById('output');

// Main Menu & Go Button
document.getElementById('go').addEventListener('click', mainMenu);

let movieData = [];
fetch("movie.txt").then((rawData) => rawData.text()).then(processData);

function processData(textData) {
    // split text file into lines
    let lines = textData.split("\r\n");

    // For each line, creat a product object and add to grocerydata Array
    for (i = 0; i < lines.length; i++) {
        movieData.push(newProductObject(lines[i]))
    }
    console.log(movieData)
}

function newProductObject(productString) {
    let movieArray = productString.split(";");
    return {
        name: movieArray[0],
        date: Number(movieArray[1]),
        genre: movieArray[2],
        rating: Number(movieArray[3])
    }
}


function mainMenu() {
    // Get value of menu select element
    let selection = document.getElementById('menu').value;


    // Take action based on menu selection
    if (selection == 'display-all') {

        outputEl.innerHTML = ""
        outputEl.innerHTML = movieData.length + " Movies:" + "<br>"
        for (let i = 0; i < movieData.length; i++) {
            outputEl.innerHTML += movieData[i].name + "(" + movieData[i].date + ")" + " " + movieData[i].genre + " " + movieData[i].rating + "<br>";
        }

    } else if (selection == 'display-genre') {

        genreCount = 0
        let genreChoose = prompt("Type a Genre")

        outputEl.innerHTML = ''
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].genre == genreChoose) {
                genreCount++
                outputEl.innerHTML += movieData[i].name + "(" + movieData[i].date + ")" + " " + movieData[i].genre + " " + movieData[i].rating + "<br>";
            }

        }
        outputEl.innerHTML += genreCount + " Movies" + "<br>"

    } else if (selection == 'display-date-range') {
        let movieCount = 0
        let startDate = Number(prompt("Start Date"));
        let endDate = Number(prompt("End Date"));

        outputEl.innerHTML = '';

        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].date >= startDate && movieData[i].date <= endDate) {
                movieCount++
                outputEl.innerHTML += movieData[i].name + "(" + movieData[i].date + ")" + " " + movieData[i].genre + " " + movieData[i].rating + "<br>";
            }

        }
        outputEl.innerHTML += movieCount + " Movies" + "<br>"

    } else if (selection == 'display-random') {

        let randMovie = randomInt(0, movieData.length)
        outputEl.innerHTML = '';
        outputEl.innerHTML += movieData[randMovie].name + "(" + movieData[randMovie].date + ")" + " " + movieData[randMovie].genre + " " + movieData[randMovie].rating + "<br>";

    } else if (selection == 'ratings-adjustment') {

        let movieCount = 0
        outputEl.innerHTML = '';
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].rating == 1 || movieData[i].rating == 2) {
                movieCount++
                movieData[i].rating++

            }

        }
        outputEl.innerHTML += movieCount + " Movies were adjusted"

    } else if (selection == 'rating-stats') {
        let minRat = movieData[0].rating
        let maxRat = movieData[0].rating
        let avg = 0

        for (let i = 1; i < movieData.length; i++) {
            if (movieData[i].rating < minRat) {
                minRat = movieData[i].rating
            }

            if (movieData[i].rating > maxRat) {
                maxRat = movieData[i].rating
            }
            avg += movieData[i].rating
        }
        outputEl.innerHTML = '';
        outputEl.innerHTML = " Highest rated movie got a " + maxRat + "<br> Lowest rated movie got a " + minRat + "<br> Average rating was " + (avg / movieData.length);

    } else if (selection == 'add-movie') {

        let newTitle = prompt("Title")
        let newYear = Number(prompt("Year of creation"))
        let newGenre = prompt("Genre")
        let newRating = Number(prompt("Rating"))
        movieData.push({ name: newTitle, date: newYear, genre: newGenre, rating: newRating })
        outputEl.innerHTML = '';
        outputEl.innerHTML += "A new movie with a title of " + newTitle + ", year of " + newYear + ", genre of " + newGenre + " and rating of " + newRating + " was added."

    } else if (selection == 'top-movies-only') {

        let movieCount = 0
        outputEl.innerHTML = '';
        for (let i = movieData.length - 1; i >= 0; i--) {
            if (movieData[i].rating <= 3) {
                movieCount++
                movieData.splice(i, 1)
            }

        }
        outputEl.innerHTML = movieCount + " movies were removed";

    } else if (selection == 'remove-movie') {

        let movieTitle = prompt("Name of movie")
        for (let i = movieData.length - 1; i >= 0; i--) {
            if (movieData[i].name == movieTitle) {
                outputEl.innerHTML = movieData[i].name + " was removed";
                movieData.splice(i, 1)
            } else {
                outputEl.innerHTML = '"' + movieTitle + '"' + " Could not be found";

            }
        }
    }
}


function randomInt(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.floor(Math.random() * (high - low) + low);
}