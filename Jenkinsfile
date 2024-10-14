pipeline {
    agent any  // Specify the agent (any available agent)
    
    stages {
        stage("Checkout") {
            steps {
                checkout scm // Check out source code from SCM
            }
        }
        
        stage("Build") {
            steps {
                // Run the build command here. Adjust as needed for your project.
                sh 'npm install' // Install dependencies (if needed)
                sh 'npm run build' // Build the project
            }
        }
    }
}
