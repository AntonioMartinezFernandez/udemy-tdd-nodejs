// Dependencies
import express from 'express';
import axios from 'axios';

// Middlewares
import { authenticate } from './src/middlewares/index.js';

// Controllers
import { posts, users } from './src/handlers/index.js';

const usersHandler = new users({ axios });
const postsHandler = new posts({ axios });

// Environment variables
const port = 3000;

// Express instance
const app = express();

// Express middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get('/user', usersHandler.get);
app.post('/user', usersHandler.post);
app.put('/user/:id', usersHandler.put);
app.delete('/user/:id', usersHandler.delete);

app.post('/post', authenticate, postsHandler.post);

// Server initialization
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

export const appTest = app;
