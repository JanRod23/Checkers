var allTableCells = document.querySelectorAll("td");
var unSelectButton = document.getElementById("deSelect");
var newGameButton = document.getElementById("start");
var closeInstructions = document.getElementById("closeInstructions");
var instructionsDiv = document.getElementById("hideMe");
var checkerBoard = document.getElementById("checkersScreen");
var cellCapture = allTableCells[0];
var selected = false;
var movesCounter = 0;
var yourTurn = true;
var targetCell;
var newCell;
var eatenPiece;
var blackKing = false;
var redKing = false;
var targetIndex;
var selectedIndex;
var difference;
var absDifference;
var isTargetValid;
var kingEaterLoops;
var kingVictim = 0;
var cpuTurn = false;
var countCpuMoves = 0;

newGameButton.addEventListener("click", startGame);
closeInstructions.addEventListener("click", hideInstructions);

function hideInstructions(){
   instructionsDiv.style.visibility = "hidden";
   instructionsDiv.style.display = "none";
   checkerBoard.style.display = "block";
   checkerBoard.style.visibility = "visible";
}

function startGame(){
   cellCapture = allTableCells[0];
   cpuTurn = false;
   yourTurn = true;
   clearTable();
   startTable();
}


function unSelect() {

   for (i = 0; i < allTableCells.length; i ++){
      if(allTableCells[i].classList.contains("selected")){
         allTableCells[i].classList.remove("selected");
         selected = false;
      }
   }
}

unSelectButton.addEventListener("click", unSelect);


function kingMe() {

   if (blackKing = true) {
      cellCapture.classList.add("king");
      blackKing = false;
   }
   if (redKing = true) {
      cellCapture.classList.add("king");
      redKing = false;
   }

}


function kingsPrey() {

   kingVictim.innerHTML = "";
   kingVictim.classList.remove("selected");
   kingVictim.classList.remove("blackCell");
   kingVictim.classList.remove("redCell");
   kingVictim.classList.remove("king");
   kingVictim.classList.add("emptyCell");

}




function kingEater(numLoops){

   for (i = numLoops; i >= 1; i = i -1) {
      kingVictim = allTableCells[targetIndex -( (difference/(numLoops +1) )* (i) )];
      kingsPrey();
   }   

}



function clickedCell() {

   if( (cellCapture.classList.contains("selected")) || (this.classList.contains("emptyCell")) || (this.classList.contains("redCell")) ){
   }
   else {
      if(yourTurn){
         cellCapture.classList.remove("selected");
         this.classList.add("selected");
         cellCapture = this;
         selected = true;
      }
   }
}



function createNewCell() {

   if(   cellCapture.classList.contains("blackCell")   ){

      targetCell.classList.remove("emptyCell");
      var blackPiece = document.createElement("div");
      blackPiece.classList.add("black");
      targetCell.classList.add("blackCell");
      targetCell.appendChild(blackPiece);

      if(   cellCapture.classList.contains("king")   ){

         targetCell.classList.add("king");
         var kingsDiv = targetCell.querySelector("div");
         kingsDiv.classList.add("blackKing");
         targetCell.appendChild(kingsDiv);
      }
   }

   if(   cellCapture.classList.contains("redCell")   ){

      targetCell.classList.remove("emptyCell");
      var redPiece = document.createElement("div");
      redPiece.classList.add("red");
      targetCell.classList.add("redCell");
      targetCell.appendChild(redPiece);

      if(   cellCapture.classList.contains("king")   ){

         targetCell.classList.add("king");
         var kingsDiv = targetCell.querySelector("div");
         kingsDiv.classList.add("redKing");
         targetCell.appendChild(kingsDiv);
      }
   }

}






function clearCell() {

   cellCapture.innerHTML = "";
   cellCapture.classList.remove("selected");
   cellCapture.classList.remove("blackCell");
   cellCapture.classList.remove("redCell");
   cellCapture.classList.remove("king");
   cellCapture.classList.add("emptyCell");

}




