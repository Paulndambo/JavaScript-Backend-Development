const Task = require("../models/task"); 
const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomError } = require("../middleware/custom-errors");

/*
const getAllTasks = async (req, res) => {
    try {
        let tasks = await Task.find({})
        //res.status(200).json({tasks})
        //res.status(200).json({tasks, amount: tasks.length})
        res.status(200).json({success: true, data: {tasks, nbHits: tasks.length}})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
*/

const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks});
})

/*
const getTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await Task.findOne({_id: taskId})
        
        if (!task) {
            return res.status(404).json({msg: `Task with id: ${taskId} not found`})
        }
        
        res.status(200).json({ task })
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
*/

const getTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id
    const task = await Task.findOne({_id: taskId})
        
    if (!task) {
        return next(`No task with id: ${taskId}`, 404)
        //return res.status(404).json({msg: `Task with id: ${taskId} not found`})
    }
    res.status(200).json({ task })
})


/*
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task});
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
*/

const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task});
})


/*
const updateTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({msg: `Task with id: ${taskId} not found`})
        }

        res.status(200).json({task})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
*/

const updateTask = asyncWrapper (async (req, res) => {
    const {id:taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return next(`No task with id: ${taskId}`, 404)
        //return res.status(404).json({msg: `Task with id: ${taskId} not found`})
    }

    res.status(200).json({task})
})


/*
const editTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({msg: `Task with id: ${taskId} not found`})
        }

        res.status(200).json({task})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
*/

const editTask = asyncWrapper(async (req, res) => {
    const {id:taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return next(`No task with id: ${taskId}`, 404)
        //return res.status(404).json({msg: `Task with id: ${taskId} not found`})
    }

    res.status(200).json({task})

})


/*
const deleteTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndDelete({_id:taskId});

        if (!task) {
            return res.status(404).json({msg: `Task with id: ${taskId} not found`})
        }

        res.status(200).json({task})

    } catch (error) {
        res.status(500).json({msg: error})
    }
}
*/

const deleteTask = asyncWrapper (async (req, res) => {
    const {id:taskId} = req.params;
    const task = await Task.findOneAndDelete({_id:taskId});

    if (!task) {
        return next(`No task with id: ${taskId}`, 404)
        //return res.status(404).json({msg: `Task with id: ${taskId} not found`})
    }

    res.status(200).json({task})

})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    editTask,
    deleteTask,
}