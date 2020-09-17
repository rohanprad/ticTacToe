// HTML Elements

const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//game constants
const xSymbol = '×';
const oSymbol = '○';

//game variables
let gameIsLive = true;
let xIsNext = true;
let winner= null;

//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if(winner === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(winner)} has won!`;   
    }else{
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`;
    }
}


const checkGameStatus = () =>{
    const topLeft = cellDivs[0].classList[2];
    const topMid = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const midLeft = cellDivs[3].classList[2];
    const midMid = cellDivs[4].classList[2];
    const midRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMid = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    //check winner
    if(topLeft && topLeft === topMid && topLeft == topRight){
       handleWin(topLeft);
       cellDivs[0].classList.add('won'); 
       cellDivs[1].classList.add('won');
       cellDivs[2].classList.add('won'); 
    }else if(midLeft && midLeft === midMid && midLeft === midRight){
        handleWin(midLeft);
        cellDivs[3].classList.add('won'); 
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won'); 
    }else if(bottomLeft && bottomLeft === bottomMid && bottomLeft === bottomRight){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won'); 
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won'); 
    }else if(topLeft && topLeft === midLeft && topLeft === bottomLeft){
        handleWin(topLeft);
        cellDivs[0].classList.add('won'); 
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won'); 
    }else if(topMid && topMid === midMid && topMid === bottomMid){
        handleWin(topMid);
        cellDivs[1].classList.add('won'); 
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won'); 
    }else if(topRight && topRight === midRight && topRight === bottomRight){
        handleWin(topRight);
        cellDivs[2].classList.add('won'); 
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won'); 
    }else if(topRight && topRight === midMid && topRight === bottomLeft){
        handleWin(topRight);
        cellDivs[2].classList.add('won'); 
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won'); 
    }else if(topLeft && topLeft === midMid && topLeft ===bottomRight){
        handleWin(topLeft);
        cellDivs[0].classList.add('won'); 
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won'); 
    }else if(topLeft && topMid && topRight && midLeft && midMid && midRight && bottomLeft && bottomMid && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = "It's a tie!";
    }else{
        xIsNext = !xIsNext;
        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }else{
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }

};

// event handlers

const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;
    gameIsLive = true;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};

const handleCellClick = (e) =>{
    const classList = e.target.classList;

    if(!gameIsLive){
        return;
    }
    if(classList[2] === 'x' || classList[2] ==='o'){
        return;
    }

    if(xIsNext){
        classList.add('x');
        checkGameStatus();

    }else{
        classList.add('o');
        checkGameStatus();
    }
};


// event listeners

resetDiv.addEventListener('click', handleReset )

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick)
}