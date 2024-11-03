const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // Ganti dengan host database kamu
    user: 'root',      // Ganti dengan username database kamu
    password: '',      // Ganti dengan password database kamu
    database: 'to_do_list' // Ganti dengan nama database kamu
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
