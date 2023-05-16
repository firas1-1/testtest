const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const productRouter = require('./routes/products');
const notificationRouter = require('./routes/notification');
const detailProductRouter = require('./routes/DetailsProduct');
const depRouter = require('./routes/Department');
const testRouter = require('./routes/test');
const FournisseurRouter = require('./routes/fournisseur');
const commandRouter = require('./routes/Command');
const resRouter = require('./routes/response_command');
const findRouter = require('./routes/find');
const csvRouter = require('./routes/importCsv');
const userRouter = require('./routes/user');




// Configure environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);
app.use('/api/products', productRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/detailProduct', detailProductRouter);
app.use('/api/Department', depRouter);
app.use('/api/test', testRouter);
app.use('/api/fournisseur', FournisseurRouter);
app.use('/api/Command', commandRouter);
app.use('/api/response', resRouter);
app.use('/api/find', findRouter);
app.use('/api/csv', csvRouter);
app.use('/api/username', userRouter);




// Create server
const server = http.createServer(app);

// Set port
const port = process.env.PORT || 3000;

// Listen on provided port, on all network interfaces
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Error handling functions
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
