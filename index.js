"use strict";
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const apiRouter = require("./src/express/routers/api");
const appRouter = require("./src/express/routers/app");
const { logger, successDev, errorDev } = require("./src/app/logger");

function startServer() {
    if ("production" !== process.env.NODE_ENV) {
        app.use(logger);
    }

    app.use("/api", apiRouter);
    app.use("/", appRouter);

    app.listen(4000, () => {
        successDev("*****************************************");
        successDev("* Server has been started on port 4000! *");
        successDev("*****************************************");
    });
}

function start() {
    mongoose.set("useCreateIndex", true); // Fix collection.ensureIndex is deprecated. Use createIndexes instead.
    mongoose
        .connect("mongodb://localhost:27017/todo", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(startServer)
        .catch((err) => {
            errorDev(err.message);
        });
}

start();
