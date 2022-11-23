const { userController } = require("../controllers");
const { check, validationResult } = require("express-validator");

module.exports = (router, auth) => {
    router.post("/user/register",  [
        check("name")
          .isLength({ min: 3 })
          .withMessage("the name must have minimum length of 3")
          .trim(),
    
        check("email")
          .isEmail()
          .withMessage("invalid email address")
          .normalizeEmail(),
    
        check("password")
          .isLength({ min: 8, max: 15 })
          .withMessage("your password should have min and max length between 8-15")
          .matches(/\d/)
          .withMessage("your password should have at least one number")
          .matches(/[!@#$%^&*(),.?":{}|<>]/)
          .withMessage("your password should have at least one sepcial character"),
      ],async (req, res) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            res.status(422).json({ error: error.array() });
        } else {
            const { name, email, password } = req.body;
            return await userController.registerUser(name, email, password, res);
        }
    });

    router.post("/user/login", [
    check("email")
        .isEmail()
        .withMessage("invalid email address")
        .normalizeEmail(),

    check("password")
        .isLength({ min: 8, max: 15 })
        .withMessage("your password should have min and max length between 8-15")
        .matches(/\d/)
        .withMessage("your password should have at least one number"),
    ],async (req, res) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            res.status(422).json({ error: error.array() });
        } else {
            const { email, password } = req.body;
            return await userController.loginUser(email, password, res);
        }
    });

    router.get("/user/:id", auth,[
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
                let user = await userController.getUserWithId(id);
                return res.status(200).json(user);
            }
    });

    router.get("/user/", auth, async (req, res) => {
        let allUsers = await userController.getAllUsers(req.user);
        return res.status(200).json(allUsers);
    });

    router.post("/user/", auth, async (req, res) => {
        let insertedUser = await userController.saveUser(req.body);
        return res.status(200).json(insertedUser);
    });

    router.put("/user/:id", auth,[
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
                let user = await userController.updateUser(id, req.body);
                return res.status(200).json(user);
            }
    });

    router.delete("/user/:id", auth,[
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
                const deletedUser = await userController.deleteUserWithId(id);
                return res.status(200).json(deletedUser);
            }
    });

    router.put("/user/admin/:id",[
        check("id")
          .isLength({ min: 24 })
          .withMessage("the name must have minimum length of 3")
          .trim()], async (req, res) => {
            const error = validationResult(req).formatWith(({ msg }) => msg);

            const hasError = !error.isEmpty();

            if (hasError) {
                res.status(422).json({ error: error.array() });
            } else {
                const { id } = req.params;
                let user = await userController.setAdmin(id);
                return res.status(200).json(user);
            }
    });
    return router;
}