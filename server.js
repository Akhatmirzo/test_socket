const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  const userId = socket.handshake.query.userId;
  users.push(userId);

  console.log(users);

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit('chat message', msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});
