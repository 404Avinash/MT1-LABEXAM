# Employee Task Management Web Application (MT1-LABEXAM)

> **Subject**: Full Stack Development &ndash; Node.js Lab Examination  
> **Technology**: Node.js (ES Modules), HTTP Module, FS Module, Express.js  
> **Database**: Not Required (In-Memory JavaScript Array)  

---

## Project Structure

```
MT1-LABEXAM/
├── package.json          # Node.js project configuration (ES Modules, dependencies)
├── .gitignore            # Git ignore file
├── httpServer.js         # Part A: Pure Node.js HTTP server & FS module (port 3000)
├── expressApp.js         # Part B: Express.js REST API application (port 4000)
├── public/
│   └── index.html        # Static HTML dashboard served via FS module
└── screenshots/          # Outputs for examination submission
    ├── 01_http_server_terminal.png
    ├── 02_http_home_static_fs.png
    ├── 03_http_root_welcome.png
    ├── 04_http_about.png
    ├── 05_express_server_terminal.png
    ├── 06_echoapi_get_all_tasks.png
    ├── 07_echoapi_get_task_by_id.png
    ├── 08_echoapi_post_new_task.png
    ├── 09_echoapi_put_update_task.png
    ├── 10_echoapi_delete_task.png
    └── 11_github_commit_history.png
```

---

## Features

### Part A: Pure Node.js HTTP & FS Modules (`httpServer.js` &bull; Port 3000)
- Built without external frameworks using Node.js standard library (`http`, `fs`).
- **`GET /`**: Welcome message in HTML format.
- **`GET /tasks`**: In-memory employee task list in JSON format.
- **`GET /about`**: Application information.
- **`GET /home`**: Serves `public/index.html` static file asynchronously using the `fs` module.
- **`POST /add-task`**: Accepts JSON request body, validates mandatory fields (`id`, `taskName`, `assignedTo`, `status`), and persists task to the in-memory array.
- **Error Handling**: Status 404 for invalid routes; status 400 for bad JSON or validation errors.

### Part B: Express.js REST API (`expressApp.js` &bull; Port 4000)
- Configured with `express.json()` middleware.
- Full CRUD API implementation:
  - **`GET /tasks`**: Retrieve all tasks (Status 200).
  - **`GET /tasks/:id`**: Retrieve specific task by ID (Status 200, or 404 if not found).
  - **`POST /tasks`**: Create new task (Status 201 Created).
  - **`PUT /tasks/:id`**: Update existing task details (Status 200 OK, or 404 if not found).
  - **`DELETE /tasks/:id`**: Remove task by ID (Status 200 OK, or 404 if not found).

---

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Part A (HTTP & FS Server - Port 3000)
```bash
node httpServer.js
# Or using npm script:
npm run start:http
```

### 3. Start Part B (Express.js REST API - Port 4000)
```bash
node expressApp.js
# Or using npm script:
npm run start:express
```

---

## API Testing Reference

### Sample POST Request (`POST http://localhost:4000/tasks`)
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```

### Sample PUT Request (`PUT http://localhost:4000/tasks/1`)
```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```

### Sample DELETE Request (`DELETE http://localhost:4000/tasks/1`)
Deletes task with ID 1 and returns success message.
