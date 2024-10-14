pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                // Install dependencies (make sure npm is already installed on the Jenkins agent)
                sh 'npm install'

                // Run tests
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Build the project
                sh 'npm run build'
            }
        }
    }
}
