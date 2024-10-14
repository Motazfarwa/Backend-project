pipeline {
    agent any  // Specify the agent (any available agent)

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Check out source code from SCM
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm install' // Install all dependencies
            }
        }
    }
}
