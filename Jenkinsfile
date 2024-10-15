pipeline {
    agent {
        docker {
            image 'docker:19.03.12-dind' // Use a specific Docker-in-Docker image
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Bind mount the Docker socket
        }
    }
    stages {
        stage("Checkout") {
            steps {
                checkout scm 
            }
        }
        stage("Install Dependencies") {
            steps {
                sh 'npm install' 
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d my-backend-image:latest'
                }
            }
        }
    }
    post {
        always {
            echo 'Build completed.'
        }
    }
}
