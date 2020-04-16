"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    id: Schema.ObjectId,
    body: { type: String, required: true, unique: true, dropDups: true },
    owner: { type: Schema.Types.ObjectId },
    expires: { type: Date, default: Date.now() + ( 60 * 5 ) },
});

