import express from 'express';

const app = express();
const PORT = 4000;

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

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
    if (req.accepts('html') && !req.xhr && req.headers['user-agent'] && !req.headers['user-agent'].includes('EchoAPI') && !req.headers['user-agent'].includes('curl')) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Express REST API - Employee Task Management</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px 20px; }
                    .card { background: #1e293b; max-width: 750px; margin: 0 auto; padding: 30px; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
                    h1 { color: #38bdf8; margin-bottom: 8px; font-size: 1.6rem; }
                    p { color: #94a3b8; margin-bottom: 24px; font-size: 0.95rem; }
                    .endpoint-list { list-style: none; padding: 0; }
                    .endpoint-item { background: #0f172a; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #1e293b; }
                    .badge { font-weight: bold; font-size: 0.78rem; padding: 4px 10px; border-radius: 4px; }
                    .b-get { background: rgba(14, 165, 233, 0.2); color: #38bdf8; }
                    .b-post { background: rgba(16, 185, 129, 0.2); color: #34d399; }
                    .b-put { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
                    .b-del { background: rgba(239, 68, 68, 0.2); color: #f87171; }
                    .url { font-family: monospace; color: #f1f5f9; font-size: 0.92rem; }
                    a { color: #38bdf8; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Employee Task Management REST API</h1>
                    <p>Express.js Server is running on <strong>port ${PORT}</strong>. Ready for API testing via EchoAPI or curl.</p>
                    <ul class="endpoint-list">
                        <li class="endpoint-item">
                            <span class="badge b-get">GET</span>
                            <span class="url"><a href="/tasks" target="_blank">/tasks</a> &ndash; Retrieve all tasks</span>
                            <a href="/tasks" target="_blank">&rarr;</a>
                        </li>
                        <li class="endpoint-item">
                            <span class="badge b-get">GET</span>
                            <span class="url"><a href="/tasks/1" target="_blank">/tasks/1</a> &ndash; Retrieve task by ID 1</span>
                            <a href="/tasks/1" target="_blank">&rarr;</a>
                        </li>
                        <li class="endpoint-item">
                            <span class="badge b-post">POST</span>
                            <span class="url">/tasks &ndash; Add a new task (JSON Body)</span>
                            <span style="color: #64748b; font-size: 0.85rem;">EchoAPI / POST</span>
                        </li>
                        <li class="endpoint-item">
                            <span class="badge b-put">PUT</span>
                            <span class="url">/tasks/:id &ndash; Update task details (JSON Body)</span>
                            <span style="color: #64748b; font-size: 0.85rem;">EchoAPI / PUT</span>
                        </li>
                        <li class="endpoint-item">
                            <span class="badge b-del">DELETE</span>
                            <span class="url">/tasks/:id &ndash; Delete a task</span>
                            <span style="color: #64748b; font-size: 0.85rem;">EchoAPI / DELETE</span>
                        </li>
                    </ul>
                </div>
            </body>
            </html>
        `);
    }

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
