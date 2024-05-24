document.addEventListener('DOMContentLoaded', (event) => {
    const suitSelect = document.getElementById('suit');
    const valueSelect = document.getElementById('value');
    const output = document.getElementById('output');

    window.showText = async function() {
        const selectedSuit = suitSelect.value;
        const selectedValue = valueSelect.value;
        const userInput = `${selectedValue} of ${selectedSuit}s`;  // Format the user input as "Value of Suits"
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
