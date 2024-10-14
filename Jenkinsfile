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
        
        stage("Build") {
            steps {
                sh 'npm run build'
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

        // Optional: Add a stage to run tests or any other steps if needed
        stage("Run Tests") {
            steps {
                // Add test commands if needed
                // sh 'npm test'
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
