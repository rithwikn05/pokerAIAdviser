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

    // Initialize card options
    updateCardOptions();

    // Event listener for card1Suit and card1Value change
    card1Suit.addEventListener('change', updateCardOptions);
    card1Value.addEventListener('change', updateCardOptions);
    card2Suit.addEventListener('change', updateCardOptions2);
    card2Value.addEventListener('change', updateCardOptions2);


    // Function to update the image based on card 1 suit selection
    

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