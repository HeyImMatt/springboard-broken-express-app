# Broken App Issues

- Inconsistent (and wrong) variable declarations:
  * let axios = require('axios');
  * var app = express();
- No 'look before you leap' checks on the incoming request and data. (ex. What if it's not an array?)
- Using d and r for the .map variable names is not very descriptive of what those represent
- Could use the built-in .json method from express instead of JSON.stringify
- No route for next(err) to go to
- No 404 handler or general error handling
- app.listen could execute a callback function to log that it's listening or any errors that occurred during startup

# Original Code for Broken App

```js
const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', function(req, res, next) {
  try {
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000);
```