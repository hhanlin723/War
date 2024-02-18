//determines card class uses a suit, face, and a value
class Card {
    constructor(suit, face, value) {
        this.suit = suit;
        this.face = face;
        this.value = value;
    }
}
//determines player name, score, pile, and hand
class Player {
    constructor(name, hand) {
        this.name = name;
        this.score = 0;
        this.pile = [];
        this.hand = hand;
    }
}
//the game needs a deck, players, and initialize the game(set it up), and start the game
class Game {
    constructor() {
        this.deck = [];
        this.players = [];
        this.initGame();
        this.startGame();
    }

    //2 arrays to make the cards, suit and value
    makeCards() {
        let suits = ['❤️', '💎', '🍀', '🗡️'];
        let faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

        for (let f = 0; f < faces.length; f++) {
            for (let s = 0; s < suits.length; s++) {
                let card = new Card(suits[s], faces[f], f + 2);
                this.deck.push(card);
            }
        }

        // Shuffle the deck - borrowed this code from https://stackoverflow.com
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }

    //deal out the cards to each player
    initGame() {
        this.makeCards();

        for (let x = 0; x < 2; x++) {
            let hand = this.deck.splice(0, 26);
            let player = new Player(`Player${x + 1}`, hand);
            this.players.push(player);
        }
    }
//start to have each player play a card, determine which player wins and if there is a tie
    startGame() {
        let round = 1;
        while (this.players[0].hand.length > 0 && this.players[1].hand.length > 0) {
            console.log(`Round ${round++}:`);
            let player1Card = this.players[0].hand.shift();
            let player2Card = this.players[1].hand.shift();
            console.log(`${this.players[0].name} plays:`, player1Card);
            console.log(`${this.players[1].name} plays:`, player2Card);

            if (player1Card.value > player2Card.value) {
                this.players[0].pile.push(player1Card, player2Card);
                console.log(`${this.players[0].name} wins the round!`);
            } else if (player2Card.value > player1Card.value) {
                this.players[1].pile.push(player1Card, player2Card);
                console.log(`${this.players[1].name} wins the round!`);
            } else {
                console.log("It's a tie!");
                this.players[0].pile.push(player1Card);
                this.players[1].pile.push(player2Card);
            }
        }

        this.declareWinner();
    }
//determines the winner
    declareWinner() {
        let winner = this.players.reduce((prev, current) => (prev.pile.length > current.pile.length ? prev : current));
        console.log(`${winner.name} wins the game with ${winner.pile.length} cards in their pile!`);
    }
}

const game = new Game();
console.log(game);
