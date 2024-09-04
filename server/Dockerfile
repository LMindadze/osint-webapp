FROM python:3.10-slim as server

RUN apt-get update && apt-get install -y \
    git \
    wget \
    unzip \
    golang-go

RUN git clone https://github.com/laramies/theHarvester.git
WORKDIR /theHarvester

RUN python3 -m pip install --upgrade pip setuptools wheel

RUN python3 -m pip install -r requirements.txt

RUN python3 -m pip install .

RUN go install github.com/owasp-amass/amass/v3/...@latest && \
    mv /root/go/bin/amass /usr/local/bin/amass

RUN /usr/local/bin/amass -version

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /app

COPY . .

RUN python3 -m pip install -r requirements.txt

EXPOSE 5000

CMD ["python3", "app.py"]
