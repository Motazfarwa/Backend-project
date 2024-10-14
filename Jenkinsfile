pipeline {
    agent {
        docker {
            image 'node:latest' // Use an official Node.js image
            args '-u root' // Run as root if needed
        }
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        
        stage("Test") {
            steps {
                sh 'npm test'
            }
        }
        
        stage("Build") {
            steps {
                sh 'npm run build'
            }
        }
    }
}
