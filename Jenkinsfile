pipeline {
    agent {
        docker {
            image 'node:18' // Use a Node.js image with npm
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Bind mount the Docker socket if needed
        }
    }
    
    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from the source control
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm install' // Install Node.js dependencies
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh 'docker build -t my-backend-image:latest .' // Build the Docker image
                }
            }
        }

        stage("Run Docker Container") {
            steps {
                script {
                    sh 'docker run -d --name my-backend-container my-backend-image:latest' // Run the Docker container
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
