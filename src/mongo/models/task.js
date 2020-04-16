const { taskModel } = require("../index");

exports.saveTask = async (req, res) => {
    const { title, description } = req.body;

    new taskModel({
        title,
        description,
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
                status: "OK",
                message: error.message,
            });
        });
};

exports.resolveTask = async (req, res) => {
    const { id } = req.params;

    taskModel.findOneAndUpdate({ _id: id }, { resolved: true }, { rawResult: true, useFindAndModify: false })
        .then(result => {
            if ( ! result.value ) {
                res.json({});
            } else {
                res.json(result.value);
            }
        })
        .catch(err => {
            res.status(400).json({
                status: "error",
                errorCode: 3,
                message: err.message,
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
    taskModel
        .find({}, [], {
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
