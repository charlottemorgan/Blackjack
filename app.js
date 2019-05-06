//make array for card deck
let dealerTurn = true
let playing = true
let samDrawing = true
let dealerDrawing = true


let cardDeck

const dealerHand = []
const samHand = []

const pickCard = () => {
  // generate random card index
  const randomIndex = Math.floor(Math.random() * cardDeck.length)
  // place card at that index in player array
  const chosenCard = cardDeck[randomIndex]
  dealerTurn ? dealerHand.push(chosenCard) : samHand.push(chosenCard)
  console.log(`pushing into ${dealerTurn ? 'dealerHand' : 'samHand'}`)
  //delete card at that index
  cardDeck.splice(randomIndex, 1)

  console.log(`${dealerTurn ? 'Dealer' : 'Sam'} draws ${chosenCard}`)
  console.log('sams hand after drawing', samHand)
  console.log('dealers hand after drawing', dealerHand)
  dealerTurn = !dealerTurn
}

const checkScore = (playerHand) => {
  return playerHand.reduce((totalScore, currentCard) => {
    return totalScore += currentCard
  }, 0)
}

const checkForWin = () => {
  const samScore = checkScore(samHand)
  console.log(samScore)
  const dealerScore = checkScore(dealerHand)
  console.log(dealerScore)

  if(samScore === 21) {
    playing = false
    console.log('Sam wins')
  } else if (dealerScore === 21) {
    playing = false
    console.log('Dealer wins')
  } else if (samScore > 21) {
    playing = false
    console.log('Sam loses')
  } else if (dealerScore > 21) {
    playing = false
    console.log('Dealer loses')
  }
  if (!dealerDrawing && !samDrawing) {
    playing = false
    if (samScore < dealerScore) {
      console.log('dealers score is higher, dealer wins')
    } else {
      console.log('sams score is higher or even, she wins')
    }
  }
}

const samsMove = () => {
  console.log('sam is going')
  const samScore = checkScore(samHand)
  if(samScore < 17) {
    pickCard()
    checkForWin()
  } else {
    samDrawing = false
    console.log('sams score is over 17, wont draw')
  }
}

const dealersMove = () => {
  console.log('dealer is going')
  const samScore = checkScore(samHand)
  const dealerScore = checkScore(dealerHand)
  if(dealerScore < samScore) {
    pickCard()
    checkForWin()
  } else {
    dealerDrawing = false
    console.log('dealers score is higher, wont draw')
  }
}

const startGame = () => {
  cardDeck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11]
  pickCard()
  pickCard()
  pickCard()
  pickCard()
  checkForWin()
}

const playGame = () => {
  while(playing) {
    dealerTurn = false
    samsMove()
    dealersMove()
  }
}


startGame()

playGame()
