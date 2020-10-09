const express = require('express');
const app = express();
const axios = require('axios');
const ExpressError = require('./expressError');

app.use(express.json());

app.post('/', (req, res) => {
  if (!req.body.developers) throw new ExpressError('Developer username(s) required', 400);
  const devInfo = req.body.developers.map(async (dev) => {
    try {
      const resp = await axios.get(`https://api.github.com/users/${dev}`);
      if (resp.status !== 404) {
        return {
          bio: resp.data.bio,
          name: resp.data.name,
        };
      }
      
    } catch {
      return {message: "Username not found"};
    }
  });
  Promise.all(devInfo).then((data) => {
    return res.status(200).json(data);
  })
});

app.use(function (req, res, next) {
  return new ExpressError('Not Found', 404);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: message,
  });
});

app.listen(3000, function (err) {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log('Server starting on port 3000');
  }
});
