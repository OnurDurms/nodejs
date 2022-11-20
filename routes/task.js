const { taskController } = require("../controllers");

module.exports = (router, auth) => {
    router.get("/task/:id", async (req, res) => {
        const { id } = req.params;
        let task = await taskController.getTaskWithId(id);
        return res.status(200).json(task);
    });

    router.get("/task/", auth, async (req, res) => {
        let allTasks = await taskController.getAllTasks(req.user, req.body);
        return res.status(200).json(allTasks);
    });

    router.post("/task/save", auth, async (req, res) => {
        let insertedTask = await taskController.saveTask(req.body, req.user);
        return res.status(200).json(insertedTask);
    });

    router.put("/task/:id", auth, async (req, res) => {
        const { id } = req.params;
        let task = await taskController.updateTask(id, req.body, req.user);
        return res.status(200).json(task);
    });

    router.delete("/task/:id", auth, async (req, res) => {
        const { id } = req.params;
        req.body.id = id;
        const deletedTask = await taskController.deleteTaskWithId(req.body, req.user);
        return res.status(200).json(deletedTask);
    });
    return router;
}