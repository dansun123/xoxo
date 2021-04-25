const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socket = require("./server-socket");

const { validationResult } = require("express-validator/check");

const axios = require("axios");


function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

const getRedirectLink = (req, res) => {
  res.send({ link: process.env.FIREROAD_LINK });
};
const fetchUserInfo = async (code) => {
  const password = "DH3ordzkbjBra9";
  try {
    let data = await axios({
      url: process.env.FIREROAD_LINK + `fetch_token/?code=${code}`
    })
    data = data.data
    const accessToken = data.access_info.access_token;
    const email = data.access_info.academic_id;

    let userData = await axios({
      url: process.env.FIREROAD_LINK + "user_info",
      headers: { 'Authorization': "Bearer " + accessToken },
    })
    userData = userData.data;
    const name = userData.name;
    return { name, email, password, accessToken }
  } catch (e) {
    console.log(e)
  }
  return {}
}
const signUpLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { code } = req.query;
  const { name, email, password, accessToken } = await fetchUserInfo(code)
  console.log(name, email, password, accessToken)
  try {
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      user.accessToken = accessToken;
      user.save().then((user) => {
        req.session.user = user;
        return res.redirect("/");
      })
    }
    else {
      user = new User({
        name: name,
        email: email,
        accessToken: accessToken,
        isVerified: true,
      })
      console.log(user);
      await user.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: err.message });
        }
      });

      req.session.user = user;
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Error in Saving" });
  }
}

module.exports = {
  logout,
  populateCurrentUser,
  ensureLoggedIn,
  getRedirectLink,
  signUpLogin,
};
