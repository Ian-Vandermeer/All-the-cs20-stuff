// DS ASGN STARTER TEMPLATE

// DOM Elements
let outputEl = document.getElementById('output');

// Main Menu & Go Button
document.getElementById('go').addEventListener('click', mainMenu);

// Glob stuff
let allGroceryData = [];
fetch("grocery-data.txt").then((rawData) => rawData.text()).then(processData);

function processData(textData) {
    // split text file into lines
    let lines = textData.split("\r\n");

    // For each line, creat a product object and add to grocerydata Array
    for (i = 0; i < lines.length; i++) {
        allGroceryData.push(newProductObject(lines[i]))
    }
    console.log(allGroceryData)
}

function newProductObject(productString) {
    let productArray = productString.split(";");
    return {
        name: productArray[0],
        price: Number(productArray[1]),
        country: productArray[2]
    }
}




function mainMenu() {
    // Get value of menu select element
    let selection = document.getElementById('menu').value;

    // Take action based on menu selection
    if (selection == 'displayAll') {
        outputEl.innerHTML = ""
        outputEl.innerHTML = allGroceryData.length + " items:" + "<br>"
        for (i = 0; i < allGroceryData.length; i++) {
            outputEl.innerHTML += allGroceryData[i].name + " " + "$" + allGroceryData[i].price.toFixed(2) + " " + allGroceryData[i].country + "<br>";
        }

    } else if (selection == 'priceRange') {
        outputEl.innerHTML = "Prices from $<input id='pricelowInput'> To $<input id='pricehighInput'>" + " <button id='findRange'>Find</button>"
        document.getElementById("findRange").addEventListener("click", findRange)
    } else if (selection == 'findOrigin') {
        outputEl.innerHTML = "Please input country of origin:<input id='country'>" + " <button id='findCountry'>Find</button>"
        document.getElementById("findCountry").addEventListener("click", findOrigin)
    } else if (selection == 'findRand') {
        let randGroc = randomInt(0, allGroceryData.length)
        outputEl.innerHTML = "<br>" + allGroceryData[randGroc].name + " $" + allGroceryData[randGroc].price.toFixed(2) + " " + allGroceryData[randGroc].country;
    } else if (selection == 'inflate') {
        outputEl.innerHTML = "Prices have been increased by 7%"
        for (i = 0; i < allGroceryData.length; i++) {
            allGroceryData[i].price *= 1.07;
        }

    } else if (selection == 'priceStats') {
        let minGroc = allGroceryData[0].price;
        let maxGroc = allGroceryData[0].price;
        let avg = allGroceryData[0].price;

        for (i = 1; i < allGroceryData.length; i++) {
            if (allGroceryData[i].price < minGroc) {
                Number(minGroc = allGroceryData[i].price);
            }
        }

        for (i = 1; i < allGroceryData.length; i++) {
            if (allGroceryData[i].price > maxGroc) {
                Number(maxGroc = allGroceryData[i].price);
            }
        }

        for (i = 1; i < allGroceryData.length; i++) {
            avg += allGroceryData[i].price;
        }
        outputEl.innerHTML = "Lowest price: $" + minGroc.toFixed(2) + "<br> Highest price: $" + maxGroc.toFixed(2) + "<br> Average Price: $" + (avg / allGroceryData.length).toFixed(2);
    
    } else if (selection == 'addProduct') {
        outputEl.innerHTML = "Name of product:<input id='prodName'> <br>" + "Price of product:<input type=number id='prodPrice'> (No dollar sign needed) <br>" + "Products Country of origin:<input id='prodCountry'> <br>" + " <button id='makeItem'>Add</button>"
        document.getElementById("makeItem").addEventListener("click", addItem)
   
    } else if (selection == "removeProd") {
        removed = 0
         for (i = allGroceryData.length - 1; i > 0; i--) {
             if (allGroceryData[i].price < 15) {
                 allGroceryData.splice(i, 1);
                 removed++
            }
         }
        outputEl.innerHTML = removed + " Products were removed";
    } else if (selection == 'removeSpecificProd') {
        outputEl.innerHTML = "Name of product:<input id='prodName'> <br>" + "Price of product:<input type=number id='prodPrice'> (No dollar sign needed) <br>" + "Products Country of origin:<input id='prodCountry'> <br>" + " <button id='removeItem'>Remove</button>"
        document.getElementById("removeItem").addEventListener("click", removeItem)
    }
}


function removeItem() {
    name = document.getElementById("prodName").value
    price = Number(document.getElementById("prodPrice").value)
    country = document.getElementById("prodCountry").value
    for (i = 0; i< allGroceryData.length; i++) {
        if (price == allGroceryData[i].price && name == allGroceryData[i].name) {
            allGroceryData.splice(i, 1)
            outputEl.innerHTML = "Product: " + name + " - $" + price + " " + country + " has been removd from the list"
            break
        } else {
            outputEl.innerHTML = "Item not found D:"
        }
    }
}

function addItem() {
    name = document.getElementById("prodName").value
    price = Number(document.getElementById("prodPrice").value)
    country = document.getElementById("prodCountry").value
    allGroceryData.push({ name: name, price: price, country: country })
    outputEl.innerHTML = "Product: " + name + " - $" + price + " " + country + " has been added to the list"
}

function findRange() {
    let min = document.getElementById("pricelowInput").value
    let max = document.getElementById("pricehighInput").value
    let itemCount = 0
    for (i = 0; i < allGroceryData.length; i++) {
        if (Number(allGroceryData[i].price) < max && Number(allGroceryData[i].price) > min) {
            itemCount++
            outputEl.innerHTML += "<br>" + allGroceryData[i].name + " $" + allGroceryData[i].price.toFixed(2) + " " + allGroceryData[i].country;
        }
    }
}


function findOrigin() {
    let origin = document.getElementById("country").value

    for (i = 0; i < allGroceryData.length; i++) {
        if (allGroceryData[i].country.toLowerCase() == origin.toLowerCase()) {
            outputEl.innerHTML += "<br>" + allGroceryData[i].name + " $" + allGroceryData[i].price.toFixed(2) + " " + allGroceryData[i].country;
        }
    }
}


function randomInt(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.floor(Math.random() * (high - low) + low);
}