function deleteEatenPiece() {
   
   eatenPiece.innerHTML = "";
   eatenPiece.classList.remove("selected");
   eatenPiece.classList.remove("blackCell");
   eatenPiece.classList.remove("redCell");
   eatenPiece.classList.remove("king");
   eatenPiece.classList.add("emptyCell");

}


function eatPiece() {

   if ( 
         cellCapture.classList.contains("blackCell")
         && ((difference == -14) || (difference == -18) )
      ){
      eatenPiece = allTableCells[targetIndex - (difference/2)];
      deleteEatenPiece();
      clearCell(); 
   }

   if ( 
         cellCapture.classList.contains("redCell")
         && ((difference == 14) || (difference == 18) )
      ){
      eatenPiece = allTableCells[targetIndex - (difference/2)];
      deleteEatenPiece();
      clearCell(); 
   }


}



function validTarget() {

   if( cellCapture.classList.contains("blackCell") ){

      if(  (difference == -7) || (difference == -9)  ){
         isTargetValid = true;
      }
      if(
         (  (difference == -14) || (difference == -18)  )
         && ( allTableCells[targetIndex - (difference/2)].classList.contains("redCell") )
        ){
         isTargetValid = true;
      }

      if( cellCapture.classList.contains("king") ){

         // --TIER1------------------------------------------
         if( (absDifference == 7) || (absDifference == 9) ){
            isTargetValid = true;
         }

         // --TIER2------------------------------------------
         if( 
              ( (absDifference == 14) || (absDifference == 18) 
              )
           && ( 
                allTableCells[targetIndex - (difference/2)].classList.contains("redCell")  
           ||   allTableCells[targetIndex - (difference/2)].classList.contains("emptyCell")
              ) 
           ){
            isTargetValid = true;
            kingEater(1);
         }

         // --TIER3------------------------------------------
         if( 
              ( (absDifference == 21) || (absDifference == 27) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/3)].classList.contains("redCell")  
                  || allTableCells[targetIndex - (difference/3)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/3)*2 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/3)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(2);
         }


         // --TIER4------------------------------------------
         if( 
              ( (absDifference == 28) || (absDifference == 36) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/4)].classList.contains("redCell")  
                  || allTableCells[targetIndex - (difference/4)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/4)*3 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/4)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/4)*2 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/4)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(3);
         }


         // --TIER5------------------------------------------
         if( 
              ( (absDifference == 35) || (absDifference == 45) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/5)].classList.contains("redCell")  
                  || allTableCells[targetIndex - (difference/5)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/5)*4 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/5)*4 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/5)*3 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/5)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/5)*2 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/5)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(4);
         }


         // --TIER6------------------------------------------
         if( 
              ( (absDifference == 42) || (absDifference == 54) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/6)].classList.contains("redCell")  
                  || allTableCells[targetIndex - (difference/6)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*5 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/6)*5 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*4 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/6)*4 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*3 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/6)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*2 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/6)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(5);
         }


         // --TIER7------------------------------------------
         if( 
              ( (absDifference == 49) || (absDifference == 63) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/7)].classList.contains("redCell")  
                  || allTableCells[targetIndex - (difference/7)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*6 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/7)*6 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*5 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/7)*5 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*4 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/7)*4 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*3 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/7)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*2 )].classList.contains("redCell")  
                  || allTableCells[targetIndex - ( (difference/7)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(6);
         }





      }
   }

