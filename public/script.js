document.addEventListener('DOMContentLoaded', (event) => {
    const card1Suit = document.getElementById('card1Suit');
    const card1Value = document.getElementById('card1Value');
    const card2Suit = document.getElementById('card2Suit');
    const card2Value = document.getElementById('card2Value');
    const inputText = document.getElementById('userInput');
    const output = document.getElementById('output');

    function updateCardOptions() {
        const selectedSuit1 = card1Suit.value;
        const selectedValue1 = card1Value.value;
        const selectedSuit2 = card2Suit.value;
        const selectedValue2 = card2Value.value;

        if (selectedValue1 === selectedValue2 && selectedSuit1 === selectedSuit2) {
            card2Value.value = "?";
        }
    }

    function updateCardOptions2() {
        const selectedSuit1 = card1Suit.value;
        const selectedValue1 = card1Value.value;
        const selectedSuit2 = card2Suit.value;
        const selectedValue2 = card2Value.value;

        if (selectedValue1 === selectedValue2 && selectedSuit1 === selectedSuit2) {
            card1Value.value = "?";
        }
    }

    function updateImages() {
        updateCardOptions();
        updateCardOptions2();

        const card1 = document.getElementById('card1');
        const card2 = document.getElementById('card2');

        const card1SuitValue = card1Suit.value;
        const card1ValueValue = card1Value.value;
        const card2SuitValue = card2Suit.value;
        const card2ValueValue = card2Value.value;

        card1.src = (card1SuitValue === "?" || card1ValueValue === "?") ? "cardspng/back.png" : `cardspng/${card1ValueValue}_of_${card1SuitValue}s.png`;
        card2.src = (card2SuitValue === "?" || card2ValueValue === "?") ? "cardspng/back.png" : `cardspng/${card2ValueValue}_of_${card2SuitValue}s.png`;
    }

    card1Suit.addEventListener('change', updateImages);
    card1Value.addEventListener('change', updateImages);
    card2Suit.addEventListener('change', updateImages);
    card2Value.addEventListener('change', updateImages);

    // Function to handle poker hand analysis
    window.showTextHand = async function() {
        const card1 = `${card1Value.value} of ${card1Suit.value}s`;
        const card2 = `${card2Value.value} of ${card2Suit.value}s`;
        const userInput = `Card 1: ${card1}, Card 2: ${card2}`;
        const response = await fetch('http://127.0.0.1:5000/generate', {
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

    // Function to handle general questions
    window.showTextGeneral = async function() {
        const userInput = inputText.value; // Retrieve the value from the input field
        const response = await fetch('http://127.0.0.1:5000/generate2', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
        });
        if (userInput == "" || userInput == " ") {
            output.textContent = "Please provide your question.";
        } else if (response.ok) {
            const data = await response.text();
            output.textContent = data || 'hello.';
        } else {
            output.textContent = 'An error occurred.';
        }
    };
});
