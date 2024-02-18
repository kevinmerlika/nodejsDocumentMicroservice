const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const authMiddleware = require('./src/middlewares/authMiddleware');
const session = require('express-session');


require('dotenv').config();


const documentRoutes = require('./src/routes/documentRoutes');
const userRoutes = require('./src/routes/userRoutes');
const webRoutes = require('./src/routes/webRoutes');

if (cluster.isMaster) {

  for (let i = 0; i < 4; i++) {
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
  app.use(cors());
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
  app.use('/user', userRoutes);
  app.use('/navbar', webRoutes);


  app.use(authMiddleware)

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} is listening on port ${PORT}`);
  });
}
