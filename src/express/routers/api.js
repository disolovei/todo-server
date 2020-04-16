const express = require("express");
const { notAllowedMethod, isTokenValid, addCORSHeader } = require("../helpers");
const {
    getTask,
    getTasks,
    saveTask,
    deleteTask,
    deleteTasks,
    editTask,
    resolveTask,
} = require("../../mongo/models/task");
const { login, register, deleteUsers } = require("../../mongo/models/user");
const cors = require("cors");

const apiRouter = express.Router();
const taskRouter = express.Router();
const profileRouter = express.Router();

const userRouterPlaceholder = (req, res, next) => {
    res.json({
        message: "OK",
    });
};

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

// apiRouter.use(addCORSHeader);
apiRouter.use(cors({
    credentials : true, 
    origin : "*",
}));

taskRouter.param("acessToken", isTokenValid);
taskRouter.get("/one/:id", getTask);
taskRouter.get("/many", getTasks);
taskRouter.post("/", saveTask);
taskRouter.put("/resolve/:id", resolveTask);
taskRouter.put("/edit", editTask);
taskRouter.delete("/one/:id", deleteTask);
taskRouter.delete("/all", deleteTasks);

apiRouter.use("/tasks", taskRouter);

profileRouter.post("/register", register);
profileRouter.post("/login", login);
profileRouter.put("/update/:id", userRouterPlaceholder);

if ("production" !== process.env.NODE_ENV) {
    profileRouter.delete("/", deleteUsers);
}

apiRouter.use("/profile", profileRouter);

apiRouter
    .route("/")
    .get((req, res, next) => {
        res.status(200).json({
            status: "Work!",
        });
    })
    .all(notAllowedMethod);

apiRouter.all("*", notAllowedMethod);

module.exports = apiRouter;
