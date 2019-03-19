/*
 * Create a list that holds all of your cards
 */
var allFlipped = []; /*will store a list of flipped cards*/
var justFlipped = [];
var score = 0;
var moves = 0;
var startTime = 0;
var timePlayed = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

function startNew() {
 score = 0;
 moves = 0;
 timePlayed = 0;
 startTime = Date.now();
           document.querySelector(".moves").innerText = moves;
  var deckOfCards = shuffle(["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube",
                     "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb",
                     "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]);
 /* this function is going to take the deck, run it through the shuffle function, and then output into the deck list */
    var shuffledDeck = document.querySelector(".deck");

    var cardCounter = 0;
    while (shuffledDeck.firstChild){
    	shuffledDeck.removeChild(shuffledDeck.firstChild)};
    var starReset = document.querySelector(".stars");
    while (starReset.firstChild){ /*removes any leftover stars*/
      starReset.removeChild(starReset.firstChild)
    };
    var starList = [document.createElement("li"), document.createElement("li"), document.createElement("li")]
    var starItems = [document.createElement("i"), document.createElement("i"), document.createElement("i")]
    var i= 0;
    while (i < 3){
      starItems[i].className = "fa fa-star";
      starList[i].appendChild(starItems[i]);
      starReset.appendChild(starList[i]);
      i++;
    }
    deckOfCards.forEach(function(card){
        var nextUp = document.createElement("li")
        var thing1 = document.createElement("i");
        nextUp.className = "card";
        thing1.className = 'fa ' + card;
        nextUp.id = cardCounter;
        cardCounter += 1;
        nextUp.appendChild(thing1);
        shuffledDeck.appendChild(nextUp);
    });
    }


function clickACard(cardItem) {
    /* This function will fire when the user clicks a card and flip the card over, add identify of flipped card to flipList */
    if (cardItem.className != "card open show"){
      cardItem.setAttribute('class', "card open show");

          var wholeDeck = cardItem.parentNode.childNodes;
      if (justFlipped.length) {
        if (justFlipped[0] != cardItem.id) {
          justFlipped.push(cardItem.id);
        }
      } else {
        justFlipped.push(cardItem.id);
      }
      if (justFlipped.length == 2){
          if (wholeDeck[justFlipped[0]].firstChild.className != wholeDeck[justFlipped[1]].firstChild.className){
            moves+=1;
            setTimeout(function putThemBack() {
              while (justFlipped.length > 0){
                var nubbin = justFlipped.pop();
                wholeDeck[nubbin].setAttribute('class', "card");

              }}, 1500);
          } else {
            while (justFlipped.length > 0){
              var nubbin = justFlipped.pop();
              allFlipped.push(nubbin);
              moves += 1;
              score += 1;}
            }

          }
          document.querySelector(".moves").innerText = moves;
          var starReset = document.querySelector(".stars");
          while (starReset.firstChild){ /*removes any leftover stars*/
            starReset.removeChild(starReset.firstChild)
          };
          if (moves<25){
          var starList = document.createElement("li");
          var starItems = document.createElement("i");
            starItems.className = "fa fa-star";
            starList.appendChild(starItems);
            starReset.appendChild(starList);
          }
          if (moves<20){
          var starList = document.createElement("li");
          var starItems = document.createElement("i");
            starItems.className = "fa fa-star";
            starList.appendChild(starItems);
            starReset.appendChild(starList);
          }
          if (moves<16){
          var starList = document.createElement("li");
          var starItems = document.createElement("i");
            starItems.className = "fa fa-star";
            starList.appendChild(starItems);
            starReset.appendChild(starList);
          }
          if (allFlipped.length == wholeDeck.length) {
            // Get the modal
            var modal = document.getElementById('victory');

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("playAgain")[0];
            document.querySelector(".howlong").innerText = timePlayed;
            document.querySelector(".howmany").innerText = moves;
            modal.style.display = "block";
            var victoryButton = document.getElementById("playAgain");
            victoryButton.onclick = function(){
              modal.style.display = "none";
              startNew();
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            }
            }
}

}


startNew(); /* initializes new game */
setInterval(function(){
  timePlayed = Math.floor((Date.now() - startTime) / 1000);
  document.querySelector(".timer").innerText = timePlayed ;
}, 1000);
document.addEventListener('click', function (event) {
	if (event.target.matches('.fa-repeat')) {
		startNew();
	}
	if (event.target.matches('.card')) {
		clickACard(event.target);
	}
}, false);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
