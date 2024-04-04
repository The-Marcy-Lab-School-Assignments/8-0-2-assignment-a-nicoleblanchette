require('dotenv').config();
const express = require('express');
const path = require('path');
const fetchData = require('../utils/fetchData');

const pathToDistDir = path.join(__dirname, '..', 'giphy-search', 'dist')
const app = express()

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToDistDir)
  
// i had exporting problems again, the same one from lab review
// but i forgot and couldn't figure out how to fix it...
// so i have two different fetchData functions oops
const serveGifs = async (req, res, next) => {
  const search = req.query.search
  const API_URL = `https://api.giphy.com/v1/gifs/${search ? 'search' : 'trending'}?api_key=${process.env.API_KEY}${search ? '&q=' + search : ''}&limit=3&rating=g`;
  console.log(API_URL)
  try {
    const [data, error] = await fetchData(API_URL);
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
}

app.use(logRoutes)
app.use(serveStatic)

app.get('/api/gifs', serveGifs)

const port = 3939;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});