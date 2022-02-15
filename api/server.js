const express = require("express");
const morgan = require('morgan')

const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
server.use(morgan('tiny'))

server.use('/api/accounts', accountsRouter)


module.exports = server;
