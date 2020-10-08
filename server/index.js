require('dotenv').config(); // export env variables

const teams = require('./routes/teams');
const players = require('./routes/players');

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/teams', teams);
app.use('/api/players', players);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
