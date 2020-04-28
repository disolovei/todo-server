const crypto = require("crypto");
const { userModel } = require("../");

const hashPassword = (passwordString) =>
    crypto.createHash("md5").update(passwordString).digest("hex");

const emailValidator = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

exports.register = (request, response) => {
    const { login, email, password } = request.body;

    if (!login || !password || !email) {
        return response.status(400).json({
            status: "error",
            errorCode: 11,
            message: "Empty required params!",
        });
    }

    if (!emailValidator(email)) {
        return response.status(400).json({
            status: "error",
            errorCode: 12,
            message: "Please enter a valid email!",
        });
    }

    new userModel({
        login,
        email,
        password: hashPassword(password),
    })
        .save()
        .then((res) => {
            response.status(200).json({
                status: "OK",
                data: res,
            });
        })
        .catch((err) => {
            response.status(400).json({
                status: "error",
                errorCode: 10,
                message: err.message,
            });
        });
};

exports.login = (request, response) => {
    const { login, password } = request.body;

    if (!login || !password) {
        return response.status(400).json({
            status: "error",
            errorCode: 11,
            message: "Empty required params!",
        });
    }

    userModel
        .findOne({
            $or: [{ login: login }, { email: login }],
            password: hashPassword(password),
        })
        .then((result) => {
            if (!result) {
                throw new Error("user not found!");
            }

            response.status(200).json({
                status: "OK",
                message: "Maybe need to set cookies!",
                data: {
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            response.status(400).json({
                status: "error",
                errorCode: 10,
                message: err.message,
            });
        });
};

exports.deleteUsers = (request, response) => {
    userModel
        .deleteMany({})
        .then((res) => {
            response.status(200).json({
                status: "OK",
                message: "All clean captain!",
            });
        })
        .catch((err) => {
            response.status(400).json({
                status: "error",
                errorCode: "_",
                message: err.message,
            });
        });
};
