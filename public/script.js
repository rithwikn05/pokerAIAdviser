document.addEventListener('DOMContentLoaded', (event) => {
    const inputText = document.getElementById('inputText');
    const output = document.getElementById('output');

    inputText.addEventListener('input', (event) => {
        const userInput = event.target.value;
        output.textContent = userInput ? userInput : 'Your input will appear here.';
    });
});
