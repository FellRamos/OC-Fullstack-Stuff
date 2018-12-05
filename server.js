const http = require('http');
const app = require('./app');

// This function returns a valid port, whether it is provided as a string or number
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if(isNaN(port)) {
    return val;
  }
  if(port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// This function checks for various errors and handles them appropriately - it is then registered to the server
const errorHandler = (error) => {
  if(error.syscall !== 'listen'){
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address: 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' require elevated privileges.');
      process.exit(1);
      break;
    case ' EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
     default: 
      throw error; 
  }

}


const server = http.createServer(app);

// the listener is also registered, logging the port or named pipe on which the server is running.
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('listening on ' + bind);
})


server.listen(port);