//-----------------------RED STARTS BELOW------------------------------------------------






   if( cellCapture.classList.contains("redCell") ){

      if(  (difference == 7) || (difference == 9)  ){
         isTargetValid = true;
      }
      if(
         (  (difference == 14) || (difference == 18)  )
         && ( allTableCells[targetIndex - (difference/2)].classList.contains("blackCell") )
        ){
         isTargetValid = true;
      }

      if( cellCapture.classList.contains("king") ){

         // --TIER1------------------------------------------
         if( (absDifference == 7) || (absDifference == 9) ){
            isTargetValid = true;
         }

         // --TIER2------------------------------------------
         if( 
              ( (absDifference == 14) || (absDifference == 18) 
              )
           && ( 
                allTableCells[targetIndex - (difference/2)].classList.contains("blackCell")  
           ||   allTableCells[targetIndex - (difference/2)].classList.contains("emptyCell")
              ) 
           ){
            isTargetValid = true;
            kingEater(1);
         }

         // --TIER3------------------------------------------
         if( 
              ( (absDifference == 21) || (absDifference == 27) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/3)].classList.contains("blackCell")  
                  || allTableCells[targetIndex - (difference/3)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/3)*2 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/3)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(2);
         }


         // --TIER4------------------------------------------
         if( 
              ( (absDifference == 28) || (absDifference == 36) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/4)].classList.contains("blackCell")  
                  || allTableCells[targetIndex - (difference/4)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/4)*3 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/4)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/4)*2 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/4)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(3);
         }


         // --TIER5------------------------------------------
         if( 
              ( (absDifference == 35) || (absDifference == 45) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/5)].classList.contains("blackCell")  
                  || allTableCells[targetIndex - (difference/5)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/5)*4 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/5)*4 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/5)*3 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/5)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/5)*2 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/5)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(4);
         }


         // --TIER6------------------------------------------
         if( 
              ( (absDifference == 42) || (absDifference == 54) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/6)].classList.contains("blackCell")  
                  || allTableCells[targetIndex - (difference/6)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*5 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/6)*5 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*4 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/6)*4 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*3 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/6)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/6)*2 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/6)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(5);
         }


         // --TIER7------------------------------------------
         if( 
              ( (absDifference == 49) || (absDifference == 63) 
              )
           && ( 
                ( allTableCells[targetIndex - (difference/7)].classList.contains("blackCell")  
                  || allTableCells[targetIndex - (difference/7)].classList.contains("emptyCell")
                ) 
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*6 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/7)*6 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*5 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/7)*5 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*4 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/7)*4 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*3 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/7)*3 )].classList.contains("emptyCell")
                )
           &&
                (
                  allTableCells[targetIndex - ( (difference/7)*2 )].classList.contains("blackCell")  
                  || allTableCells[targetIndex - ( (difference/7)*2 )].classList.contains("emptyCell")
                )
              ) 
           ){
            isTargetValid = true;
            kingEater(6);
         }





      }
   }// -------CLOSES OUT RED ---------------------------------------------





   
}


function movePiece() {
   if( (yourTurn)  && (selected) && (this.classList.contains("emptyCell")) && (this.classList.contains("even"))  ) {

      targetCell = this;
      targetCell.classList.add("target");

      for ( i=0; i < allTableCells.length; i = i +1 ) {
         if( allTableCells[i].classList.contains("selected")  ){
            selectedIndex = i;
         }
         if(  allTableCells[i].classList.contains("target")    ){
         targetIndex = i;
         }
      }

      difference = targetIndex - selectedIndex;
      absDifference = Math.abs(difference);

      validTarget();

      if(isTargetValid){

         if( targetIndex < 8){
            blackKing = true;
            kingMe();
         }
         if( targetIndex > 55){
            redKing = true;
            kingMe();
         }

            createNewCell();
            eatPiece();
            clearCell();
            selected = false;
            targetCell.classList.remove("target");
            cellCapture = targetCell;
            isTargetValid = false;
            yourTurn = false;
            cpuTurn = true;
            setTimeout( function(){
               cpuMove();
            }, 300);

      }
      else{
         targetCell.classList.remove("target");
      }


   
   }//CLOSES OUT MAIN IF STATEMENT OF FUNCTION
}






