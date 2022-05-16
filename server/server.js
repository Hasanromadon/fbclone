require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const userRoutes = require('./routes/user');
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.03fxu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log('DB connected succesfuly'))
  .catch(() => console.log('Error Connect to DB'));

readdirSync('./routes').map((r) =>
  app.use('/api/v1', require('./routes/' + r))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Running on PORT ' + PORT);
});
