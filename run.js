const app = require('./app');

const rep = app.generateReport('title', 'script.js', 'css.css', 'body.html');
console.log(rep);