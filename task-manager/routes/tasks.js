const express = require("express");
const router = express.Router();
const app = express();
const { getAllTasks, getTask, createTask, updateTask, editTask, deleteTask } = require("../controllers/task");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask).put(editTask);


module.exports = router;