const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the index.html file for the root route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/shop.html'));
});

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/inf.html'));
});

router.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/checkout.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

router.get('/wallet', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/wallet.html'));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/logout.html'));
});

router.get('/oauth2/callback', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
