require('dotenv').config(); // export env variables

const teams = require('./routes/teams');

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/teams', teams);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
