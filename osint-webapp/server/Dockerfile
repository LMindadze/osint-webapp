# Use the Python 3.10 slim image as the base
FROM python:3.10-slim as server

# Install necessary system packages
RUN apt-get update && apt-get install -y \
    git \
    wget \
    unzip \
    golang-go

# Clone theHarvester repository
RUN git clone https://github.com/laramies/theHarvester.git
WORKDIR /theHarvester

# Upgrade pip, setuptools, and wheel
RUN python3 -m pip install --upgrade pip setuptools wheel

# Install theHarvester dependencies
RUN python3 -m pip install -r requirements.txt

# Install theHarvester
RUN python3 -m pip install .

# Install Amass using the correct module path
RUN go install github.com/owasp-amass/amass/v3/...@latest && \
    mv /root/go/bin/amass /usr/local/bin/amass

# Verify Amass installation
RUN /usr/local/bin/amass -version

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set the working directory
WORKDIR /app

# Copy your Flask app code to the container
COPY . .

# Install the Flask app dependencies
RUN python3 -m pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python3", "app.py"]
