const cells=document.querySelectorAll('.cell')
const restartBtn = document.querySelector('#restartBtn')
const player1Label = document.querySelector('#player1Label')
const player2Label = document.querySelector('#player2Label')
const drawLabel = document.querySelector('#drawLabel')
const player1Score = document.querySelector('#player1Score')
const player2Score = document.querySelector('#player2Score')
const drawScore = document.querySelector('#draw')

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
let player1=0
let player2=0
let draw=0

let currentPlayer='X'

let running=false

initialize()
function opacity(currentPlayer) {
    if (currentPlayer=='X') {
        player1Score.style.opacity='1'
        player1Label.style.opacity='1'
        player2Score.style.opacity='0.5'
        player2Label.style.opacity='0.5'
    } else {
        player1Score.style.opacity='0.5'
        player1Label.style.opacity='0.5'
        player2Score.style.opacity='1'
        player2Label.style.opacity='1'
    }
}
function initialize() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame)
    opacity(currentPlayer)
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
    opacity(currentPlayer)
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
        if (currentPlayer == 'X') {
            player1+=1
            player1Score.textContent=`${player1}`
        } else {
            player2+=1
            player2Score.textContent=`${player2}`
        }
        running=false
    }
    else if(!input.includes("")) {
        draw+=1
        drawScore.textContent=`${draw}`
        running=false
    }
    else {
        changePlayer()
    }

}

function restartGame() {
    currentPlayer = "X"
    input = ['','','','','','','','','']
    opacity(currentPlayer)
    cells.forEach(cell=> cell.textContent='')
    running=true
}