const players = ['x', 'o']
var currentPlayer
var labelCurrentPlayer

main()

function main() {
  currentPlayer = players[0]
  labelCurrentPlayer = document.getElementById('player')
  replaceLabelPlayer(currentPlayer)
}

function selectPosition(id) {
  markPosition(id, currentPlayer)
  verifyWinner()
  currentPlayer = changePlayer(currentPlayer)
  replaceLabelPlayer(currentPlayer)
}

function markPosition(id, currentPlayer) {
  let position = document.getElementById(id)
  lockPosition(position)
  position.innerHTML = currentPlayer
}

function lockPosition(position) {
  position.removeAttribute('onClick')
  position.classList.add('disable-block')
}

function changePlayer(currentPlayer) {
  let indexPlayer = players.indexOf(currentPlayer)
  if(indexPlayer == players.length-1) {
    return currentPlayer = players[0]
  } else {
    return currentPlayer = players[indexPlayer + 1]
  }
}

function replaceLabelPlayer(currentPlayer) {
  labelCurrentPlayer.innerHTML = currentPlayer
}

function verifyWinner(){
  /*Rules Winner:
    [
      [1,2,3] = [0,1,2],
      [1,4,7] = [0,3,6],
      [1,5,9] = [0,4,8],
      [2,5,8] = [1,4,7],
      [3,6,9] = [2,5,8],
      [3,5,7] = [2,4,6],
      [4,5,6] = [3,4,5],
      [7,8,9] = [6,7,8]
    ]
  */
  let sequenceWinner
  let blocks = getAllValuesBlocks()
  //Verify Horizontal
  if((blocks[0] == blocks[1] && blocks[1] == blocks[2]) && blocks[0] == currentPlayer) sequenceWinner = [0,1,2]
  if((blocks[3] == blocks[4] && blocks[4] == blocks[5]) && blocks[3] == currentPlayer) sequenceWinner = [3,4,5]
  if((blocks[6] == blocks[7] && blocks[7] == blocks[8]) && blocks[6] == currentPlayer) sequenceWinner = [6,7,8]
  //Verify Vertical
  if((blocks[0] == blocks[3] && blocks[3] == blocks[6]) && blocks[0] == currentPlayer) sequenceWinner = [0,3,6]
  if((blocks[1] == blocks[4] && blocks[4] == blocks[7]) && blocks[1] == currentPlayer) sequenceWinner = [1,4,7]
  if((blocks[2] == blocks[5] && blocks[5] == blocks[8]) && blocks[2] == currentPlayer) sequenceWinner = [2,5,8]
  //Verify Diagonal
  if((blocks[0] == blocks[4] && blocks[4] == blocks[8]) && blocks[0] == currentPlayer) sequenceWinner = [0,4,8]
  if((blocks[2] == blocks[4] && blocks[4] == blocks[6]) && blocks[2] == currentPlayer) sequenceWinner = [2,4,6]
  
  if(sequenceWinner != undefined) {
    markPositionWinner(sequenceWinner)
  }
}

function getAllValuesBlocks() {
  let blocks = document.getElementsByClassName('block')
  let valuesBlocks = []
  for (const key in blocks) {
    valuesBlocks.push(blocks[key].innerHTML)
  }
  return valuesBlocks
}

function markPositionWinner(sequence) {
  sequence.forEach(el => {
    let block = document.getElementById(el)
    block.removeAttribute('onclick')
    block.classList.add('winner-block')
    console.log(el)
  })
  disableBoard()
  
  // for (const key in sequence) {
  //   let block = document.getElementById(key)
  //   block.removeAttribute('onclick')
  //   block.classList.add('winner-block')
  //   console.log(key)
  // }
}

function disableBoard() {
  let blocks = document.getElementsByClassName('block')
  for (const key in blocks) {
    blocks[key].removeAttribute('onclick')
  }
}

function resetGame() {
  main()
  resetBoard()
}

function resetBoard() {
  let blocks = document.getElementsByClassName('block')
  for (const key in blocks) {
    blocks[key].innerHTML = ''
    blocks[key].setAttribute('class', 'block')
    blocks[key].setAttribute('onClick', 'selectPosition(this.id)')
  }
}
