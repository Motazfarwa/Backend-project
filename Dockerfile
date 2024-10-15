FROM node:20.12.0

# Install Docker
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

# Enable Docker service
RUN systemctl enable docker
