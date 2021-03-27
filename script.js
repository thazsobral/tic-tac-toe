const players = ['x', 'o']
var scores, currentPlayer, labelCurrentPlayer, boxes, information

main ()

function main() {
  currentPlayer = players[0]
  labelCurrentPlayer = document.getElementById('player')
  boxes = document.getElementsByClassName('box')

  for (var key = 0; key < boxes.length; key++) {
    boxes[key].innerHTML = ''
    boxes[key].setAttribute('class', 'box box-active')
    boxes[key].setAttribute('onClick', 'selectionPosition(this.id)')
  }

  if ( scores == undefined) {
    createScore()
  }
}

function reset() {
  main()
}

function createScore() {
  information = document.getElementById('information')
  scores = []
  let node

  for (const key in players) {
    node = document.createElement('p')

    node.setAttribute('id', `player-${players[key]}`)
    node.innerHTML = `${players[key].toUpperCase()}: <span id="score-${players[key]}">0</span>`

    scores[key] = 0

    information.appendChild(node)
  }
}

function selectionPosition(id) {
  boxes[id].innerHTML = currentPlayer
  var victoryValues = seekVictoryValues()
  if(victoryValues == false) {
    boxes[id].setAttribute('class', 'box block-box')
    boxes[id].removeAttribute('onClick')
    changePlayer()
  } else {
    scores[players.indexOf(currentPlayer)] += 1
    document.getElementById(`score-${currentPlayer}`).innerHTML = scores[players.indexOf(currentPlayer)]
    victoryValues.forEach(el => {
      boxes[el].setAttribute('class', 'box winner-box')
    })
    for(var key = 0; key < boxes.length; key++) {
      boxes[key].removeAttribute('onClick')
    }
  }
}

function changePlayer() {
  let indexPlayer = players.indexOf(currentPlayer)
  if(indexPlayer == players.length-1) {
    currentPlayer = players[0]
  } else {
    currentPlayer = players[indexPlayer + 1]
  }
  labelCurrentPlayer.innerHTML = currentPlayer
}

function seekVictoryValues() {
  /*Rules Victory:
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
  let valuesBoxes = getValuesBoxes(boxes)
  let sequenceVictory

  //Verify Horizontal
  if((valuesBoxes[0] == valuesBoxes[1] && valuesBoxes[1] == valuesBoxes[2]) && valuesBoxes[0] == currentPlayer) sequenceVictory = [0,1,2]
  if((valuesBoxes[3] == valuesBoxes[4] && valuesBoxes[4] == valuesBoxes[5]) && valuesBoxes[3] == currentPlayer) sequenceVictory = [3,4,5]
  if((valuesBoxes[6] == valuesBoxes[7] && valuesBoxes[7] == valuesBoxes[8]) && valuesBoxes[6] == currentPlayer) sequenceVictory = [6,7,8]
  //Verify Vertical
  if((valuesBoxes[0] == valuesBoxes[3] && valuesBoxes[3] == valuesBoxes[6]) && valuesBoxes[0] == currentPlayer) sequenceVictory = [0,3,6]
  if((valuesBoxes[1] == valuesBoxes[4] && valuesBoxes[4] == valuesBoxes[7]) && valuesBoxes[1] == currentPlayer) sequenceVictory = [1,4,7]
  if((valuesBoxes[2] == valuesBoxes[5] && valuesBoxes[5] == valuesBoxes[8]) && valuesBoxes[2] == currentPlayer) sequenceVictory = [2,5,8]
  //Verify Diagonal
  if((valuesBoxes[0] == valuesBoxes[4] && valuesBoxes[4] == valuesBoxes[8]) && valuesBoxes[0] == currentPlayer) sequenceVictory = [0,4,8]
  if((valuesBoxes[2] == valuesBoxes[4] && valuesBoxes[4] == valuesBoxes[6]) && valuesBoxes[2] == currentPlayer) sequenceVictory = [2,4,6]
  
  if(sequenceVictory == undefined) {
    return false
  } else {
    return sequenceVictory
  }
}

function getValuesBoxes(boxes) {
  let valuesBoxes = []
  for (var key = 0; key < boxes.length; key++)   {
    valuesBoxes.push(boxes[key].innerHTML)
  }
  return valuesBoxes
}