function cpuKingEater(arrayRed, arrayRedTargets, countRed) {

      for(i =0; i < allTableCells.length; i++){

         if(i == 63){

            if ( (arrayRed.length === "undefined") || (arrayRed.length == 0) ){
                   cpuEater(arrayRed, arrayRedTargets, countRed);
                   break;
            }
            else{
                    break;
            }
         }
         
         else{

            if (    (i < 47)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i + 14].classList.contains("emptyCell") )
                 && ( allTableCells[i + 14].classList.contains("even") )
                 && ( allTableCells[i + 7].classList.contains("blackCell") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i + 14;
                    countRed = countRed + 1;
            }
            if (    (i > 16)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i - 14].classList.contains("emptyCell") )
                 && ( allTableCells[i - 14].classList.contains("even") )
                 && ( allTableCells[i - 7].classList.contains("blackCell") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i - 14;
                    countRed = countRed + 1;
            }
            if (    (i < 45)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i + 18].classList.contains("emptyCell") )
                 && ( allTableCells[i + 18].classList.contains("even") )
                 && ( allTableCells[i + 9].classList.contains("blackCell") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i + 18;
                    countRed = countRed + 1;
            }
            if (    (i > 18)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i - 18].classList.contains("emptyCell") )
                 && ( allTableCells[i - 18].classList.contains("even") )
                 && ( allTableCells[i - 9].classList.contains("blackCell") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i - 18;
                    countRed = countRed + 1;
            }
            if (    (i < 40) && (i != 33) && (i != 17) && (i != 1)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i +21].classList.contains("emptyCell") )
                 && ( allTableCells[i +21].classList.contains("even") )
                 && ( 
                        ( allTableCells[i + 7].classList.contains("blackCell") ) 
                     || ( allTableCells[i + 14].classList.contains("blackCell") ) 
                    )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i + 21;
                    countRed = countRed + 1;
            }
            if (    (i > 23) && (i != 30) && (i != 46) && (i != 62)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i -21].classList.contains("emptyCell") )
                 && ( allTableCells[i -21].classList.contains("even") )
                 && ( 
                        ( allTableCells[i - 7].classList.contains("blackCell") ) 
                     || ( allTableCells[i - 14].classList.contains("blackCell") ) 
                    )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i - 21;
                    countRed = countRed + 1;
            }

         }



      }

}





function cpuEater(arrayRed, arrayRedTargets, countRed) {

      for(i =0; i < allTableCells.length; i++){

         if (i > 46) {
            if ( (arrayRed.length === "undefined") || (arrayRed.length == 0) ){
                     cpuSelector(arrayRed, arrayRedTargets, countRed);
                     break;
                 }
            else{
                    break;
                }
         }
         else{


            if (    (i < 47)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i + 14].classList.contains("emptyCell") )
                 && ( allTableCells[i + 14].classList.contains("even") )
                 && ( allTableCells[i + 7].classList.contains("blackCell") )
               ){
                  arrayRed[countRed] = i;
                  arrayRedTargets[countRed] = i + 14;
                  countRed = countRed + 1;
               }

            if (    (i < 45)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i + 18].classList.contains("emptyCell") )
                 && ( allTableCells[i + 18].classList.contains("even") )
                 && ( allTableCells[i + 9].classList.contains("blackCell") )
               ){
                  arrayRed[countRed] = i;
                  arrayRedTargets[countRed] = i + 18;
                  countRed = countRed + 1;
               }
         }
      }

}





function cpuSelector(arrayRed, arrayRedTargets, countRed) {

      for(i =0; i < allTableCells.length; i++){


            if (    (i > 7)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i - 7].classList.contains("emptyCell") )
                 && ( allTableCells[i - 7].classList.contains("even") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i - 7;
                    countRed = countRed + 1;
            }

            if (    (i < 56)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i + 7].classList.contains("emptyCell") )
                 && ( allTableCells[i + 7].classList.contains("even") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i + 7;
                    countRed = countRed + 1;
            }

            if (    (i > 9)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i - 9].classList.contains("emptyCell") )
                 && ( allTableCells[i - 9].classList.contains("even") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i - 9;
                    countRed = countRed + 1;
            }

            if (    (i < 54)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i].classList.contains("king") )
                 && ( allTableCells[i + 9].classList.contains("emptyCell") )
                 && ( allTableCells[i + 9].classList.contains("even") )
               ){
                    arrayRed[countRed] = i;
                    arrayRedTargets[countRed] = i + 9;
                    countRed = countRed + 1;
            }

            if ( (i < 56)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i + 7].classList.contains("emptyCell") )
                 && ( allTableCells[i + 7].classList.contains("even") )
               ){
                  arrayRed[countRed] = i;
                  arrayRedTargets[countRed] = i + 7;
                  countRed = countRed + 1;
               }

            if ( (i < 54)
                 && ( allTableCells[i].classList.contains("redCell") )
                 && ( allTableCells[i + 9].classList.contains("emptyCell") )
                 && ( allTableCells[i + 9].classList.contains("even") )
               ){
                  arrayRed[countRed] = i;
                  arrayRedTargets[countRed] = i + 9;
                  countRed = countRed + 1;
               }
         
         
      }


}




