import express from 'express';

const app = express();
const PORT = 4000;

// Configure JSON parsing middleware
app.use(express.json());

// Initialize array with sample employee task records
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Design Database Schema",
        assignedTo: "Priya Patel",
        status: "In Progress",
        priority: "High"
    },
    {
        id: 3,
        taskName: "Implement Authentication",
        assignedTo: "Amit Kumar",
        status: "Pending",
        priority: "Medium"
    }
];

// Root endpoint: API Overview
app.get('/', (req, res) => {
    res.json({
        message: "Employee Task Management REST API is running",
        version: "1.0.0",
        endpoints: {
            "GET /tasks": "Retrieve all employee tasks",
            "GET /tasks/:id": "Retrieve a task by ID",
            "POST /tasks": "Add a new task",
            "PUT /tasks/:id": "Update task details",
            "DELETE /tasks/:id": "Delete a task"
        }
    });
});

// 1. GET /tasks - Retrieve all employee tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// 2. GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// 3. POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    // Validate required fields
    if (id === undefined || id === null || !taskName || !assignedTo || !status) {
        return res.status(400).json({
            error: "Validation Error",
            message: "Required fields missing: id, taskName, assignedTo, and status are mandatory."
        });
    }

    const numericId = parseInt(id, 10);

    // Check if task with same ID already exists
    const existingTask = tasks.find(t => t.id === numericId);
    if (existingTask) {
        return res.status(409).json({
            error: "Conflict",
            message: `Task with id ${numericId} already exists.`
        });
    }

    const newTask = {
        id: numericId,
        taskName: String(taskName),
        assignedTo: String(assignedTo),
        status: String(status),
        priority: priority ? String(priority) : "Medium"
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// 4. PUT /tasks/:id - Update task details
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    // Update existing task details
    const existing = tasks[taskIndex];
    tasks[taskIndex] = {
        id: existing.id,
        taskName: taskName !== undefined ? String(taskName) : existing.taskName,
        assignedTo: assignedTo !== undefined ? String(assignedTo) : existing.assignedTo,
        status: status !== undefined ? String(status) : existing.status,
        priority: priority !== undefined ? String(priority) : existing.priority
    };

    res.status(200).json({
        message: "Task updated successfully",
        task: tasks[taskIndex]
    });
});

// 5. DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Task deleted successfully"
    });
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Invalid JSON format."
        });
    }
    console.error("Server Error:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message
    });
});

// Start Express Application
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
