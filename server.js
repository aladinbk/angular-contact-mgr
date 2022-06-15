const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/angular-contact-mgr'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-contact-mgr/'}),
);

server.use(middlewares);
server.use(router);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);