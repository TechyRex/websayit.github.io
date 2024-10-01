const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for codes (use a database for production)
let codes = [];

// Generate a code
app.post('/generate-code', (req, res) => {
    const newCode = Math.random().toString(36).substr(2, 8); // Generate a random code
    codes.push(newCode);
    res.json({ code: newCode });
});

// Revoke a code
app.post('/revoke-code', (req, res) => {
    const { code } = req.body;
    const index = codes.indexOf(code);
    if (index !== -1) {
        codes.splice(index, 1);
        return res.json({ message: `Revoked Code: ${code}` });
    }
    return res.status(404).json({ message: 'Code not found!' });
});

// Validate a code
app.get('/validate-code/:code', (req, res) => {
    const { code } = req.params;
    if (codes.includes(code)) {
        return res.json({ valid: true });
    }
    return res.json({ valid: false });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
