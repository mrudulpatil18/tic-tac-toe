let Player = (name, marker) => {
    return {name, marker};
}

const gameBoard = (()=>{
    let pTurn;
    let p1, p2;
    let winner = Player(null, null);
    const gameboard = [[null, null, null],[null, null, null],[null, null, null]];
    let cellList = document.querySelectorAll('.cell')

    
    const setup = () => {
        p1 = Player("Player 1", 'O');
        p2 = Player("Player 2", 'X');
        winner = Player(null, null);
        pTurn = p1;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                gameboard[i][j] = null;
            }
        }
        for(let i = 0; i < 9; i++){
            let x = Math.floor(i/3);
            let y = i%3;
            cellList[i].classList.remove('solved');
            cellList[i].addEventListener('click', ()=>{move(pTurn, x, y)})
        }
        displayBoard()
    }

    const displayBoard = ()=>{
        let turn = document.querySelector('p');
        let k = 0;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(gameboard[i][j]){
                cellList[k].textContent = gameboard[i][j];
                }
                else{
                    cellList[k].textContent = '';
                }
                k++;
            }
        }
        turn.textContent = `${pTurn.name}'s turn`
    }

    const nextTurn = ()=>{
        checkWin();
        
        if(pTurn == p1){
            pTurn = p2;
        }
        else{
            pTurn = p1;
        }
        if(winner == null){
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(gameboard[i][j] == null){
                        continue;
                    }
                    else{
                        console.log("WTF ")
                        return;
                    }
                }
            }
        }
    }

    const move = (Player, posX, posY) => {
        if(winner == p1 || winner == p2){
            console.log(winner.name)
            let turn = document.querySelector('p');
            turn.textContent = `${winner.name} Wins !!`
        }
        else if(gameboard[posX][posY] == null){
            gameboard[posX][posY] = Player.marker;
            nextTurn();
            displayBoard();
        }

        
        
    }

    const checkWin = () =>{
        for(let i = 0; i < 3; i++){
            if(gameboard[i][0] == gameboard[i][1] && gameboard[i][0] == gameboard[i][2] && gameboard[i][0] != null){
                winner.marker = gameboard[i][0];
                cellList[3*i].classList.add('solved');
                cellList[3*i+1].classList.add('solved');
                cellList[3*i+2].classList.add('solved');
            }
        }
        for(let i = 0; i < 3; i++){
            if(gameboard[0][i] == gameboard[1][i] && gameboard[0][i] == gameboard[2][i] && gameboard[0][i] != null){
                winner.marker = gameboard[0][i];
                cellList[i].classList.add('solved');
                cellList[3+i].classList.add('solved');
                cellList[3*2+i].classList.add('solved');
            }
        }
        if(gameboard[0][0] == gameboard[1][1] && gameboard[0][0] == gameboard[2][2] && gameboard[1][1] != null){
            winner.marker = gameboard[0][0];
            cellList[0].classList.add('solved');
            cellList[4].classList.add('solved');
            cellList[8].classList.add('solved');
        }
        else if(gameboard[0][2] == gameboard[1][1] && gameboard[2][0] == gameboard[1][1] && gameboard[1][1] != null){
            winner.marker = gameboard[1][1];
            cellList[2].classList.add('solved');
            cellList[4].classList.add('solved');
            cellList[6].classList.add('solved');
        }

        if(winner.marker == p1.marker){
            winner = p1;
        }
        else if(winner.marker == p2.marker){
            winner = p2;
        }

        if(pTurn == null){
            winner = null
        }

        
    }

    return {displayBoard, move, setup};

})();

let start = document.querySelector('#start');
start.addEventListener('click', ()=>{
    gameBoard.setup();
    if(start.textContent == 'Reset'){
        start.textContent = 'Reset';
    }else{
        start.textContent = 'Reset';
    }
})

//let name1 = prompt("Enter Player One Name: ")
//let name2 = prompt("Enter Player Two Name: ")
gameBoard.displayBoard();
