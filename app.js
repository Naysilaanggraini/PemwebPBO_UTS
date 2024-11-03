const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Menggunakan db.js
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// Set view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index')(db));
app.use('/auth', require('./routes/auth')(db));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
