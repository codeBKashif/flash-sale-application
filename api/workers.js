require("dotenv");
const { WorkerServer } = require("./libs/queue/WorkerServer");

server = new WorkerServer();
server.start();
