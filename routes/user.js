const {userController} = require("../controllers");

module.exports = (router) => {
    router.post("/register", async (req, res) => {
        const { name, email, password } = req.body;
        return await userController.registerUser(name, email,password,res);
    });
    
    router.post("/login", async (req, res) => {
        const { email, password } = req.body;
        return await userController.loginUser(email,password,res);
    });
    
    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        let user = await userController.getUserWithId(id);
        return res.status(200).json(user);
    });
    
    router.get("/all", async (req, res) => {
        let allUsers = await userController.getAllUsers(req.body);
        return res.status(200).json(allUsers);
    });
    
    router.post("/", async (req, res) => {
        let insertedUser = await userController.saveUser(req.body);
        return res.status(200).json(insertedUser);
    });
    
    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        let user = await userController.updateUser(id,req.body);
        return res.status(200).json(user);
    });
    
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json(deletedUser);
    });
    
    router.put("/admin/:id", async (req, res) => {
        const { id } = req.params;
        let user = await userController.setAdmin(id);
        return res.status(200).json(user);
    });
    return router;
}