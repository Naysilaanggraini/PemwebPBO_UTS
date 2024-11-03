const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Landing Page
    router.get('/', (req, res) => {
        res.render('landing');
    });

    // Dashboard
    router.get('/dashboard', (req, res) => {
        if (req.session.user) {
            res.render('dashboard'); // Render dashboard tanpa todo
        } else {
            res.redirect('/auth/login');
        }
    });

    // Kegiatan
    router.get('/kegiatan', (req, res) => {
        if (req.session.user) {
            const userId = req.session.user.id;
            db.query('SELECT * FROM kegiatan WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.render('kegiatan', { kegiatan: results });
            });
        } else {
            res.redirect('/auth/login');
        }
    });

    // Pembelian
    router.get('/pembelian', (req, res) => {
        if (req.session.user) {
            const userId = req.session.user.id;
            db.query('SELECT * FROM pembelian WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.render('pembelian', { pembelian: results });
            });
        } else {
            res.redirect('/auth/login');
        }
    });

    // Tugas
    router.get('/tugas', (req, res) => {
        if (req.session.user) {
            const userId = req.session.user.id;
            db.query('SELECT * FROM tugas WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.render('tugas', { todos: results });
            });
        } else {
            res.redirect('/auth/login');
        }
    });

    // Catatan
    router.get('/catatan', (req, res) => {
        if (req.session.user) {
            const userId = req.session.user.id;
            db.query('SELECT * FROM catatan WHERE user_id = ?', [userId], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.render('catatan', { catatan: results });
            });
        } else {
            res.redirect('/auth/login');
        }
    });

    // Tambah kegiatan
    router.post('/kegiatan', (req, res) => {
        const { kegiatan } = req.body;
        const userId = req.session.user.id;
        db.query('INSERT INTO kegiatan (user_id, nama_kegiatan) VALUES (?, ?)', [userId, kegiatan], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/kegiatan');
        });
    });

    // Hapus kegiatan
    router.post('/kegiatan/delete', (req, res) => {
        const kegiatanId = req.body.kegiatanId;
        db.query('DELETE FROM kegiatan WHERE id = ?', [kegiatanId], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/kegiatan');
        });
    });

    // Tambah pembelian
    router.post('/pembelian', (req, res) => {
        const { pembelian } = req.body;
        const userId = req.session.user.id;
        db.query('INSERT INTO pembelian (user_id, nama_pembelian) VALUES (?, ?)', [userId, pembelian], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/pembelian');
        });
    });

    // Hapus pembelian
    router.post('/pembelian/delete', (req, res) => {
        const pembelianId = req.body.pembelianId;
        db.query('DELETE FROM pembelian WHERE id = ?', [pembelianId], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/pembelian');
        });
    });

    // Tambah tugas
    router.post('/tugas', (req, res) => {
        const { task } = req.body;
        const userId = req.session.user.id;
        db.query('INSERT INTO tugas (user_id, task) VALUES (?, ?)', [userId, task], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/tugas');
        });
    });

    // Hapus tugas
    router.post('/tugas/delete', (req, res) => {
        const tugasId = req.body.tugasId;
        db.query('DELETE FROM tugas WHERE id = ?', [tugasId], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/tugas');
        });
    });

    // Tambah catatan
    router.post('/catatan', (req, res) => {
        const { catatan } = req.body;
        const userId = req.session.user.id;
        db.query('INSERT INTO catatan (user_id, teks_catatan) VALUES (?, ?)', [userId, catatan], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/catatan');
        });
    });

    // Hapus catatan
    router.post('/catatan/delete', (req, res) => {
        const catatanId = req.body.catatanId;
        db.query('DELETE FROM catatan WHERE id = ?', [catatanId], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/catatan');
        });
    });

    return router;
};
