const players = ['x', 'o']
var currentPlayer = players[0]
var labelCurrentPlayer = document.getElementById('player')

replaceLabelPlayer(currentPlayer)

function selectPosition(id) {
  markPosition(id, currentPlayer)
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