function cpuMove(){
   if( (cpuTurn) ) {

      setTimeout(function() {

      var arrayRed = [];
      var arrayRedTargets =[];
      var countRed = 0;
      var picker = 0;
      var randomNum = 0;
      var arraySize;

      cpuKingEater(arrayRed, arrayRedTargets, countRed);

      arraySize = arrayRed.length;
      picker = Math.ceil( (arrayRed.length-1) /1.3 );
      randomNum = Math.floor(Math.random() * arraySize) + 0 ;

      if((countCpuMoves % 2) > 0){
         cellCapture = allTableCells[arrayRed[picker]];
         cellCapture.classList.add("selected");

         targetCell = allTableCells[arrayRedTargets[picker]];
         targetCell.classList.add("target");
      }
      else {
         cellCapture = allTableCells[arrayRed[randomNum]];
         cellCapture.classList.add("selected");

         targetCell = allTableCells[arrayRedTargets[randomNum]];
         targetCell.classList.add("target");
      }
      
      for ( i=0; i < allTableCells.length; i = i +1 ) {
         if( allTableCells[i].classList.contains("selected")  ){
            selectedIndex = i;
         }
         if(  allTableCells[i].classList.contains("target")    ){
         targetIndex = i;
         }
      }
      difference = targetIndex - selectedIndex;
      absDifference = Math.abs(difference);

      validTarget();
      if( targetIndex > 55){
         redKing = true;
         kingMe();
      }



      setTimeout(function() {


      createNewCell();
      eatPiece();
      clearCell();
      selected = false;
      targetCell.classList.remove("target");

      isTargetValid = false;

      cpuTurn = false;
      yourTurn = true;
      countCpuMoves = countCpuMoves + 1;

      }, 800);

      }, 10);

   }

}







function startTable(){
   for ( i = 0; i < allTableCells.length; i = i +1) {

      allTableCells[i].addEventListener("click", clickedCell);
      allTableCells[i].addEventListener("click", movePiece);

      
      if ( allTableCells[i].classList.contains("odd") ){
            allTableCells[i].classList.add("emptyCell");
         }

      if ( (i >= 0) && (i <= 23) && (allTableCells[i].classList.contains("even")) ) {

         var redPiece = document.createElement("div");
         redPiece.classList.add("red");

         allTableCells[i].appendChild(redPiece);
         allTableCells[i].classList.add("redCell");
       
      }

      if ( (i >= 24) && (i <= 39) ) {
         allTableCells[i].classList.add("emptyCell");
      }

      if ( (i >= 40) && (i <= 63) && (allTableCells[i].classList.contains("even")) ) {
         var blackPiece = document.createElement("div");
         blackPiece.classList.add("black");

         allTableCells[i].appendChild(blackPiece);
         allTableCells[i].classList.add("blackCell");
      }
   }
}




function clearTable(){
   for ( i = 0; i < allTableCells.length; i = i +1) {
      allTableCells[i].innerHTML = "";
      allTableCells[i].classList.remove("emptyCell");
      allTableCells[i].classList.remove("blackCell");
      allTableCells[i].classList.remove("redCell");
      allTableCells[i].classList.remove("king");
      allTableCells[i].classList.remove("selected");
      allTableCells[i].classList.remove("target");
   }
}




startTable();