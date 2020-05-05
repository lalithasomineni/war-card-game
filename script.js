 //front-end Logic

 //adding event listeners to buttons 
 var newGame = document.getElementById('new-game');

 var Hit = document.getElementById('Hit');

 document.getElementById("new-game").addEventListener("click", createDeck);

 document.getElementById("Deal").addEventListener("click", cardDistribution);

 document.getElementById("Hit").addEventListener("click", compareCards);

 //----------------------end of frontendlogic-------------------------//

 //---------------------------todo----------------------------//
 /*create a deck
 assign links to those objects
 dom images using links
 distribute cards to players
 compare cards*/
//------------------------------------------------------------//

   
   //creating a deck
 var suits = ["Hearts", "Spades", "Clubs", "Diamonds"];

 var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];

 var cardLinks = ['images/hearts/hearts-r02.svg', 'images/hearts/hearts-r03.svg', 'images/hearts/hearts-r04.svg', 'images/hearts/hearts-r05.svg', 'images/hearts/hearts-r06.svg', 'images/hearts/hearts-r07.svg', 'images/hearts/hearts-r08.svg','images/hearts/hearts-r09.svg', 'images/hearts/hearts-r10.svg', 'images/hearts/hearts-J.svg','images/hearts/hearts-Q.svg','images/hearts/hearts-K.svg','images/hearts/hearts-A.svg', 'images/spades/spades-r02.svg', 'images/spades/spades-r03.svg', 'images/spades/spades-r04.svg','images/spades/spades-r05.svg','images/spades/spades-r06.svg', 'images/spades/spades-r07.svg', 'images/spades/spades-r08.svg', 'images/spades/spades-r09.svg', 'images/spades/spades-r10.svg', 'images/spades/spades-J.svg', 'images/spades/spades-Q.svg', 'images/spades/spades-K.svg', 'images/spades/spades-A.svg', 'images/clubs/clubs-r02.svg', 'images/clubs/clubs-r03.svg', 'images/clubs/clubs-r04.svg', 'images/clubs/clubs-r05.svg', 'images/clubs/clubs-r06.svg', 'images/clubs/clubs-r07.svg', 'images/clubs/clubs-r08.svg', 'images/clubs/clubs-r09.svg', 'images/clubs/clubs-r10.svg', 'images/clubs/clubs-J.svg', 'images/clubs/clubs-Q.svg', 'images/clubs/clubs-K.svg', 'images/clubs/clubs-A.svg', 'images/diamonds/diamonds-r02.svg', 'images/diamonds/diamonds-r03.svg', 'images/diamonds/diamonds-r04.svg', 'images/diamonds/diamonds-r05.svg', 'images/diamonds/diamonds-r06.svg', 'images/diamonds/diamonds-r07.svg', 'images/diamonds/diamonds-r08.svg', 'images/diamonds/diamonds-r09.svg', 'images/diamonds/diamonds-r10.svg', 'images/diamonds/diamonds-J.svg', 'images/diamonds/diamonds-Q.svg', 'images/diamonds/diamonds-K.svg', 'images/diamonds/diamonds-Q.svg'];
 
 ///------------in this way of creating a deck order is important--------//



    let globalDeck = []; //empty array

//-------------------CREATING A DECK-------------------------//
    
      function createDeck()
    {
         let deck = new Array();  //empty array 

        for(let i = 0; i < suits.length; i++)
        {
            for(let x = 0; x < values.length; x++){

             
               let card = {Value: values[x], Suit: suits[i]};//creating a card object with values and suit properties

                deck.push(card);//pushing all cards into deck array

        }
   }

         globalDeck = new Array();

         for (let i = 0; i < cardLinks.length; i++)
         {
                    let card2 = deck[i]//card of index i

                     Object.assign(card2, {cardLink: cardLinks[i]});//assigning card links
                    
                     globalDeck.push(card2);//pushing those cards into global deck
         }
          

         return globalDeck;
    }
       
    //empty hands

    let player1Deck = [];

    let player2Deck = [];

     
    //card distribution 26 each

    //----------------------------card Distribution---------------------//

    function cardDistribution() {
        

        for (i=0; i < 26; i++) {

            let card1 = Math.floor(Math.random()*globalDeck.length);
            player1Deck.push(globalDeck[card1]);
            globalDeck.splice(card1,1);


            let card2 = Math.floor(Math.random()*globalDeck.length);
            player2Deck.push(globalDeck[card2]);
            globalDeck.splice(card2, 1);

        }
         //css bg
       document.getElementById('player1').setAttribute('src', 'images/backs/blue.svg');

       document.getElementById('player2').setAttribute('src', 'images/backs/red.svg');
    }
 
  //empty score decks
 let playerScore1 = [];

 let playerScore2 = [];
 //-----------------------backend logic----------------------------------//
 function compareCards(){

 	let playerCard1 = player1Deck[0];
    //remove
 	player1Deck.splice(playerCard1,1)

 	let playerCard2 = player2Deck[0];
 	player2Deck.splice(playerCard2,1);

       //css bg
        document.getElementById('player1').setAttribute('src', `${playerCard1.cardLink}`);
        document.getElementById('player2').setAttribute('src', `${playerCard2.cardLink}`);
        

      let player1CardValue = playerCard1.Value;
        let player2CardValue = playerCard2.Value;

        console.log(player1CardValue);
        console.log(player2CardValue);
        

        let player1CompareValue = values.indexOf(playerCard1.Value) + 1;
        let player2CompareValue = values.indexOf(playerCard2.Value) + 1;
           

 
 //pusing cards to players score deck*******************//
        if (player1CompareValue > player2CompareValue) {
            playerScore1.push(playerCard1);
            playerScore1.push(playerCard2);


                document.getElementById("winner").textContent = "Player 1 Wins!";
               document.getElementById("player1-score").textContent = `${playerScore1.length}`;
                
            } else if (player2CompareValue > player1CompareValue){
                playerScore2.push(playerCard1);
                playerScore2.push(playerCard2);


               document.getElementById("player2-score").textContent = `${playerScore2.length}`;
                document.getElementById('winner').textContent = "Player 2 Wins!";
                
            } else {
                document.getElementById('winner').textContent = "We have a tie!";
                document.getElementById("player1-score").textContent = `${playerScore1.length}`;
                document.getElementById("player2-score").textContent = `${playerScore2.length}`;  
            }
//-----------when cards in players are completed gameover case----------//

        if (player1Deck.length === 0 && player2Deck.length === 0) {

            document.getElementById('game-over').textContent = "Game Over";


            if(playerScore1.length > playerScore2.length){

                document.getElementById('winner').textContent = "Player 1 Wins!";

            } 
            else if (playerScore1.length < playerScore2.length) {

                document.getElementById('winner').textContent = "Player 2 Wins!";

            }
            else {

                document.getElementById('winner').textContent = "Game Ends in a Tie!";
            }

            //------------finally to start game again call all those funcs again***
            

            createDeck();

            player1Deck = [];
            player2Deck = [];
            playerScore1 = [];
            playerScore2 = [];
            cardDistribution();
            render();
        }

//make scores 0
function render() {
       
        document.getElementById("player1-score").textContent = `${playerScore1.length}`
        document.getElementById("player2-score").textContent = `${playerScore2.length}`
        
    }
}    
        
        
 