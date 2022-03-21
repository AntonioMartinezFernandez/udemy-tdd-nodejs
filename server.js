import express from 'express';
import axios from 'axios';

import { users } from './src/handlers/index.js';

const usersHandler = new users({ axios });

const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', usersHandler.get);
app.post('/', usersHandler.post);
app.put('/:id', usersHandler.put);
app.delete('/:id', usersHandler.delete);

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
