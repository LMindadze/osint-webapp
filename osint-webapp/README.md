# OSINT Web Application

## Introduction
This application allows users to scan domains using open-source tools theHarvester and Amass.

## Getting Started
### Prerequisites
- Docker
- Docker Compose

### Installation
1. Clone the repository.
2. Run `docker-compose up --build` to start the application.

### Usage
- Access the web application at `http://localhost:3000`.
- Enter a domain and select the scanning tool.
- Click "Scan" to start the process.

### Tests
1. **Unit Tests:** For individual functions in the Flask server.
2. **Integration Tests:** To ensure Docker container interaction works as expected.
3. **End-to-End Tests:** Simulate full user interaction.

### Performance
- Monitor and profile code execution.
- Optimize queries and subprocess management.

### Potential Bottlenecks
- Network latency from OSINT tools.
- High CPU/memory usage for large data processing.
