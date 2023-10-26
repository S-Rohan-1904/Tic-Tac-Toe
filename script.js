const cells=document.querySelectorAll('.cell')
const statusText = document.querySelector('#statusText')
const restartBtn = document.querySelector('#restartBtn')

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let input = ['','','','','','','','','']

let currentPlayer='X'

let running=false

initialize()

function initialize() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame)
    statusText.textContent=`${currentPlayer}'s turn`
    running=true
}

function cellClicked() {
    const index=this.getAttribute('index')
    if(input[index] != '' || !running) {
        return;
    }
    update(this, index)
    checkWinner()
}

function update(cell,index) {
    input[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner() {
    let won = false;
    for(let i=0; i< winConditions.length; i++) {
        const cellA=input[winConditions[i][0]]
        const cellB=input[winConditions[i][1]]
        const cellC=input[winConditions[i][2]]

        if(cellA=='' || cellB=='' || cellC=='') {
            continue
        }
        if(cellA==cellB && cellB==cellC) {
            won = true
            break
        }
    }

    if(won) {
        
        statusText.textContent=`${currentPlayer} wins!`
        running=false
    }
    else if(!input.includes("")) {
        statusText.textContent='Draw!'
        running=false
    }
    else {
        changePlayer()
    }
}

function restartGame() {
    currentPlayer = "X"
    input = ['','','','','','','','','']
    statusText.textContent=`${currentPlayer}'s turn`
    cells.forEach(cell=> cell.textContent='')
    running=true
}