const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector('.game-info');
const gamebtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function

function initGame(){
    currentPlayer = 'X';
    gameGrid = ['','','','','','','','',''];
    //To empty boxes in UI
    boxes.forEach((box,index) => {
        box.innerText = '';
        boxes[index].style.pointerEvents = 'all';
        //Color green ko inactive karna hai after a new game
        box.classList = `box box${index +1}`;
    });
    gamebtn.classList.remove('active');
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer ==='X') {
        currentPlayer = '0';
    }
    else {
        currentPlayer = 'X'
    }
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    gamebtn.classList.add('active');
    let answer = '';

    winningPosition.forEach((position) => {
        
        if((gameGrid[position[0]] !=='' || gameGrid[position[2]] !=='')
        &&( gameGrid[position[0]] === gameGrid[position[1]]) && ( gameGrid[position[1]] === gameGrid[position[2]])){

            if(gameGrid[position[0]] === 'X')
            answer = 'X';
            else 
            answer = '0';
            //disable pointer
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            })
            //we have X/O is a winner
            boxes [position[0]].classList.add('win');
            boxes [position[1]].classList.add('win');
            boxes [position[2]].classList.add('win');
        }
    });
    // we have a winner
    if(answer !==''){
        gameinfo.innerText = `Winner Player - ${answer}`;
        gamebtn.classList.add('active');
        return;
    }

    //when there is no winner Game Tie!
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !=='')
        fillCount++;
    });
    //
    if (fillCount ===9){
        gameinfo.innerText = 'Game Tie!';
        gamebtn.classList.add('active');
    }

}

function handleClick(index) {
    if(gameGrid[index] === ''){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        swapTurn();
        //check if someone wins
        checkGameOver();
    }
}

boxes.forEach((box , index) => {
    box.addEventListener('click',() => {
        handleClick(index);
    })
})

gamebtn.addEventListener('click', initGame);