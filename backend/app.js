const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Biere = require('./models/biere');
const note = require('./models/note');
const app = express();
const bieresRoutes = require('./routes/bieres');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://dankrok:bDV9pmPtD9mby9d@bieropedie.kznuc.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie frère !'))
  .catch(() => console.log('Connexion à MongoDB échouée cousin !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/bieres', bieresRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;