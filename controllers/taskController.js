const { Task } = require("../models/tasks");
const { User } = require("../models/users");

const getTaskWithId = async (id) => {
    const task = await Task.findOne({ _id: id });
    return task;
}

const getAllTasks = async (user, body) => {
    if (user.user_id && body.user_id) {
        const updatedUser = await User.findOne({ _id: user.user_id });
        if (updatedUser.isAdmin) {
            const allTasks = await Task.find({ user_id: body.user_id, status: 1 });
            return allTasks;
        } else {
            const allTasks = await Task.find({ user_id: user.user_id, status: 1 });
            return allTasks;
        }
    } else {
        return [];
    }
}

const saveTask = async (body, user) => {
    if (user.user_id && body.user_id) {
        const updatedUser = await User.findById(user.user_id);
        if (updatedUser.isAdmin) {
            const newTask = new Task({ title: body.title, description: body.description, user_id: body.user_id, deadline: body.deadline });
            const insertedTask = await newTask.save();
            return insertedTask;
        } else {
            const newTask = new Task({ title: body.title, description: body.description, user_id: user.user_id, deadline: body.deadline });
            const insertedTask = await newTask.save();
            return insertedTask;
        }
    } else {
        return [];
    }
}

const updateTask = async (id, body, user) => {
    if (user.user_id && body.user_id) {
        const updatedUser = await User.findById(user.user_id);
        if (updatedUser.isAdmin) {
            await Task.updateOne({ _id: id }, { title: body.title, description: body.description, updated_at: Date.now(), user_id: body.user_id, deadline: body.deadline });
            const updatedTask = await Task.findById(id);
            return updatedTask;
        } else {
            await Task.updateOne({ _id: id }, { title: body.title, description: body.description, updated_at: Date.now(), user_id: user.user_id, deadline: body.deadline });
            const updatedTask = await Task.findById(id);
            return updatedTask;
        }
    } else {
        return [];
    }
}

const deleteTaskWithId = async (body, user) => {
    if (user.user_id && body.id) {
        const updatedUser = await User.findById(user.user_id);
        if (updatedUser.isAdmin) {
            const task = await Task.updateOne({ id: body.id }, { status: 2 });
            return task;
        } else {
            const task = await Task.findOne({ id: body.id, user_id: body.user_id });
            if (task.id) {
                const task = await Task.updateOne({ id }, { status: 2 });
                return task;
            }
        }
    } else {
        return [];
    }
}

module.exports = {
    getTaskWithId,
    getAllTasks,
    saveTask,
    updateTask,
    deleteTaskWithId
}