const { Client, Intents } = require('discord.js');
const express = require('express');
const path = require('path');

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
        client.user.setActivity(status[Math.floor(Math.random() * status.length)], { type: ActivityType.PLAYING });
    }, 10000);
});


// web ---------------------------------

const app = express();

const webDirectory = path.join(__dirname, 'web');

app.use(express.static(webDirectory));

app.get('/', (req, res) => {
    res.sendFile(path.join(webDirectory, 'index.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(webDirectory, 'shop.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(webDirectory, 'inf.html'));
});

app.get('/logout', (req, res) => {
    res.sendFile(path.join(webDirectory, 'logout.html'));
});

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Main Bot ---------------------------------
require("dotenv").config();

// anti error
process.on("unhandledRejection", error => {
    return console.log(error)
});
process.on("unhandledRejection", error => {
    return
});
process.on("unhandledRejection", error => {
    return
});

client.login(process.env.token)

// ------------------------------------------------------------------