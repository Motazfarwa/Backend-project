pipeline {
    agent {
        docker {
            image 'node:20.12.0' // Use a Node.js image
            args '-v /var/run/docker.sock:/var/run/docker.sock --privileged --user root' // Run as root with privileged access
        }
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id') // Docker Hub credentials stored in Jenkins
        DOCKER_HUB_REPO = 'mootezfarwa/noderepo' // Docker Hub repo name
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from the source control
            }
        }

        stage("Install Dependencies") {
            steps {
                script {
                    // Check if npm is available
                    sh 'npm -v'
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    // Check if Docker is available
                    sh 'docker --version'
                    // Build the Docker image
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }

        stage("Run Docker Container") {
            steps {
                script {
                    def containerName = "my-backend-container"
                    def containerExists = sh(script: "docker ps -a -q -f name=${containerName}", returnStdout: true).trim()

                    if (containerExists) {
                        echo "Removing existing container: ${containerName}"
                        sh "docker rm -f ${containerName}"
                    }

                    echo "Starting a new container: ${containerName}"
                    sh "docker run -d --name ${containerName} my-backend-image:latest"
                }
            }
        }

        stage("Push Docker Image to Docker Hub") {
            steps {
                script {
                    // Tag the Docker image for Docker Hub
                    sh "docker tag my-backend-image:latest ${DOCKER_HUB_REPO}:latest"

                    // Log in to Docker Hub
                    sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"

                    // Push the Docker image to Docker Hub
                    sh "docker push ${DOCKER_HUB_REPO}:latest"
                }
            }
        }
     }

    post {
        always {
            echo 'Build completed.'
        }

        success {
            echo 'Build was successful!'
        }

        failure {
            echo 'Build failed. Check the logs for more information.'
        }
    }
}
