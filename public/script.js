document.addEventListener('DOMContentLoaded', (event) => {
    const inputText = document.getElementById('inputText');
    const output = document.getElementById('output');

    inputText.addEventListener('input', async (event) => {
        const userInput = event.target.value;
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Tpye': 'application/json'
            },
            body: JSON.stringify({prompt: userInput})
        });
        const data = await response.json();
        output.textContent = data.output || 'Your analysis will appear here.';
    });
});
