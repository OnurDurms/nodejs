const {taskController} = require("../controllers");
const auth = require("../middleware/auth");

module.exports = (router) => {
    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        let task = await taskController.getTaskWithId(id);
        return res.status(200).json(task);
    });
    
    router.get("/all", auth, async (req, res) => {
        let allTasks = await taskController.getAllTasks(req.user,req.body);
        return res.status(200).json(allTasks);
    });
    
    router.post("/", auth, async (req, res) => {
        let insertedTask = await taskController.saveTask(req.body,req.user);
        return res.status(200).json(insertedTask);
    });
    
    router.put("/:id",auth, async (req, res) => {
        const { id } = req.params;
        let task = await taskController.updateTask(id,req.body,req.user);
        return res.status(200).json(task);
    });
    
    router.delete("/:id",auth, async (req, res) => {
        const { id } = req.params;
        req.body.id = id;
        const deletedTask = await taskController.deleteTaskWithId(req.body,req.user);
        return res.status(200).json(deletedTask);
    });
    return router;
}