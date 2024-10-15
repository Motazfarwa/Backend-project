pipeline {
    agent {
        docker {
            image 'node:18' // Use a Node.js image
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Optional: Bind mount the Docker socket for Docker commands
        }
    }
    
    stages {
        stage("Checkout") {
            steps {
                // Checkout code from the source control
                checkout scm 
            }
        }

        stage("Install Dependencies") {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }

        stage("Run Docker Container") {
            steps {
                script {
                    // Run the Docker container in detached mode
                    sh 'docker run -d --name my-backend-container my-backend-image:latest'
                }
            }
        }
    }

    post {
        always {
            // Clean up resources or notify after the build
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
