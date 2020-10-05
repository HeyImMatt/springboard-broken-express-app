### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  * Callback functions
  * Promises
  * Async/Await

- What is a Promise?
  * A one-time guarantee of a future value

- What are the differences between an async function and a regular function?
  * Regular functions execute in order from top to bottom. Async functions can have code that does not run in order and can be blocking or non-blocking of code that follows it.

- What is the difference between Node.js and Express.js?
  * Node is a runtime platform that allows javascript to be run outside of a browser environment. Express is a web application framework built on top of node that makes building a web server easier.

- What is the error-first callback pattern?
  * A pattern where errors are the first parameter to a callback function.

- What is middleware?
  * Code that runs in the middle of the request / response cycle.

- What does the `next` function do?
  * Tells Express to continue on to the next route

- What does `RETURNING` do in SQL? When would you use it?
  * Allows you to retrieve values of columns and expressions that were modified by an insert, delete, or update so you don't have to run a SELECT statement to get the new values.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  * Could abstract most of the url to a variable
  * Could use Promise.all to initiate the requests at the same time instead of sequentially
  * There is no try / catch for error handling
  * The return array could contain empty or unexpected data
  * Could take in a parameter that's an array of usernames and loop through that so that it's not hardcoded to just the three users listed.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
