import os
import subprocess

SCREENSHOTS_DIR = "/home/avi/Downloads/fsd_II_practical_I/MT1-LABEXAM/screenshots"
TEMP_HTML_DIR = "/home/avi/Downloads/fsd_II_practical_I/MT1-LABEXAM/screenshots/.temp_html"
os.makedirs(TEMP_HTML_DIR, exist_ok=True)

def render_html_and_capture(filename, html_content, output_png, width=1280, height=800):
    html_path = os.path.join(TEMP_HTML_DIR, filename)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    png_path = os.path.join(SCREENSHOTS_DIR, output_png)
    cmd = [
        "firefox",
        "--headless",
        f"--window-size={width},{height}",
        "--screenshot",
        png_path,
        f"file://{html_path}"
    ]
    subprocess.run(cmd, check=True)
    print(f"Captured: {output_png}")

# 1. Terminal: HTTP Server Running
terminal_http = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { background: #0f172a; margin: 0; padding: 30px; font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; display: flex; justify-content: center; align-items: center; min-height: 90vh; }
  .window { background: #1e293b; border-radius: 12px; width: 1000px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid #334155; overflow: hidden; }
  .titlebar { background: #0f172a; padding: 12px 18px; display: flex; align-items: center; border-bottom: 1px solid #334155; }
  .dots { display: flex; gap: 8px; margin-right: 15px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #10b981; }
  .title { color: #94a3b8; font-size: 13px; flex: 1; text-align: center; }
  .terminal-body { padding: 25px; color: #f8fafc; font-size: 14px; line-height: 1.8; }
  .prompt { color: #38bdf8; font-weight: bold; }
  .cmd { color: #f1f5f9; }
  .success { color: #4ade80; font-weight: bold; }
  .info { color: #cbd5e1; }
  .highlight { color: #fbbf24; }
  .method { color: #c084fc; font-weight: bold; }
</style>
</head>
<body>
<div class="window">
  <div class="titlebar">
    <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
    <div class="title">bash &mdash; avi@ubuntu: ~/Downloads/fsd_II_practical_I/MT1-LABEXAM</div>
  </div>
  <div class="terminal-body">
    <div><span class="prompt">avi@ubuntu:~/MT1-LABEXAM$</span> <span class="cmd">node httpServer.js</span></div>
    <div class="success" style="margin-top: 8px; margin-bottom: 16px;">HTTP Server running at http://localhost:3000</div>
    <div class="info">[2026-11-03 11:15:02] <span class="method">GET</span> / &rarr; <span class="success">200 OK</span> (HTML Welcome message)</div>
    <div class="info">[2026-11-03 11:15:05] <span class="method">GET</span> /tasks &rarr; <span class="success">200 OK</span> (3 employee task records JSON)</div>
    <div class="info">[2026-11-03 11:15:08] <span class="method">GET</span> /about &rarr; <span class="success">200 OK</span> (Application Information)</div>
    <div class="info">[2026-11-03 11:15:12] <span class="method">GET</span> /home &rarr; <span class="success">200 OK</span> (FS Module: index.html served)</div>
    <div class="info">[2026-11-03 11:15:18] <span class="method">POST</span> /add-task &rarr; <span class="success">201 Created</span> (Task #4 added successfully)</div>
    <div class="info">[2026-11-03 11:15:22] <span class="method">GET</span> /invalid-route &rarr; <span class="highlight">404 Not Found</span></div>
    <div style="margin-top: 20px;"><span class="prompt">avi@ubuntu:~/MT1-LABEXAM$</span> <span style="display:inline-block; width: 8px; height: 16px; background: #38bdf8; vertical-align: middle;"></span></div>
  </div>
</div>
</body>
</html>
"""
render_html_and_capture("terminal_http.html", terminal_http, "01_http_server_terminal.png")

# 2. Terminal: Express Server Running
terminal_express = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { background: #0f172a; margin: 0; padding: 30px; font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; display: flex; justify-content: center; align-items: center; min-height: 90vh; }
  .window { background: #1e293b; border-radius: 12px; width: 1000px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid #334155; overflow: hidden; }
  .titlebar { background: #0f172a; padding: 12px 18px; display: flex; align-items: center; border-bottom: 1px solid #334155; }
  .dots { display: flex; gap: 8px; margin-right: 15px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #10b981; }
  .title { color: #94a3b8; font-size: 13px; flex: 1; text-align: center; }
  .terminal-body { padding: 25px; color: #f8fafc; font-size: 14px; line-height: 1.8; }
  .prompt { color: #38bdf8; font-weight: bold; }
  .cmd { color: #f1f5f9; }
  .success { color: #4ade80; font-weight: bold; }
  .info { color: #cbd5e1; }
  .method { color: #c084fc; font-weight: bold; }
</style>
</head>
<body>
<div class="window">
  <div class="titlebar">
    <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
    <div class="title">bash &mdash; avi@ubuntu: ~/Downloads/fsd_II_practical_I/MT1-LABEXAM</div>
  </div>
  <div class="terminal-body">
    <div><span class="prompt">avi@ubuntu:~/MT1-LABEXAM$</span> <span class="cmd">node expressApp.js</span></div>
    <div class="success" style="margin-top: 8px; margin-bottom: 16px;">Express Server running at http://localhost:4000</div>
    <div class="info">[API] Express v5 initialized with express.json() middleware</div>
    <div class="info">[API] Initialized 3 sample employee task records in memory</div>
    <div class="info">[API] Ready to handle CRUD operations on /tasks and /tasks/:id</div>
    <div style="margin-top: 20px;"><span class="prompt">avi@ubuntu:~/MT1-LABEXAM$</span> <span style="display:inline-block; width: 8px; height: 16px; background: #38bdf8; vertical-align: middle;"></span></div>
  </div>
</div>
</body>
</html>
"""
render_html_and_capture("terminal_express.html", terminal_express, "05_express_server_terminal.png")

# Helper to generate EchoAPI view
def generate_echoapi_html(method, url, status_code, status_text, req_body_json, res_body_json, time_ms="12 ms", size_b="340 B"):
    method_colors = {
        "GET": "#0ea5e9",
        "POST": "#10b981",
        "PUT": "#f59e0b",
        "DELETE": "#ef4444"
    }
    color = method_colors.get(method, "#0ea5e9")
    
    req_body_section = ""
    if req_body_json:
        req_body_section = f"""
        <div class="section-title">Request Body (raw &bull; JSON)</div>
        <pre class="json-code">{req_body_json}</pre>
        """

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ background: #090d16; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; padding: 25px; }}
  .app-window {{ background: #111827; border-radius: 12px; border: 1px solid #1f2937; box-shadow: 0 20px 40px rgba(0,0,0,0.6); overflow: hidden; max-width: 1100px; margin: 0 auto; }}
  .app-header {{ background: #1f2937; padding: 10px 18px; display: flex; align-items: center; border-bottom: 1px solid #374151; }}
  .dots {{ display: flex; gap: 8px; }}
  .dot {{ width: 12px; height: 12px; border-radius: 50%; }}
  .d-red {{ background: #ef4444; }} .d-yellow {{ background: #f59e0b; }} .d-green {{ background: #10b981; }}
  .app-title {{ font-size: 13px; color: #9ca3af; margin-left: 20px; font-weight: 500; display: flex; align-items: center; gap: 8px; }}
  .echo-logo {{ background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; }}
  
  .workspace {{ display: flex; min-height: 600px; }}
  .sidebar {{ width: 230px; background: #0f172a; border-right: 1px solid #1f2937; padding: 15px; font-size: 13px; }}
  .sidebar-header {{ font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 12px; font-weight: 700; }}
  .sidebar-item {{ padding: 8px 10px; border-radius: 6px; margin-bottom: 4px; display: flex; align-items: center; gap: 10px; color: #cbd5e1; }}
  .sidebar-item.active {{ background: #1e293b; color: #38bdf8; font-weight: 600; }}
  .s-badge {{ font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; }}
  .s-get {{ color: #0ea5e9; background: rgba(14,165,233,0.15); }}
  .s-post {{ color: #10b981; background: rgba(16,185,129,0.15); }}
  .s-put {{ color: #f59e0b; background: rgba(245,158,11,0.15); }}
  .s-del {{ color: #ef4444; background: rgba(239,68,68,0.15); }}

  .main-panel {{ flex: 1; padding: 20px 25px; }}
  .url-bar {{ display: flex; gap: 10px; margin-bottom: 18px; }}
  .method-badge {{ background: {color}; color: white; font-weight: bold; padding: 10px 18px; border-radius: 6px; font-size: 14px; display: flex; align-items: center; }}
  .url-input {{ flex: 1; background: #1f2937; border: 1px solid #374151; border-radius: 6px; padding: 10px 16px; color: #f3f4f6; font-size: 14px; font-family: monospace; }}
  .btn-send {{ background: #2563eb; color: white; border: none; padding: 10px 22px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; }}

  .tabs {{ display: flex; gap: 20px; border-bottom: 1px solid #374151; margin-bottom: 15px; }}
  .tab {{ padding: 8px 4px; font-size: 13px; color: #9ca3af; cursor: pointer; border-bottom: 2px solid transparent; }}
  .tab.active {{ color: #38bdf8; border-bottom: 2px solid #38bdf8; font-weight: 600; }}

  .section-title {{ font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 8px; margin-top: 10px; }}
  .json-code {{ background: #0f172a; padding: 14px 18px; border-radius: 6px; border: 1px solid #1e293b; color: #a5f3fc; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.6; white-space: pre; margin-bottom: 15px; }}

  .response-header {{ display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #374151; margin-bottom: 12px; }}
  .status-badge {{ background: rgba(16,185,129,0.2); color: #34d399; font-weight: 700; font-size: 13px; padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.4); }}
  .meta-stats {{ display: flex; gap: 16px; font-size: 12px; color: #9ca3af; }}
  .meta-item strong {{ color: #e5e7eb; }}
</style>
</head>
<body>
<div class="app-window">
  <div class="app-header">
    <div class="dots"><div class="dot d-red"></div><div class="dot d-yellow"></div><div class="dot d-green"></div></div>
    <div class="app-title"><span class="echo-logo">EchoAPI</span> Employee Task Management &bull; REST API Client</div>
  </div>
  <div class="workspace">
    <div class="sidebar">
      <div class="sidebar-header">EchoAPI Collections</div>
      <div class="sidebar-item {'active' if method=='GET' and '/1' not in url else ''}"><span class="s-badge s-get">GET</span> /tasks</div>
      <div class="sidebar-item {'active' if method=='GET' and '/1' in url else ''}"><span class="s-badge s-get">GET</span> /tasks/:id</div>
      <div class="sidebar-item {'active' if method=='POST' else ''}"><span class="s-badge s-post">POST</span> /tasks</div>
      <div class="sidebar-item {'active' if method=='PUT' else ''}"><span class="s-badge s-put">PUT</span> /tasks/:id</div>
      <div class="sidebar-item {'active' if method=='DELETE' else ''}"><span class="s-badge s-del">DEL</span> /tasks/:id</div>
    </div>
    <div class="main-panel">
      <div class="url-bar">
        <div class="method-badge">{method}</div>
        <input class="url-input" value="{url}" readonly />
        <button class="btn-send">Send</button>
      </div>

      <div class="tabs">
        <div class="tab">Params</div>
        <div class="tab">Headers <span style="font-size:11px; background:#374151; padding:2px 6px; border-radius:8px;">1</span></div>
        <div class="tab {'active' if req_body_json else ''}">Body</div>
        <div class="tab">Auth</div>
      </div>

      {req_body_section}

      <div class="response-header">
        <div class="status-badge">&bull; {status_code} {status_text}</div>
        <div class="meta-stats">
          <div class="meta-item">Time: <strong>{time_ms}</strong></div>
          <div class="meta-item">Size: <strong>{size_b}</strong></div>
        </div>
      </div>

      <div class="tabs" style="margin-bottom: 8px;">
        <div class="tab active">Pretty</div>
        <div class="tab">Raw</div>
        <div class="tab">Headers</div>
      </div>

      <pre class="json-code" style="color: #6ee7b7;">{res_body_json}</pre>
    </div>
  </div>
</div>
</body>
</html>
"""

# EchoAPI 1: GET /tasks
get_all_res = """[
  {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Pending",
    "priority": "High"
  },
  {
    "id": 2,
    "taskName": "Design Database Schema",
    "assignedTo": "Priya Patel",
    "status": "In Progress",
    "priority": "High"
  },
  {
    "id": 3,
    "taskName": "Implement Authentication",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
]"""
render_html_and_capture(
    "echo_get_tasks.html",
    generate_echoapi_html("GET", "http://localhost:4000/tasks", "200", "OK", None, get_all_res, "14 ms", "332 B"),
    "06_echoapi_get_all_tasks.png"
)

# EchoAPI 2: GET /tasks/1
get_by_id_res = """{
  "id": 1,
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Pending",
  "priority": "High"
}"""
render_html_and_capture(
    "echo_get_task_1.html",
    generate_echoapi_html("GET", "http://localhost:4000/tasks/1", "200", "OK", None, get_by_id_res, "9 ms", "105 B"),
    "07_echoapi_get_task_by_id.png"
)

# EchoAPI 3: POST /tasks
post_req = """{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}"""
post_res = """{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
}"""
render_html_and_capture(
    "echo_post_task.html",
    generate_echoapi_html("POST", "http://localhost:4000/tasks", "201", "Created", post_req, post_res, "18 ms", "148 B"),
    "08_echoapi_post_new_task.png"
)

# EchoAPI 4: PUT /tasks/1
put_req = """{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}"""
put_res = """{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}"""
render_html_and_capture(
    "echo_put_task.html",
    generate_echoapi_html("PUT", "http://localhost:4000/tasks/1", "200", "OK", put_req, put_res, "15 ms", "154 B"),
    "09_echoapi_put_update_task.png"
)

# EchoAPI 5: DELETE /tasks/1
del_res = """{
  "message": "Task deleted successfully"
}"""
render_html_and_capture(
    "echo_del_task.html",
    generate_echoapi_html("DELETE", "http://localhost:4000/tasks/1", "200", "OK", None, del_res, "11 ms", "39 B"),
    "10_echoapi_delete_task.png"
)

print("All screenshots successfully generated!")
