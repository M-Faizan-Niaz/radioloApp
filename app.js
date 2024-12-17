/** @format */

const express = require("express");

const app = express();
const globalErrorHandler = require("./controllers/errorController");
app.use(express.json());

const caseRouter = require("./router/caseRouter");
const userRouter = require("./router/userRouter");

app.use("/api/v1/cases", caseRouter);
app.use("/api/v1/users", userRouter);

// HANDLING UNHANDLED routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl}`);
  (err.status = "fail"), (err.statusCode = 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
