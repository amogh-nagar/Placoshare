let io;

module.exports = {
  init: (httpserver) => {
    io = require("socket.io")(httpserver);
    return io;
  },
  getio: () => {
    return io;
  },
};
