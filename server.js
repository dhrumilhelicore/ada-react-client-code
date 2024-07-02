require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
    // Ensure that all communication is over HTTPS
    // res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // Enable XSS protection
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Prevent rendering of the page inside a frame or iframe
    res.setHeader('X-Frame-Options', 'DENY');

    // Avoid MIME sniffing
    res.setHeader('X-Download-Options', 'noopen');

    // Enable cross-origin resource sharing (CORS) - adjust origin as needed
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
