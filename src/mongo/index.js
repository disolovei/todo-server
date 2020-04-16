const mongoose = require("mongoose");
const userSchema = require("./schema/user");
const taskSchema = require("./schema/task");
const tokenSchema = require("./schema/token");

exports.userModel = mongoose.model("User", userSchema);
exports.taskModel = mongoose.model("Task", taskSchema);
exports.tokenModel = mongoose.model("Token", tokenSchema);
