document.addEventListener('DOMContentLoaded', (event) => {
    const card1Suit = document.getElementById('card1Suit');
    const card1Value = document.getElementById('card1Value');
    const card2Suit = document.getElementById('card2Suit');
    const card2Value = document.getElementById('card2Value');
    const inputText = document.getElementById('userInput');
    const output = document.getElementById('output');

    // Function to update the image based on card 1 suit selection
    window.updateImage = function() {
        const suit = card1Suit.value;
        const image = document.getElementById('suitImage');
        switch (suit) {
            case 'spade':
                image.src = 'spadesuit.jpg';
                break;
            case 'heart':
                image.src = 'heartsuit.jpg';
                break;
            case 'diamond':
                image.src = 'diamondsuit.jpg';
                break;
            case 'club':
                image.src = 'clubsuit.jpg';
                break;
            default:
                break;
        }
    };

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
        if (response.ok) {
            const data = await response.text();
            output.textContent = data || 'hello.';
        } else {
            output.textContent = 'An error occurred.';
        }
    };

    // Function to handle general questions
    window.showTextGeneral = async function() {
        const userInput = inputText.value; // Retrieve the value from the input field
        const response = await fetch('http://127.0.0.1:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: userInput
        });
        if (response.ok) {
            const data = await response.text();
            output.textContent = data || 'hello.';
        } else {
            output.textContent = 'An error occurred.';
        }
    };
});
