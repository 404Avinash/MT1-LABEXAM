import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// In-memory array of employee tasks
const tasks = [
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

// Create HTTP Server
const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Route: GET /
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Welcome - Employee Task Management</title>
                <style>
                    body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f1f5f9; }
                    .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
                    h1 { color: #1e40af; margin-bottom: 12px; }
                    p { color: #475569; line-height: 1.6; }
                    a { display: inline-block; margin-top: 16px; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Welcome to Employee Task Management System</h1>
                    <p>The Node.js HTTP Server is running successfully on port ${PORT}.</p>
                    <a href="/home">Go to Dashboard (/home)</a>
                </div>
            </body>
            </html>
        `);
        return;
    }

    // Route: GET /tasks
    if (pathname === '/tasks' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks, null, 2));
        return;
    }

    // Route: GET /about
    if (pathname === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>About - Employee Task Management</title>
                <style>
                    body { font-family: sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; background: #f8fafc; color: #1e293b; }
                    .card { background: white; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0; }
                    h1 { color: #2563eb; }
                    ul { line-height: 1.8; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>About Employee Task Management System</h1>
                    <p>This application is developed as part of the Full Stack Development - Node.js Lab Examination (MT1-LABEXAM).</p>
                    <h3>Module Information:</h3>
                    <ul>
                        <li><strong>Part A:</strong> Node.js built-in HTTP module, routing, HTTP method handling, static file serving via FS module.</li>
                        <li><strong>Part B:</strong> Express.js REST API with full CRUD operations.</li>
                        <li><strong>Data Storage:</strong> In-memory JavaScript Array.</li>
                    </ul>
                    <p><a href="/home">&larr; Return to Dashboard</a></p>
                </div>
            </body>
            </html>
        `);
        return;
    }

    // Route: GET /home (Static File Serving using FS Module)
    if (pathname === '/home' && method === 'GET') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1><p>Failed to read static file index.html.</p>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
        return;
    }

    // Route: POST /add-task
    if (pathname === '/add-task' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { id, taskName, assignedTo, status, priority } = data;

                // Validate required fields: id, taskName, assignedTo, status
                if (id === undefined || id === null || !taskName || !assignedTo || !status) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        error: "Validation Error",
                        message: "Required fields missing. Must include id, taskName, assignedTo, and status."
                    }));
                    return;
                }

                const newTask = {
                    id: Number(id),
                    taskName: String(taskName),
                    assignedTo: String(assignedTo),
                    status: String(status),
                    priority: priority ? String(priority) : "Medium"
                };

                tasks.push(newTask);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: "Task added successfully",
                    task: newTask
                }, null, 2));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: "Bad Request",
                    message: "Invalid JSON format in request body."
                }));
            }
        });
        return;
    }

    // Invalid Routes: Return 404
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>404 Not Found</title>
            <style>
                body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #fef2f2; }
                .card { background: white; padding: 40px; border-radius: 8px; text-align: center; border: 1px solid #fecaca; }
                h1 { color: #dc2626; }
                p { color: #7f1d1d; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>404 - Route Not Found</h1>
                <p>The requested URL <code>${pathname}</code> was not found on this server.</p>
                <a href="/">Go Home</a>
            </div>
        </body>
        </html>
    `);
});

// Start Server
server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});
