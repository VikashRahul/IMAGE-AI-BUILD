import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
const path = require("path");

//allows us to pool our environment variables from our dotenv file
dotenv.config();


const app = express();

//middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//creating api end points that we can hook from frontend
app.use('/api/v1/post', postRoutes);
//postRoutes for creating post
app.use('/api/v1/dalle', dalleRoutes);
//dalleRoutes to generate data from api


// Serve static files from the "client/dist" directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle all routes by serving the index.html from "client/dist" directory
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from AI!',
    });
  });

  const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, 
        //() => console.log('Server started on port http://localhost:8080')
      );
    } catch (error) {
      //console.log(error);
    }
  };
  
  startServer();