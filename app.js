let dealerTurn = true
let playing = true
let samDrawing = true
let dealerDrawing = true


let cardDeck

const dealerHand = []
const samHand = []

const pickCard = () => {
  // generate random card index
  const randomIndex = Math.floor(Math.random() * cardDeck.length);
  // place card at that index in player array
  (dealerTurn ? dealerHand : samHand).push(cardDeck[randomIndex])
  //delete card at that index
  cardDeck.splice(randomIndex, 1)
  dealerTurn = !dealerTurn
}

const checkScore = (playerHand) => playerHand.reduce((totalScore, currentCard) => totalScore += currentCard , 0)


const checkForWin = () => {
  const samScore = checkScore(samHand)
  const dealerScore = checkScore(dealerHand)

  if(samScore === 21) {
    playing = false
    console.log('Sam has blackjack')
    return
  }
  if (dealerScore === 21) {
    playing = false
    console.log('Dealer has blackjack')
    return
  }
  if (samScore > 21) {
    playing = false
    console.log('Sam goes bust')
    return
  }
  if (dealerScore > 21) {
    playing = false
    console.log('Dealer goes bust')
  }
  if (!dealerDrawing && !samDrawing) {
    playing = false
    if (samScore < dealerScore) {
      console.log('dealers score is higher, dealer wins')
      return
    }
    console.log('sams score is higher or even, she wins')
    return

  }
}

const samsMove = () => {
  if(checkScore(samHand) < 17) {
    pickCard()
    checkForWin()
    return
  }
  samDrawing = false
  console.log('sams score is over 17, wont draw')
}

const dealersMove = () => {
  if(checkScore(dealerHand) < checkScore(samHand)) {
    pickCard()
    checkForWin()
    return
  }
  dealerDrawing = false
  console.log('dealers score is higher, wont draw')

}

const generateDeck = () => {
  cardDeck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11]
}

const startGame = () => {
  console.log('starting the game')
  generateDeck()
  pickCard()
  pickCard()
  pickCard()
  pickCard()
  checkForWin()
}

const playGame = () => {
  while(playing) {
    dealerTurn = false
    if (samDrawing) samsMove()
    if (dealerDrawing) dealersMove()
  }
}


startGame()

playGame()
