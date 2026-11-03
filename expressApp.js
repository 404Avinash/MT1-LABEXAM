import express from 'express';

const app = express();
const PORT = 4000;

// Format JSON responses with 2 spaces
app.set('json spaces', 2);

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

// Helper to respond with JSON for API clients or formatted HTML for browser address bar
function sendJsonResponse(req, res, statusCode, data) {
    const isBrowserNavigation = req.headers['sec-fetch-dest'] === 'document' && 
                                req.headers['accept'] && 
                                req.headers['accept'].includes('text/html');

    if (isBrowserNavigation) {
        return res.status(statusCode).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Express API - Port ${PORT}</title>
    <style>
        body { background: #0f172a; color: #f8fafc; font-family: 'JetBrains Mono', 'Courier New', monospace; padding: 25px; margin: 0; }
        .nav-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 12px; font-family: sans-serif; }
        .badge { background: #10b981; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        pre { background: #1e293b; color: #38bdf8; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.6; overflow-x: auto; border: 1px solid #334155; margin: 0; }
        a { color: #38bdf8; text-decoration: none; font-size: 13px; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="nav-bar">
        <div>
            <span class="badge">${statusCode} ${statusCode === 200 ? 'OK' : (statusCode === 201 ? 'Created' : 'Response')}</span>
            <span style="margin-left: 10px; color: #94a3b8; font-size: 13px;">JSON Format &bull; Express.js (Port ${PORT})</span>
        </div>
        <div>
            <a href="http://localhost:3000/home">&larr; Back to Dashboard</a>
        </div>
    </div>
    <pre>${JSON.stringify(data, null, 2)}</pre>
</body>
</html>`);
    }

    res.status(statusCode).json(data);
}

// Root endpoint: API Overview
app.get('/', (req, res) => {
    sendJsonResponse(req, res, 200, {
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
    sendJsonResponse(req, res, 200, tasks);
});

// 2. GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return sendJsonResponse(req, res, 404, {
            message: "Task not found"
        });
    }

    sendJsonResponse(req, res, 200, task);
});

// 3. POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    // Validate required fields
    if (id === undefined || id === null || !taskName || !assignedTo || !status) {
        return sendJsonResponse(req, res, 400, {
            error: "Validation Error",
            message: "Required fields missing: id, taskName, assignedTo, and status are mandatory."
        });
    }

    const numericId = parseInt(id, 10);

    // Check if task with same ID already exists
    const existingTask = tasks.find(t => t.id === numericId);
    if (existingTask) {
        return sendJsonResponse(req, res, 409, {
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

    sendJsonResponse(req, res, 201, {
        message: "Task added successfully",
        task: newTask
    });
});

// 4. PUT /tasks/:id - Update task details
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return sendJsonResponse(req, res, 404, {
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

    sendJsonResponse(req, res, 200, {
        message: "Task updated successfully",
        task: tasks[taskIndex]
    });
});

// 5. DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return sendJsonResponse(req, res, 404, {
            message: "Task not found"
        });
    }

    tasks.splice(taskIndex, 1);

    sendJsonResponse(req, res, 200, {
        message: "Task deleted successfully"
    });
});

// Handle 404 for undefined routes
app.use((req, res) => {
    sendJsonResponse(req, res, 404, {
        message: "Route not found"
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return sendJsonResponse(req, res, 400, {
            error: "Bad Request",
            message: "Invalid JSON format."
        });
    }
    console.error("Server Error:", err);
    sendJsonResponse(req, res, 500, {
        error: "Internal Server Error",
        message: err.message
    });
});

// Start Express Application
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
