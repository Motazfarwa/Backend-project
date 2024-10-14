pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // Uncomment if you have tests
        // stage('Test') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
