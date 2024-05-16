const express = require('express');
const path = require('path');
const app = express();
const port = 3010;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.post('/generate', async (req, res) => {
//     try {
//       const { userInput } = req.body;
  
//       // Make an HTTP request to your Python server
//       const response = await axios.post(`http://localhost:${port}/generate`, { prompt: userInput });
  
//       // Send the API response back to the client
//       res.json({ output: response.data.output });
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});