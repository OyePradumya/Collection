const cors = require('cors');
const express = require('express');
const axios = require('axios');
const connectToMongo = require('./db');
connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));

// app.get('/', async (req, res) => {
//   res.send("Backend running successfully!");
// });

setInterval(() => {
  console.log("Quiz updated after 1 hour!")
  // Make GET Request on every 1 hour
  axios.get(`https://googlesheet-quiz.herokuapp.com/api/quiz/updatequiz`).catch(error => console.log('Error to fetch data\n'))
}, 3600000);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', async (req, res) => {
    res.sendFile('client/build/index.html');
  });
}

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
});