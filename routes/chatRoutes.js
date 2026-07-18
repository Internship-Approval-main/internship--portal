// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');
const path = require('path');

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || message.trim() === "") {
            return res.status(400).json({ error: "Message cannot be empty." });
        }

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

    } catch (error) {
        console.error("Route Error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;