const express = require('express');
const { process_params } = require('express/lib/router');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


// Default response for any other request (Not Found) 
app.use((req, res) => {
    res.sendStatus(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});