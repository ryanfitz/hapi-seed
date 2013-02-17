#!/usr/bin/env node

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('REST server ' + worker.process.pid + ' died');
  });
} else {
  var Server = require("../server");
  new Server().start();
}
