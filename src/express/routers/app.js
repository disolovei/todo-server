const { Router } = require("express");
const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1>App</h1>");
});

module.exports = router;