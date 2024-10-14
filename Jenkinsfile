pipeline {
    agent any  // Specify the agent (any available agent)

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
                    // Build the Docker image
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }
    stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    sh 'docker run --name my-backend-container -d my-backend-image:latest'
                }
            }
        }
    }
    
    post {
        always {
            // Clean up resources or notify after the build
            echo 'Build completed.'
        }
    }
}
