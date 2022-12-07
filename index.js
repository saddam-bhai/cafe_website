require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const forgetpasswordRoutes = require("./routes/forget_password");
const resetPasswordRoutes = require("./routes/reset_password");
const orderRoutes = require("./routes/orders");
const myOrder = require("./routes/my_order");
const allOrder = require("./routes/all_order");
const orderStatus = require("./routes/order_status");
const checkAuth = require("./middleware/check_auth");
const checkAdmin = require("./middleware/check_admin");
const path = require('path')
const favicon = require('serve-favicon');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, './client')))

app.use(favicon(path.join(__dirname, 'favicon.ico')));

//----------------database connection
connection();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//------------------------routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forget_password", forgetpasswordRoutes);
app.use("/api/reset_password", resetPasswordRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/myorder", myOrder);
app.use("/api/allorder", allOrder);
app.use("/api/order_status", orderStatus);


app.get('/main', (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/main/index.html'))
});

app.get('/myorder',checkAuth, (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/main/my_order.html'))
});
app.get('/allorder',checkAdmin, (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/main/all_order.html'))
});

app.get('/logout', (req, res, next) => {
  res.clearCookie("mytoken");
  res.clearCookie("myemail");
  res.redirect('/');
});

app.get('/forget_password', (req, res, next) => {
  res.sendFile(path.join(__dirname, './client/forget_password.html'))
});
app.get('/reset_password', (req, res, next) => {
  // console.log(req.query);
  res.sendFile(path.join(__dirname, './client/reset_password.html'))
});

//----------------- error handling
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({

    status: err.status || 500,
    message: err.message

  });
});

// --------------------------------------------------------------------------------------

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on http://localhost:${port}`));