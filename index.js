require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app); 
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const ClientRoutes = require('./routes/Client');
const itemRoutes = require('./routes/item')
const loginRoutes = require('./routes/user')

app.use('/client', ClientRoutes);
app.use('/item',itemRoutes);
app.use('/login',loginRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('✅ Database Connection is ready...');
    server.listen(PORT, () => {        
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
