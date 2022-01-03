const express = require('express');
const router = express.Router();

router.get('/list', (req, res, next) => {
    res.json({
        errno: 0,
        data: 'blog list'
    });
});

router.get('/detail', (req, res, next) => {
    res.json({
        errno: 0,
        data: 'blog detail'
    });
});

module.exports = router;