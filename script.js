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
        p1 = Player('Player 1', 'O');
        p2 = Player('Player 2', 'X');
        pTurn = p1;
        console.log(cellList);
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                gameboard[i][j] = null;
            }
        }
        for(let i = 0; i < 9; i++){
            let x = Math.floor(i/3);
            let y = i%3;
            cellList[i].addEventListener('click', ()=>{move(pTurn, x, y)})
        }
    }

    const displayBoard = ()=>{
        let k = 0;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(gameboard[i][j]){
                cellList[k].textContent = gameboard[i][j];
                }
                k++;
            }
        }
    }

    const nextTurn = ()=>{
        checkWin();
        if(pTurn == p1){
            pTurn = p2;
        }
        else{
            pTurn = p1;
        }
    }

    const move = (Player, posX, posY) => {
        if(winner == p1 || winner == p2){
            console.log(winner)
        }
        else if(gameboard[posX][posY] == null){
            gameboard[posX][posY] = Player.marker;
            nextTurn();
            displayBoard();
        }
        
    }

    const checkWin = () =>{
        //rows
        for(let i = 0; i < 3; i++){
            if(gameboard[i][0] == gameboard[i][1] && gameboard[i][0] == gameboard[i][2] && gameboard[i][0] != null){
                winner.marker = gameboard[i][0];
            }
        }
        for(let i = 0; i < 3; i++){
            if(gameboard[0][i] == gameboard[1][i] && gameboard[0][i] == gameboard[2][i] && gameboard[0][i] != null){
                winner.marker = gameboard[0][i];
            }
        }
        if(gameboard[0][0] == gameboard[1][1] && gameboard[0][0] == gameboard[2][2] && gameboard[1][1] != null){
            winner.marker = gameboard[0][0];
        }
        else if(gameboard[0][2] == gameboard[1][1] && gameboard[2][0] == gameboard[1][1] && gameboard[1][1] != null){
            winner.marker = gameboard[1][1];
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





gameBoard.setup();

gameBoard.displayBoard();

