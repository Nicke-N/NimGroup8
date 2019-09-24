function startgame() {

    let player1 = document.getElementById("player1"); //hämtar textrutor som ej syns
    let player2 = document.getElementById("player2");
    let gamecontent = document.getElementById("gamecontent"); //samma här, men själva div där spelet kmr va


    if (!document.getElementById("player1input").value == "" &&
        !document.getElementById("player2input").value == "") { //ifall inputs til spelarnamn inte är tomma händer detta
        player1.textContent = document.getElementById("player1input").value;
        player2.textContent = document.getElementById("player2input").value;

        document.getElementById("beginning").classList.add("hide"); //gömmer en div
        document.getElementById("players").classList.remove("hide"); //visar en annan
        console.log("woho");

        let gameboard = document.createElement("p"); //skapar P som ska innehålla gameboard
        let gamenav = document.createElement("p"); //P som ska innehålla navigation, gamenav
        let gamelog = document.createElement("p");
        let alloptions = document.createElement("select"); //samlar alla options nedan
        let log = document.createElement("textarea");   //log skpaas o innehåller textarea
        log.id = "gamelog"; //log for id, log:en ska visa vems tur det är, vem som gjort vad osv.
        log.setAttribute("rows", "20"); // log for rows
        log.setAttribute("cols", "30"); //log for cols
        let allsticks = [];

        for (let eachstick = 0; eachstick < 21; eachstick++) { //fyller array med sticks
            allsticks[eachstick] = "|";
        }
        gameboard.textContent = allsticks.join(" "); //ersätter "," i array med " "

        for (let eachoption = 1; eachoption < 4; eachoption++) {
            let specificoption = document.createElement("option"); //skapar options 1 - 3
            specificoption.textContent = eachoption;
            specificoption.value = eachoption; //tror ej denna behövs men lämnar den här ifall ni vill använda den
            alloptions.appendChild(specificoption); // alloptions(select) hämtar options en i taget
        }
        let button = document.createElement("button"); //skapar knapp
        button.setAttribute("onclick", "draw()"); //med attributen att kunna tillkalla en funktion
        button.textContent = "Draw sticks"; //Vad som står på knappen
        button.setAttribute("value", "1"); //button får value som används för att byta spelare.
        button.id = "play";

        gamenav.appendChild(alloptions); //gamenav(p) hämtar alloptions som fyllts med options.
        gamenav.appendChild(button); //gamenav hämtar button

        gamelog.appendChild(log);   //gamelog hämtar log

        gamecontent.appendChild(gameboard); // gamecontent hämtar gameboard och gamenav.
        gamecontent.appendChild(gamenav);
        gamecontent.appendChild(gamelog);
        localStorage.setItem("theboard", allsticks); //sparar arrayen.
    } else {
        console.log("oops"); //användes för felsökning                                        
    }
}

function draw() {
    let button = document.getElementById("play"); //hämtar knapp med id
    let allsticks = localStorage.getItem("theboard"); //hämtar array med sticks
    
    if(button.value == 1) { //om knappen har 1 i value, som under p1's tur, händer detta


        document.getElementById("player1").classList.remove("playing");
        document.getElementById("player2").classList.add("playing");
        button.value = 2;   //efter turen blir button value 2, vilket e p2s tur.
    } else if(button.value == 2){


        document.getElementById("player1").classList.add("playing");
        document.getElementById("player2").classList.remove("playing");
        button.value = 1;
    }

}