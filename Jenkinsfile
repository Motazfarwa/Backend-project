pipeline {
    agent {
        docker {
            image 'node:18' // Use a Node.js image
            args '-v /var/run/docker.sock:/var/run/docker.sock --user root' // Run as root
        }
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from the source control
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
                    // Run the Docker container
                    sh 'docker run -d --name my-backend-container my-backend-image:latest'
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
