var Hapi = require('hapi');

// Define the route
var hello = {
  handler: function (request) {
    request.reply({ greeting: 'hello world' });
  }
};

var Server = module.exports = function(options) {
  this.options = options || {};
  this.options.port = this.options.port || 8000;

  // Create a server with a host and port
  this._server = new Hapi.Server('localhost', this.options.port, {cors: true, monitor: true});

  this._server.route({
    method: 'GET',
    path: '/hello',
    config: hello
  });
};

Server.prototype.start = function(callback) {
  var self = this;

  callback = callback || function(){};

  this._server.start(function() {
    Hapi.Log.event(['server','info'], 'started on port ' + self.options.port);

    return callback();
  });
};
