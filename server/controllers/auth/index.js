const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const sendGridMail = require("@sendgrid/mail");
const { config } = require("dotenv");

config();
sendGridMail.setApiKey(process.env.EMAIL_AUTH_KEY);

exports.test = (req, res) => {
  if (!req.session.userId) {
    res.status(404).send({
      message: "Please sign in first"
    });
  }
  res.status(200).send({
    message: "You are logged in"
  })
}
exports.home = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.status(404).send({
      message: "Please sign in first"
    });
  }
  else {
    console.log(req.headers['cookie'].split("=")[1]);
    res.status(200).send({
      message: "You are logged in"
    })
  }
}

exports.signOut = async (req, res) => {
  await req.session.destroy(() => {
    res.clearCookie('sid', { path: "/" }).status(200).send(
      { message: 'Cookie deleted.' });
  })
}

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send({
        message: "User already exists"
      });
    } else {
      const token = await jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION_KEY,
        { expiresIn: "10m" }
      );
      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Account activation link`,
        html: `
        <p>Please click on the following link to activate your account</p>
        <p>${process.env.CLIENT_URL}/activate-account/${token}</p>
        <hr />
        <p>This email may contain sensetive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `
      };
      await sendGridMail.send(emailData);
      res.status(200).send({
        message: "We sent an email confirmation link to your email"
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "Failed to create an account"
    });
  }
};

exports.accountActivation = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(404).send({
        error: "No valid token found"
      });
    } else {
      await jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION_KEY);
      const { name, email, password } = await jwt.decode(token);
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        res.status(400).send({
          message: "User already exists"
        });
      }
      const user = await new User({ name, email, password });
      user.save();
      res.status(200).send({
        message: "You successfully create an account"
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "Failed to create an account"
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({
        message: "Invalid username and password"
      });
    } else {
      let isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        res.status(400).send({
          message: "Invalid username and password"
        });
      } else {
        const token = await jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET_KEY
        );
        req.session.userId = user._id,
        req.session.token = token;
        // res.redirect("/api/home");
        res.status(200).send({
          message: "User sign in successfully",
        });
      }
    }
  } catch (err) {
    res.status(400).send({
      message: "Failed to create an account"
    });
  }
};
