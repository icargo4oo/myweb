const { Client, Intents } = require('discord.js');
const express = require('express');
const path = require('path');
require('dotenv').config();  // تأكد من تحميل البيئة أولاً

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});

client.once('ready', () => {
    console.log(`✅ : Logged in as ${client.user.tag}`);

    let status = [
        `#CMV_3MK`,
        `Hi There`,
        `discord.gg/TGjv5QSepP`,
        `Version: 1.0.0`
    ];

    setInterval(() => {
        client.user.setActivity(status[Math.floor(Math.random() * status.length)], { type: 'PLAYING' });
    }, 10000);
});

// Web ---------------------------------

const app = express();
const port = process.env.PORT || 3000;  // تأكد من تعيين المنفذ

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { text: 'Home Page' });
});

app.get('/shop', (req, res) => {
    res.render('shop', { text: 'Shop Page' });
});

app.get('/login', (req, res) => {
    res.render('login', { text: 'Login Page' });
});

app.get('/logout', (req, res) => {
    res.render('logout', { text: 'Logout Page' });
});

app.listen(port, () => {
    console.log(`🌐 Server is running on port ${port}`);
});

// Main Bot ---------------------------------

process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
});

client.login(process.env.token);
