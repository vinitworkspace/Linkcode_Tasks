const express = require('express');
const sql = require('./db');

const app = express();
app.use(express.json());

const getTasks = async () => {
    const tasks = await sql`SELECT * FROM tasks ORDER BY id ASC`;
    return tasks;
};

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong', error: err.message || err });
    }
});

app.post('/task/:id', async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { newTask } = req.body;

        if (!newTask) {
            return res.status(400).json({ msg: 'Please provide a task in newTask' });
        }

        await sql`INSERT INTO tasks (id, task_name) VALUES (${taskId}, ${newTask})`;
        res.status(201).json({ msg: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', error: error.message || error });
    }
});

app.delete('/task/:id', async (req, res) => {
    try {
        const { id: taskId } = req.params;
        await sql`DELETE FROM tasks WHERE id = ${taskId}`;
        res.status(200).json({ msg: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong', error: err.message || err });
    }
});

app.put('/task/:id', async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { newTaskName } = req.body;

        if (!newTaskName) {
            return res.status(400).json({ msg: 'Please provide the updated task name in newTaskName' });
        }

        await sql`UPDATE tasks SET task_name = ${newTaskName} WHERE id = ${taskId}`;
        res.status(200).json({ msg: 'Task updated successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong', error: err.message || err });
    }
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});