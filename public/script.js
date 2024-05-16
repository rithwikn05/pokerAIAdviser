document.addEventListener('DOMContentLoaded', (event) => {
    const inputText = document.getElementById('inputText');
    const output = document.getElementById('output');

    inputText.addEventListener('input', async (event) => {
        const userInput = event.target.value;
        const response = await fetch('http://127.0.0.1:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Tpye': 'text/plain'
            },
            body: userInput
        });
        if (response.ok) {
            const data = await response.text();
            output.textContent = data || 'hello.';
        } else {
            output.textContent = 'An error occurred.';
        }
    });
});
