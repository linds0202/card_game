//Get a fresh deck of cards
let deckId = ''

//set scores to 0
let score1 = 0
let score2 = 0

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  

document.querySelector('button').addEventListener('click', draw2)
document.getElementById('battle').addEventListener('click', getBattleCard)
document.getElementById('clear-it').addEventListener('click', clearIt)

function draw2(){

  //draw 2 cards from that deck
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.getElementById('player1').src = data.cards[0].image
        document.getElementById('player2').src = data.cards[1].image

        //get cards values
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        
        //check for winner
        if(player1Val > player2Val) {
          document.querySelector('h3').innerText = 'Player1 wins!'
          score1 += 2
          document.getElementById('scoreP1').innerText = score1
        } else if (player1Val < player2Val) {
          document.querySelector('h3').innerText = 'Player2 wins!'
          score2 += 2
          document.getElementById('scoreP2').innerText = score2
        } else {
          document.querySelector('h3').innerText = 'War!'

          //unhide war zones
          document.getElementById('war1').classList.remove('hidden')
          document.getElementById('war2').classList.remove('hidden')

          //get 3 cards for each player
          get3(1)
          get3(2)
              
          //uncover battle button
          document.getElementById('battle').classList.remove('hidden')
          document.querySelector('button').classList.add('hidden')

        }
      })
      .catch(err => {
          console.log(`error ${err}`)
          
          document.querySelector('h3').classList.add('hidden')
          document.querySelector('h5').classList.remove('hidden')

          if(score1 > score2) {
            document.querySelector('h5').innerText = 'Player 1 is the Winner!'
          } else if (score1 < score2) {
            document.querySelector('h5').innerText = 'Player 2 is the Winner!'
          } else {
            document.querySelector('h5').innerText = 'Tie!'
          }
          
      });
}

function convertToNum(val) {
  if (val === 'JACK') {
    return 11
  } else if (val === 'QUEEN') {
    return 12
  } else if (val === 'KING') {
    return 13
  } else if (val === "ACE") {
    return 14
  } else {
    return Number(val)
  }
}

function get3(num) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.getElementById(`p-${num}-1`).src = data.cards[0].image
        document.getElementById(`p-${num}-2`).src = data.cards[1].image
        document.getElementById(`p-${num}-3`).src = data.cards[2].image
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getBattleCard() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        document.getElementById(`battle-card1`).src = data.cards[0].image
        document.getElementById(`battle-card2`).src = data.cards[1].image

        //convert to numeric value
        let battleCard1 = convertToNum(data.cards[0].value)
        let battleCard2 = convertToNum(data.cards[1].value)

        // find winner
        if(battleCard1 > battleCard2) {
          document.querySelector('h3').innerText = 'Player1 wins!'
          score1 += 10
          document.getElementById('scoreP1').innerText = score1
        } else if (battleCard1 < battleCard2) {
          document.querySelector('h3').innerText = 'Player2 wins!'
          score2 += 10
          document.getElementById('scoreP2').innerText = score2
        }

        //rehide battle button
        document.getElementById('clear-it').classList.remove('hidden')
        document.getElementById('battle').classList.add('hidden')
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function clearIt() {
  clearCards(1)
  clearCards(2)
  
  //hide clear it button & war zones
  document.getElementById('war1').classList.add('hidden')
  document.getElementById('war2').classList.add('hidden')

  document.querySelector('button').classList.remove('hidden')
  document.getElementById('clear-it').classList.add('hidden')
}

function clearCards(num) {
  document.getElementById(`p-${num}-1`).src = ''
  document.getElementById(`p-${num}-2`).src = ''
  document.getElementById(`p-${num}-3`).src = ''
  document.getElementById(`battle-card${num}`).src = ''
}

