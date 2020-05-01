var shuffle= new Audio("sounds/CardShuffle.mp3")
var cardPlayed= new Audio("sounds/card_played.mp3")
var win= new Audio("sounds/gamewon.mp3");
var lost= new Audio("sounds/gamelost.mp3");
var dealerHand=[];
var playerHand=[];
var pScore=[];
var dScore=[];
var cardSuit=["_C","_D","_H","_S"]

// here we generate a random card and check that it has not being dealt yet.
//at the same time we check and assign the proper values to aces-kings
function randomPlayerCardGenerator (){
var suit=cardSuit[Math.floor(Math.random()*4)];
var number=Math.ceil(Math.random()*13);
var card=number+suit;
if (!dealerHand.includes(card) && !playerHand.includes(card)){
  playerHand.push(card)
    cardPlayed.play()
    $('.playerArea').append(`<img id="theImg" src="Images/${card}.png" class="card"" />`)
    if(number>10){
      number=10
      pScore.push(number)
    }
    else if (number===1 && pScore.reduce((a,b)=>a+b,0)<11){
      number=11
      pScore.push(number)
    }

    else {
      pScore.push(number)
    }

}
else {
  randomPlayerCardGenerator()
}
}

//here we check the player hand to assing a different value to the ace in case player bust.
function checkScore(score){
  if(score.reduce((a,b)=>a+b,0)>22 && score.includes(11)){
    var ind=score.indexOf(11)
    score[ind]=1
    return score.reduce((a,b)=>a+b,0);
  }
  else {
  return score.reduce((a,b)=>a+b,0)
  }
}
//here we prevent the user to keep playing once he hit blackJack.or is bust.
function pBlackjack(score){
  if (score===21||score>21){
        dealerPlay();
    $(".hit,.stand").css("visibility","hidden")
    }
}


//same functionality as the player card generator but for the dealer

function randomDealerCardGenerator(){
  var dSuit=cardSuit[Math.floor(Math.random()*4)];
  var dNumber=Math.ceil(Math.random()*13);
  var dCard=dNumber+dSuit
  if (!dealerHand.includes(dCard) && !playerHand.includes(dCard)){
    dealerHand.push(dCard)
      cardPlayed.play()
      $('.dealerArea').append(`<img id="theImg" src="Images/${dCard}.png" class="card"" />`)
      if(dNumber>10){
        dNumber=10
        dScore.push(dNumber)
      }
      else if (dNumber===1 && dScore.reduce((a,b)=>a+b,0)<11){
        dNumber=11
        dScore.push(dNumber)
      }

      else {
        dScore.push(dNumber)
      }
}
else {
  randomDealerCardGenerator()
}
}
// here we control the behavior of the dealer
 function dealerPlay(){
   setTimeout(function(){
    $(".back").remove()


    if (dScore.reduce((a,b)=>a+b,0)>16){
      $(".dealerScore").text(dScore.reduce((a,b)=>a+b,0))
     return compare()
    }
  else if (pScore.reduce((a,b)=>a+b)>21){
       randomDealerCardGenerator()
       $(".dealerScore").text(dScore.reduce((a,b)=>a+b,0))

  return compare()
 }
else if ((dScore.reduce((a,b)=>a+b,0))<=(pScore.reduce((a,b)=>a+b)) && (pScore.reduce((a,b)=>a+b))<=21 && (dScore.reduce((a,b)=>a+b,0)<17 )){
     setTimeout(()=>0,1000)
    randomDealerCardGenerator()
    checkScore(dScore)
    $(".dealerScore").text(dScore.reduce((a,b)=>a+b,0))
      return dealerPlay()
          }

 else {
   if (dScore.length<2){
     randomDealerCardGenerator()
   }
    $(".dealerScore").text(dScore.reduce((a,b)=>a+b,0));
 return compare();
 }
},400)
}
// here we compare scores to determine the outcome of the match and enable the restart button
function compare () {
var player=pScore.reduce((a,b)=>a+b)
var dealer=dScore.reduce((a,b)=>a+b)
if (player>dealer&& player<22){
  win.play();
  $(".intro").text("YOU WON!");
}
else if(dealer>21 && player<22){
  win.play();
  $(".intro").text("YOU WON!");
}
else if(dealer>player||player>21){
lost.play();
$(".intro").text("YOU LOST 😢")
}
else {
$(".intro").text("Its a draw!")
}
$("#replay").css("visibility","visible")
}







$(".init").click(function(){
  shuffle.play()
  setTimeout(()=>$(".show").css("visibility","visible"),1000)
$(".start").css("visibility","visible")
randomPlayerCardGenerator();
randomPlayerCardGenerator();
randomDealerCardGenerator();
$('.dealerArea').append(`<img id="theImg" src="Images/backcard.png" class="card back"" />`)
$(".back").css({"position":"relative","right":"3.8%"});
$(".playerScore").text(pScore.reduce((a,b)=>a+b,0))
$(".dealerScore").text(dScore.reduce((a,b)=>a+b,0))
pBlackjack(pScore.reduce((a,b)=>a+b,0))
$(".init").css("visibility","hidden")
})


$(".hit").click(function(){
  randomPlayerCardGenerator();
  checkScore(pScore);
  {$(".playerScore").text(checkScore(pScore));}
  pBlackjack(pScore.reduce((a,b)=>a+b,0))
})

$(".stand").click(function(){
$(".hit,.stand").css("visibility","hidden")
dealerPlay();
 })

$("#replay").click(function(){
   dealerHand=[];
   playerHand=[];
   pScore=[];
   dScore=[];
   $(".dealerScore").text(0);
   $(".playerScore").text(0);
   $(".intro").text("Welcome To Blackjack!")
   $(".card").remove();
   randomPlayerCardGenerator();
   randomPlayerCardGenerator();
   randomDealerCardGenerator();
   $('.dealerArea').append(`<img id="theImg" src="Images/backcard.png" class="card back"" />`)
   $(".back").css({"position":"relative","right":"3.8%"});
   $(".playerScore").text(pScore.reduce((a,b)=>a+b,0))
   $(".dealerScore").text(dScore.reduce((a,b)=>a+b,0))
   pBlackjack(pScore.reduce((a,b)=>a+b,0))
   $(".start").css("visibility","visible")
   $("#replay").css("visibility","hidden")
})
