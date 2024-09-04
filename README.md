# OSINT Web Application

## Overview
This project is an OSINT (Open-Source Intelligence) web application that allows users to scan specified domains using two OSINT tools:

Users can input a domain and select which tool to use, and the application will display scan results, including start and end times.

## Prerequisites
- [Docker](https://www.docker.com/get-started) installed on your machine and running.
## Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/lado1lado/osint-web-application.git
cd osint-web-application
```
### Step 2: Build and Run the Docker Containers
The application is divided into two components: server and client. You can run both containers using the docker-compose file

Make sure you are in the project root directory.
Run the following command:
```bash
docker-compose up --build
```

### Step 3: Access the Application
```
http://localhost:3000/
```
### Step 4: Running OSINT Scans
1. Enter a domain name in the input field.
2. Select either theHarvester or Amass as the scan tool.
3. if selected theHarvester you have the option to specify which moduls to use for scan
4. Click Scan.
5. The scan results will be displayed as cards showing subdomains.

### Running Tests
You can run basic Selenium-based test to check theHarvester and Amass tools.

Ensure both the client and server containers are running.
Run the Selenium tests:
```bash
python test.py
```