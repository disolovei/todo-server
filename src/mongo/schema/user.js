const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Schema.ObjectId,
    login: { type: String, unique: true, required: true, dropDups: true },
    email: { type: String, unique: true, required: true, dropDups: true },
    fName: { type: String, default: "" },
    lName: { type: String, default: "" },
    password: { type: String, required: true },
});

module.exports = userSchema;
