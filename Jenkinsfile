pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock --user root' // Bind Docker socket
        }
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id') // Docker Hub credentials
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from source control
            }
        }

        stage("Install Docker") {
            steps {
                script {
                    // Update package list and install Docker
                    sh '''
                    apt-get update
                    apt-get install -y docker.io
                    '''
                }
            }
        }


        stage("Install Dependencies") {
            steps {
                script {
                    sh 'npm -v'
                    sh 'npm install'
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }

         stage("Run Docker Container") {
            steps {
                script {
                    // Container name
                    def containerName = "my-backend-container"
                    
                    // Check if the container exists
                    def containerExists = sh(script: "docker ps -a -q -f name=${containerName}", returnStdout: true).trim()

                    // Remove the existing container if it exists
                    if (containerExists) {
                        echo "Container ${containerName} already exists. Removing it."
                        sh "docker rm -f ${containerName}" // Force remove the container
                    }

                    // Run the Docker container
                    echo "Starting a new container ${containerName}."
                    sh "docker run -d --name ${containerName} my-backend-image:latest"
                }
            }
        }

        stage("Push Docker Image to Docker Hub") {
            steps {
                script {
                    sh 'docker login -u ${DOCKER_HUB_CREDENTIALS_USR} -p ${DOCKER_HUB_CREDENTIALS_PSW}'
                    sh 'docker tag my-backend-image:latest your-docker-hub-username/repo-name:latest'
                    sh 'docker push your-docker-hub-username/repo-name:latest'
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
