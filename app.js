const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const cors = require("cors");


const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.json());
app.use(cors());
app.use(express.static((__dirname, 'assets')));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/bootstrap", express.static(__dirname + "assets/bootstrap"));
app.use("/webfonts", express.static(__dirname + "assets/webfonts"));
app.use("/js", express.static(__dirname + "assets/js"));
app.use("/scss", express.static(__dirname + "assets/scss"));

// Use the router for handling routes
app.use('/', indexRouter);

app.use('/shop', indexRouter);

app.use('/profile', indexRouter);

app.use('/logout', indexRouter);

app.use('/checkout', indexRouter);

app.use('/contact', indexRouter);

app.use('/wallet', indexRouter);

app.use('/oauth2/callback', indexRouter);

app.post("/exchange-code", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "1281168143720644670",
        client_secret: "V6Bvw0m5iQLqm3VDWuY2E1U81vou4KYH",
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://infiniteservices.glitch.me/",
        scope: "identify email",
      }),
    });

    const tokenData = await response.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    res.json({
      success: true,
      id: userData.id,
      avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
      email: userData.email,
      discordUsername: userData.username,
      displayName: userData.global_name || userData.username,
    });
  } catch (error) {
    console.error("Error exchanging code:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/google-token", async (req, res) => {
  const { id_token } = req.body;

  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
    const userData = await response.json();

    res.json({
      success: true,
      id: userData.sub,
      avatar: userData.picture,
      email: userData.email,
      discordUsername: userData.name,
      displayName: userData.name,
    });
  } catch (error) {
    console.error("Error validating Google token:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
