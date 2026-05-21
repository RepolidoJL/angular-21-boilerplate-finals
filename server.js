const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist', 'angular-21-boilerplate', 'browser')));

// For all GET requests, send back index.html so that Angular's routing works
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'angular-21-boilerplate', 'browser', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});