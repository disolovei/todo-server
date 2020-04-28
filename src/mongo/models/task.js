const { taskModel } = require("../index");
const { Schema } = require("mongoose");

taskModel.update(
    {}, 
        {
            $set: {
                user_id: Schema.ObjectId
            }
        },
        {
            upsert:false,
            multi:true
        }
);

exports.saveTask = async (req, res) => {
    const { title, description, userID } = req.body;

    new taskModel({
        title,
        description,
        user_id: userID,
    })
        .save()
        .then(() => taskModel.findOne({}, [], {
            sort: {
                _id: -1,
            },
        }))
        .then(result => {
            res.status(200).json({
                status: "OK",
                message: "Save task success!",
                addedItem: { ...result._doc },
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: "error",
                message: error.message,
            });
        });
};

exports.resolveTask = async (req, res) => {
    const { id } = req.params;

    taskModel.findOne({ _id: id })
        .then(result => taskModel.updateOne({_id: id}, {resolved : !result.resolved}))
        .then(result => {
            res.json({
                status: "OK",
                data: {
                    result
                }
            });
        })
        .catch(error => {
            res.status(400).json({
                status: "error",
                errorCode: 3,
                message: error.message,
            });
        });
};

exports.deleteTasks = async (req, res) => {
    taskModel.deleteMany({})
        .then(() => {
            res.status(200).json({
                status: "OK",
                message: "Delete tasks success!",
            });
        })
        .catch(error => {
            res.status(400).json({
                status: "error",
                errorCode: 5,
                message: error.message,
            });
        });
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    taskModel.findByIdAndDelete({ _id: id })
        .then(() => {
            res.status(200).json({
                status: "OK",
                message: "Delete tasks success!",
            });
        })
        .catch(error => {
            res.status(400).json({
                status: "error",
                errorCode: 6,
                message:error.message,
            });
        });
};

exports.editTask = async (req, res) => {
    const { id } = req.params;

    if ( id ) {
        res.json({
            status: "OK",
            message: "ID param is OK!"
        });
    } else {
        res.status(400).json({
            status: "error",
            errorCode: 8,
            message: "Missing id param!"
        });
    }
};

exports.getTasks = async (req, res) => {
    const { userID } = req.query;
    console.log(userID);
    taskModel
        .find({
            user_id: userID,
        }, [], {
            sort: {
                _id: -1,
            },
        })
        .then(result => {
            res.status(200).json({
                status: "OK",
                data: result,
            });
        })
        .catch(err => {
            res.status(400).json({
                status: "error",
                errorCode: 7,
                message: err.message,
            });
        });
};

exports.getTask = async (req, res) => {
    const { id } = req.params;

    taskModel.findById(id)
        .then(result => {
            if ( result ) {
                res.json({
                    status: "OK",
                    data: result,
                })
            } else {
                res.json({
                    status: "OK",
                    data: {},
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                status: "error",
                error: 2,
                message: err.message,
            });
        });
};
