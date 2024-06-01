document.addEventListener('DOMContentLoaded', (event) => {
    const card1Suit = document.getElementById('card1Suit');
    const card1Value = document.getElementById('card1Value');
    const card2Suit = document.getElementById('card2Suit');
    const card2Value = document.getElementById('card2Value');
    
    const boardCard1Suit = document.getElementById('boardCard1Suit');
    const boardCard1Value = document.getElementById('boardCard1Value');
    const boardCard2Suit = document.getElementById('boardCard2Suit');
    const boardCard2Value = document.getElementById('boardCard2Value');
    const boardCard3Suit = document.getElementById('boardCard3Suit');
    const boardCard3Value = document.getElementById('boardCard3Value');
    const boardCard4Suit = document.getElementById('boardCard4Suit');
    const boardCard4Value = document.getElementById('boardCard4Value');
    const boardCard5Suit = document.getElementById('boardCard5Suit');
    const boardCard5Value = document.getElementById('boardCard5Value');

    const inputText = document.getElementById('userInput');
    const output = document.getElementById('output');

    let cardsArray = new Array(7).fill(null);







    function updateImages(x) {
        const card1Suit = document.getElementById('card1Suit');
        const card1Value = document.getElementById('card1Value');
        const card2Suit = document.getElementById('card2Suit');
        const card2Value = document.getElementById('card2Value');
    
        const boardCard1Suit = document.getElementById('boardCard1Suit');
        const boardCard1Value = document.getElementById('boardCard1Value');
        const boardCard2Suit = document.getElementById('boardCard2Suit');
        const boardCard2Value = document.getElementById('boardCard2Value');
        const boardCard3Suit = document.getElementById('boardCard3Suit');
        const boardCard3Value = document.getElementById('boardCard3Value');
        const boardCard4Suit = document.getElementById('boardCard4Suit');
        const boardCard4Value = document.getElementById('boardCard4Value');
        const boardCard5Suit = document.getElementById('boardCard5Suit');
        const boardCard5Value = document.getElementById('boardCard5Value');
    
        const boardCards = [
            { suit: boardCard1Suit.value, value: boardCard1Value.value, imgId: 'boardCard1' },
            { suit: boardCard2Suit.value, value: boardCard2Value.value, imgId: 'boardCard2' },
            { suit: boardCard3Suit.value, value: boardCard3Value.value, imgId: 'boardCard3' },
            { suit: boardCard4Suit.value, value: boardCard4Value.value, imgId: 'boardCard4' },
            { suit: boardCard5Suit.value, value: boardCard5Value.value, imgId: 'boardCard5' }
        ];
    
        if (x === 0) {
            cardsArray[x] = { suit: card1Suit.value, value: card1Value.value };
        } else if (x === 1) {
            cardsArray[x] = { suit: card2Suit.value, value: card2Value.value };
        } else if (x >= 2 && x <= 6) {
            const boardCard = boardCards[x - 2];
            cardsArray[x] = { suit: boardCard.suit, value: boardCard.value };
        }
    
        for (let i = 0; i < cardsArray.length; i++) {
            for (let j = i + 1; j < cardsArray.length; j++) {
                if (cardsArray[i] && cardsArray[j] && cardsArray[i].suit === cardsArray[j].suit && cardsArray[i].value === cardsArray[j].value) {
                    cardsArray[j] = { suit: "?", value: "?" };
                    if (j === 0) {
                        card1Suit.value = "?";
                        card1Value.value = "?";
                    } else if (j === 1) {
                        card2Suit.value = "?";
                        card2Value.value = "?";
                    } else {
                        const boardCardIndex = j - 2;
                        document.getElementById(`boardCard${boardCardIndex + 1}Suit`).value = "?";
                        document.getElementById(`boardCard${boardCardIndex + 1}Value`).value = "?";
                        boardCards[boardCardIndex].suit = "?";
                        boardCards[boardCardIndex].value = "?";
                        document.getElementById(boardCards[boardCardIndex].imgId).src = "cardspng/back.png";
                    }
                }
            }
        }
    
        // Update images for player cards
        document.getElementById('card1').src = (card1Suit.value === "?" || card1Value.value === "?") ? "cardspng/back.png" : `cardspng/${card1Value.value}_of_${card1Suit.value}s.png`;
        document.getElementById('card2').src = (card2Suit.value === "?" || card2Value.value === "?") ? "cardspng/back.png" : `cardspng/${card2Value.value}_of_${card2Suit.value}s.png`;
    
        // Update images for board cards
        boardCards.forEach(card => {
            const cardImg = document.getElementById(card.imgId);
            cardImg.src = (card.suit === "?" || card.value === "?") ? "cardspng/back.png" : `cardspng/${card.value}_of_${card.suit}s.png`;
        });
    }
    
    
    
    










    card1Suit.addEventListener('change', () => updateImages(0));
    card1Value.addEventListener('change', () => updateImages(0));
    card2Suit.addEventListener('change', () => updateImages(1));
    card2Value.addEventListener('change', () => updateImages(1));

    boardCard1Suit.addEventListener('change', () => updateImages(2));
    boardCard1Value.addEventListener('change', () => updateImages(2));
    boardCard2Suit.addEventListener('change', () => updateImages(3));
    boardCard2Value.addEventListener('change', () => updateImages(3));
    boardCard3Suit.addEventListener('change', () => updateImages(4));
    boardCard3Value.addEventListener('change', () => updateImages(4));
    boardCard4Suit.addEventListener('change', () => updateImages(5));
    boardCard4Value.addEventListener('change', () => updateImages(5));
    boardCard5Suit.addEventListener('change', () => updateImages(6));
    boardCard5Value.addEventListener('change', () => updateImages(6));

    // Function to handle poker hand analysis
    window.showTextHand = async function() {
        const card1 = `${card1Value.value} of ${card1Suit.value}s`;
        const card2 = `${card2Value.value} of ${card2Suit.value}s`;
        const userInput = `Card 1: ${card1}, Card 2: ${card2}`;
        const response = await fetch('http://127.0.0.1:5000/generatehandanalysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
        });
        if (card1Suit.value === "?" || card2Suit.value === "?" || card1Value.value === "?" || card2Value.value === "?") {
            output.textContent = "Please provide both cards in your hand.";
        } else if (response.ok) {
            const data = await response.text();
            output.textContent = data || 'hello.';
        } else {
            output.textContent = 'An error occurred.';
        }
    };

    // Function to handle board card analysis
    window.showTextBoard = async function() {
        const boardCards = [
            `${boardCard1Value.value} of ${boardCard1Suit.value}s`,
            `${boardCard2Value.value} of ${boardCard2Suit.value}s`,
            `${boardCard3Value.value} of ${boardCard3Suit.value}s`,
            `${boardCard4Value.value} of ${boardCard4Suit.value}s`,
            `${boardCard5Value.value} of ${boardCard5Suit.value}s`
        ].join(', ');

        const userInput = `Board Cards: ${boardCards}`;
        const response = await fetch('http://127.0.0.1:5000/generateBoard', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
        });
        if (boardCards.includes("?")) {
            output.textContent = "Please provide all board cards.";
        } else if (response.ok) {
            const data = await response.text();
            output.textContent = data || 'hello.';
        } else {
            output.textContent = 'An error occurred.';
        }
    };

    // Function to handle general questions
    window.showTextGeneral = async function() {
        const userInput = inputText.value; // Retrieve the value from the text input element
        const response = await fetch('http://127.0.0.1:5000/generategeneralquestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
        });
        const data = await response.text();
        output.textContent = data || 'hello.';
    };

    inputText.addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            const userInput = inputText.value; // Retrieve the value from the text input element
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: userInput
            });
            const data = await response.text();
            output.textContent = data || 'hello.';
        }
    });
});
