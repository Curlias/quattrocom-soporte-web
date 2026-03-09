const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname));

// Route for sections
app.get('/sections/:section.html', (req, res) => {
    const sectionName = req.params.section;
    const validSections = ['home', 'speedtest', 'articles', 'troubleshooting', 'contact', 'status'];
    
    if (validSections.includes(sectionName)) {
        res.sendFile(path.join(__dirname, 'sections', `${sectionName}.html`));
    } else {
        res.status(404).send('Section not found');
    }
});

// Default route - serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-new.html'));
});

// Handle section routes
app.get('/:section', (req, res) => {
    const section = req.params.section;
    const validSections = ['home', 'speedtest', 'articles', 'troubleshooting', 'contact', 'status'];
    
    if (validSections.includes(section)) {
        res.sendFile(path.join(__dirname, 'index-new.html'));
    } else {
        res.status(404).send('Page not found');
    }
});

app.listen(port, () => {
    console.log(`Quattrocom Support Server running at http://localhost:${port}`);
    console.log('Available sections:');
    console.log('- http://localhost:3000/ (Home)');
    console.log('- http://localhost:3000/speedtest');
    console.log('- http://localhost:3000/articles');
    console.log('- http://localhost:3000/troubleshooting');
    console.log('- http://localhost:3000/contact');
    console.log('- http://localhost:3000/status');
});