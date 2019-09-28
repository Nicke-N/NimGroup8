// "Global" variable
let allsticks = []; 
let gameboard;
let gameInput;
let gamecontent;
let drawButton;
let totalSticks = 21;

function startgame() {
    /**
     * check to see if the players have filled in the names
     * start the game if done
     * else if not, player will be alertade to fill in the names
     */
    if (!document.getElementById("player1input").value == "" &&
        !document.getElementById("player2input").value == "") { 
        //Display the player names that was inputed
        let player1 = document.getElementById("player1"); 
        let player2 = document.getElementById("player2");
        player1.textContent = document.getElementById("player1input").value;
        player2.textContent = document.getElementById("player2input").value;
        
        //hides the name input fields
        document.getElementById("beginning").style.display = "none";
        document.getElementById("players").classList.remove("hide");

        createGameboard();
        
    } else {
        alert("Please enter a name for both players");                                        
    }
}


/**
 * Creates a div for the gameboard and game input that is then appended to the gameconent 
 */
function createGameboard() {
    //for accesing the gameconent div
    gamecontent = document.getElementById("gamecontent");

    gameboard = document.createElement("div"); 
    gameboard.id = "dispSticks";
    gameInput = document.createElement("div");
    gameInput.id = "gameInput";
    
    //Calls all the function to create the specific parts of the gameboard
    createGameLog();
    createOptionPicker();
    createDrawButton();
    createAllSticks();   

    gamecontent.appendChild(gameInput);
    gamecontent.appendChild(gameboard); 

}

/**
 * Creates a div for gamelog and then an textarea to place inside the div
 */
function createGameLog() {
    let gamelog = document.createElement("div");
    gamelog.id = "log";
    let log = document.createElement("textarea"); 
    log.id = "gamelog";
    log.setAttribute("rows", "23"); 
    log.setAttribute("cols", "20"); 
    gamelog.appendChild(log);
    gamecontent.appendChild(gamelog);
}

/**
 * Creates a select element
 * A loop that creates 3 options with values 1-3
 * and appends it to the gameInput div
 */
function createOptionPicker() {
    let alloptions = document.createElement("select"); 
    for (let eachoption = 1; eachoption < 4; eachoption++) {
        let specificoption = document.createElement("option"); 
        specificoption.id = "op" + eachoption;
        specificoption.textContent = eachoption;
        specificoption.value = eachoption; 
        alloptions.id = "options"; 
        alloptions.appendChild(specificoption); 
    }
    gameInput.appendChild(alloptions); 
}

/**
 * creates a button named Draw Sticks with a value to check player active
 * and attach the draw function to it
 * appends to the gameInput
 */
function createDrawButton() {
    drawButton = document.createElement("button"); 
    drawButton.setAttribute("onclick", "draw()"); 
    drawButton.textContent = "Draw sticks";
    drawButton.setAttribute("value", "1");
    drawButton.id = "draw";
    gameInput.appendChild(drawButton);
}

function draw() {
    removeStick();

    //prints the players name, the sticks that is drawn and left
    let activeplayer = document.getElementsByClassName("playing");
    let html2array = Array.from(activeplayer);
    let player = html2array.map((element) => {
        return element.textContent;
    });
    let optionValue = document.getElementById("options");
    document.getElementById("gamelog").textContent += player[0] + " drew " + optionValue.options[optionValue.selectedIndex].value + " sticks!\n" + totalSticks + " left\n";
    // always scroll the gamelog/textarea to bottom
    document.getElementById("gamelog").scrollTop = document.getElementById("gamelog").scrollHeight;

    /**
     * check if the last sticks are being drawn and if so print that the player has lost
     * and end game
     * else change to the other player
     */
    if(gameboard.children.length <= 0){
        document.getElementById("gamelog").textContent += player[0] + " lost the game!";
        document.getElementById("draw").disabled = true;
    } else {
        //Switch player with button value and change the background color of the active player
        if(drawButton.value == 1) { 
            document.getElementById("player1").classList.remove("playing");
            document.getElementById("player2").classList.add("playing");
            drawButton.value = 2;
        } else if(drawButton.value == 2){
            document.getElementById("player1").classList.add("playing");
            document.getElementById("player2").classList.remove("playing");
            drawButton.value = 1;
        }
    }
 

}

/**
 * Creates the sticks as divs and place them in an array and then appends all of them on the to the gameboard
 */
function createAllSticks() {
    for (let eachstick = 0; eachstick < totalSticks; eachstick++) {
        let theStick = document.createElement("div")
        theStick.className = "stick"
        theStick.id = "sNr" + eachstick;
        allsticks[eachstick] = theStick;
    }
    for (let i of allsticks) {
        gameboard.appendChild(i);
    }
}

/**
 * Check the player input and removes that amount of sticks
 */
function removeStick() {
    let optionValue = document.getElementById("options");
    let removeStickValue = Number(optionValue.options[optionValue.selectedIndex].value);
    let gameboard = document.getElementById("dispSticks");
    let sticktoberemoved = 0;
        for (let i = 0; i < removeStickValue; i++) {        
            gameboard.removeChild(gameboard.children[sticktoberemoved]);
            console.log(totalSticks--);
            // break if the player is picking more than what's left on the board
            if(gameboard.children.length <= 0) break;
        }
}
