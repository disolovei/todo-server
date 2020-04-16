const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: Schema.ObjectId,
    title: { type: String, required: true },
    description: String,
    resolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() }
});

module.exports = taskSchema;
