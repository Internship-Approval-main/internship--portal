// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
=======
const { execFile } = require('child_process');
const path = require('path');
>>>>>>> af15fa2b8b45d6492a28118b19db7efbe5635a04

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || message.trim() === "") {
            return res.status(400).json({ error: "Message cannot be empty." });
        }

<<<<<<< HEAD
        const apiResponse = await fetch('http://localhost:8000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!apiResponse.ok) {
            console.error(`Python API returned status ${apiResponse.status}`);
            return res.status(500).json({ error: "Failed to process RAG pipeline." });
        }

        const data = await apiResponse.json();
        return res.status(200).json({ reply: data.reply });

=======
        const scriptPath = path.join(__dirname, '../chat.py');

        // Spawns the python runtime environment and targets your chat script
        // Swap 'python' to 'python3' if on macOS/Linux
        execFile('python', [scriptPath, message], (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution Error: ${error.message}`);
                return res.status(500).json({ error: "Failed to process RAG pipeline." });
            }
            
            // Send the trimmed console output back to React
            const reply = stdout.trim();
            return res.status(200).json({ reply });
        });

>>>>>>> af15fa2b8b45d6492a28118b19db7efbe5635a04
    } catch (error) {
        console.error("Route Error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;