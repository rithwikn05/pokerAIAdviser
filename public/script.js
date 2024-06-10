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
    const output1 = document.getElementById('output1');
    const output2 = document.getElementById('output2');
    const output3 = document.getElementById('output3');
    const output4 = document.getElementById('output4');
    const output5 = document.getElementById('output5');


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
                if (cardsArray[i] && cardsArray[j] && cardsArray[i].suit === cardsArray[j].suit && cardsArray[i].value === cardsArray[j].value && (cardsArray[i].value !== "?" && cardsArray[i].suit !== "?")) {
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

        function sectionsplitter (text) { // I MADE TWO OF THESE FUNCTIONS!!! one is in the next async function

            const sections = [];
            let startIndex = 0;
    
            for (let i = 1; i <= 4; i++) {
                const searchString = `${i}. `;
                const index = text.indexOf(searchString, startIndex);
            
                if (index !== -1) {
                    const nextIndex = text.indexOf(`${i + 1}. `, index + 1);
                    if (nextIndex !== -1) {
                        sections.push(text.slice(index, nextIndex).trim());
                        startIndex = nextIndex;
                    } else {
                        sections.push(text.slice(index).trim());
                        break;
                    }
                }
            }
            
    
            if (sections.length === 4) {
                document.getElementById("output1").textContent = sections[0];
                document.getElementById("output2").textContent = sections[1];
                document.getElementById("output3").textContent = sections[2];
                document.getElementById("output4").textContent = sections[3];
            } else {
                // Handle case where the response doesn't have exactly 4 sections
                document.getElementById("output1").textContent = "Unexpected response format.";
            }
    
    
        }

        
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
            output1.textContent = "Please provide both cards in your hand.";
        } else if (response.ok) {
            const data = await response.text();

            //output1.textContent = data || 'hello.';

            sectionsplitter(data)

        } else {
            output1.textContent = 'An error occurred.';
        }
    };

    // Function to handle board card analysis
    window.showTextBoard = async function() {



        function sectionsplitter (text) { // I MADE TWO OF THESE FUNCTIONS!!! one is in the next async function

            const sections = [];
            let startIndex = 0;
    
            for (let i = 1; i <= 4; i++) {
                const searchString = `${i}. `;
                const index = text.indexOf(searchString, startIndex);
            
                if (index !== -1) {
                    const nextIndex = text.indexOf(`${i + 1}. `, index + 1);
                    if (nextIndex !== -1) {
                        sections.push(text.slice(index, nextIndex).trim());
                        startIndex = nextIndex;
                    } else {
                        sections.push(text.slice(index).trim());
                        break;
                    }
                }
            }
            
    
            if (sections.length === 4) {
                document.getElementById("output1").textContent = sections[0];
                document.getElementById("output2").textContent = sections[1];
                document.getElementById("output3").textContent = sections[2];
                document.getElementById("output4").textContent = sections[3];
            } else {
                // Handle case where the response doesn't have exactly 4 sections
                document.getElementById("output1").textContent = "Unexpected response format.";
            }
    
    
        }

        const boardCards = [
            `${boardCard1Value.value} of ${boardCard1Suit.value}s`,
            `${boardCard2Value.value} of ${boardCard2Suit.value}s`,
            `${boardCard3Value.value} of ${boardCard3Suit.value}s`,
            `${boardCard4Value.value} of ${boardCard4Suit.value}s`,
            `${boardCard5Value.value} of ${boardCard5Suit.value}s`
        ].join(', ');

        const flopCards = [
            `${boardCard1Value.value} of ${boardCard1Suit.value}s`,
            `${boardCard2Value.value} of ${boardCard2Suit.value}s`,
            `${boardCard3Value.value} of ${boardCard3Suit.value}s`
        ].join(', ');
    
        const turnCard = `${boardCard4Value.value} of ${boardCard4Suit.value}s`;
        const riverCard = `${boardCard5Value.value} of ${boardCard5Suit.value}s`;


        const card1 = `${card1Value.value} of ${card1Suit.value}s`;
        const card2 = `${card2Value.value} of ${card2Suit.value}s`;

        const userInput = `My cards are Card 1: ${card1}, Card 2: ${card2}. Flop cards are ${flopCards}. Turn card is ${turnCard}. River card is ${riverCard}.`;
    

        






        if (card1Suit.value === "?" || card2Suit.value === "?" || card1Value.value === "?" || card2Value.value === "?") {
            output1.textContent = "Please provide both cards in your hand.";
        } else if (flopCards.includes("?")) {
            output1.textContent = "Please provide all cards on the flop";
        } else if (boardCard4Value.value === "?" && boardCard4Suit.value === "?" && boardCard5Value.value === "?" && boardCard5Suit.value === "?") {
            const responseFlop = await fetch('http://127.0.0.1:5000/generatebflop', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
            });

            if (responseFlop.ok) {

                const data = await responseFlop.text();
                output1.textContent = data
                sectionsplitter(data)

            } else {
                output1.textContent = "smth wrong with GPT, output1 not ok"
            }
            
        } else if (boardCard4Value.value != "?" && boardCard4Suit.value != "?" && boardCard5Value.value === "?" && boardCard5Suit.value === "?") {
            const responseTurn = await fetch('http://127.0.0.1:5000/generatebturn', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
            });

            if (responseTurn.ok) {
                const data = await responseTurn.text();
                sectionsplitter(data)
            } else {
                output1.textContent = "smth wrong with GPT, output1 not ok"
            }

        } else if (boardCard4Value.value === "?" || boardCard4Suit.value === "?") {
            output1.textContent = "Please provide all cards on the turn or replace them with '?' ";
        } else if (boardCard5Value.value === "?" || boardCard5Suit.value === "?") {
            output1.textContent = "Please provide all cards on the river or replace them with '?' ";
        } else if (!boardCards.includes("?")) {

            const responseRiver = await fetch('http://127.0.0.1:5000/generatebriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
            });

            if (responseRiver.ok) {
                const data = await responseRiver.text();
                sectionsplitter(data)
            } else {
                output1.textContent = "smth wrong with GPT, output1 not ok"
            }

        } else {
            output1.textContent = "If statements not inclusive, try again"
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
        output5.textContent = data || 'hello.';
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
            output1.textContent = data || 'hello.';
        }
    });


    




});
