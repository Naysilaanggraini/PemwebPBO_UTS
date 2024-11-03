const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

module.exports = (db) => {
    // Login
    router.get('/login', (req, res) => {
        res.render('login', { error: null });
    });

    router.post('/login', (req, res) => {
        const { username, password } = req.body;
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    req.session.user = { id: user.id, username: user.username };
                    res.redirect('/dashboard');
                } else {
                    res.render('login', { error: 'Username atau password salah.' });
                }
            } else {
                res.render('login', { error: 'Username atau password salah.' });
            }
        });
    });

    // Register
    router.get('/register', (req, res) => {
        res.render('register', { error: null });
    });

    router.post('/register', async (req, res) => {
        const { username, password } = req.body;

        // Cek apakah username sudah ada
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length > 0) {
                return res.render('register', { error: 'Username sudah digunakan.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.redirect('/auth/login');
            });
        });
    });

    router.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

    return router;
};
