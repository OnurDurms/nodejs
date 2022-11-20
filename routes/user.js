const { userController } = require("../controllers");

module.exports = (router, auth) => {
    router.post("/user/register", async (req, res) => {
        const { name, email, password } = req.body;
        return await userController.registerUser(name, email, password, res);
    });

    router.post("/user/login", async (req, res) => {
        const { email, password } = req.body;
        return await userController.loginUser(email, password, res);
    });

    router.get("/user/:id", auth, async (req, res) => {
        const { id } = req.params;
        let user = await userController.getUserWithId(id);
        return res.status(200).json(user);
    });

    router.get("/user/", auth, async (req, res) => {
        let allUsers = await userController.getAllUsers(req.user);
        return res.status(200).json(allUsers);
    });

    router.post("/user/", auth, async (req, res) => {
        let insertedUser = await userController.saveUser(req.body);
        return res.status(200).json(insertedUser);
    });

    router.put("/user/:id", auth, async (req, res) => {
        const { id } = req.params;
        let user = await userController.updateUser(id, req.body);
        return res.status(200).json(user);
    });

    router.delete("/user/:id", auth, async (req, res) => {
        const { id } = req.params;
        const deletedUser = await userController.deleteUserWithId(id);
        return res.status(200).json(deletedUser);
    });

    router.put("/user/admin/:id", async (req, res) => {
        const { id } = req.params;
        let user = await userController.setAdmin(id);
        return res.status(200).json(user);
    });
    return router;
}