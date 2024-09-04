from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/scan', methods=['POST'])
def scan_domain():
    data = request.json
    domain = data.get('domain')
    tool = data.get('tool')
    modules = data.get('modules', [])  # List of selected modules for theHarvester

    print(f"Received scan request for domain: {domain} using tool: {tool}")

    start_time = datetime.now()

    if tool == "theHarvester":
        print("Running theHarvester with modules:", modules)
        result = run_theharvester(domain, modules)
        print(f"theHarvester result: {result}")
    elif tool == "Amass":
        print("Running Amass...")
        result = run_amass(domain)
        print(f"Amass result: {result}")
    else:
        result = "Tool not supported."

    end_time = datetime.now()

    response = {
        'domain': domain,
        'tool': tool,
        'start_time': start_time.strftime('%Y-%m-%d %H:%M:%S'),
        'end_time': end_time.strftime('%Y-%m-%d %H:%M:%S'),
        'result': result
    }

    return jsonify(response)

def run_theharvester(domain, modules):
    modules_string = ','.join(modules) if modules else 'bing'
    command = f"theHarvester -d {domain} -b {modules_string} -l 200"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    if result.returncode == 0:
        return parse_theharvester_output(result.stdout)
    else:
        return f"Error running theHarvester: {result.stderr}"

def run_amass(domain):
    command = f"amass enum -passive -d {domain}"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    if result.returncode == 0:
        return parse_amass_output(result.stdout)
    else:
        return f"Error running Amass: {result.stderr}"

def parse_theharvester_output(output):
    lines = output.splitlines()
    hosts = []
    capture = False

    for line in lines:
        if "Hosts found:" in line:
            capture = True
            continue
        if capture:
            stripped_line = line.strip()
            if stripped_line and not stripped_line.startswith('---'):
                hosts.append(f'<a href="http://{stripped_line}" target="_blank">{stripped_line}</a>')

    if hosts:
        return "<br>".join(hosts)
    else:
        return "No hosts found."

def parse_amass_output(output):
    lines = output.splitlines()
    hosts = []

    for line in lines:
        stripped_line = line.strip()
        if stripped_line:
            hosts.append(f'<a href="http://{stripped_line}" target="_blank">{stripped_line}</a>')

    if hosts:
        return "<br>".join(hosts)
    else:
        return "No hosts found."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
