const { taskController } = require("../controllers");
const { check, validationResult } = require("express-validator");

module.exports = (router, auth) => {
    router.get("/task/:id", [
        check("id")
          .isLength({ min: 24 })
          .withMessage("the name must have minimum length of 24")
          .trim()],async (req, res) => {
            const error = validationResult(req).formatWith(({ msg }) => msg);

            const hasError = !error.isEmpty();

            if (hasError) {
                res.status(422).json({ error: error.array() });
            } else {
                const { id } = req.params;
                let task = await taskController.getTaskWithId(id);
                return res.status(200).json(task);
            }
    });

    router.get("/task/", auth, async (req, res) => {
        let allTasks = await taskController.getAllTasks(req.user, req.body);
        return res.status(200).json(allTasks);
    });

    router.post("/task/save", auth, async (req, res) => {
        let insertedTask = await taskController.saveTask(req.body, req.user);
        return res.status(200).json(insertedTask);
    });

    router.put("/task/:id", auth, [
        check("id")
          .isLength({ min: 24 })
          .withMessage("the name must have minimum length of 24")
          .trim()],async (req, res) => {
            const error = validationResult(req).formatWith(({ msg }) => msg);

            const hasError = !error.isEmpty();

            if (hasError) {
                res.status(422).json({ error: error.array() });
            } else {
                const { id } = req.params;
                let task = await taskController.updateTask(id, req.body, req.user);
                return res.status(200).json(task);
            }
    });

    router.delete("/task/:id", auth,[
        check("id")
          .isLength({ min: 24 })
          .withMessage("the name must have minimum length of 24")
          .trim()], async (req, res) => {
            const error = validationResult(req).formatWith(({ msg }) => msg);

            const hasError = !error.isEmpty();

            if (hasError) {
                res.status(422).json({ error: error.array() });
            } else {
                const { id } = req.params;
                req.body.id = id;
                const deletedTask = await taskController.deleteTaskWithId(req.body, req.user);
                return res.status(200).json(deletedTask);
            }
    });
    return router;
}