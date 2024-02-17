const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
require('dotenv').config();


const documentRoutes = require('./src/routes/documentRoutes');

if (cluster.isMaster) {

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });


  setInterval(() => {
    const activeThreads = Object.keys(cluster.workers).length;
    console.log(`Number of active threads: ${activeThreads}`);
  }, 5000); // Display every 5 seconds
} else {

  const app = express();
  app.use(bodyParser.json());

  //Connecting to MongoDb with credentials
  const uri = process.env.MONGODB_URI;


  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // Routes
  app.use('/documents', documentRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} is listening on port ${PORT}`);
  });
}
