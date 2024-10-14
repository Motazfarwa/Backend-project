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
        stage("Build"){
            steps{
               sh 'npm run build'
            }
        }
    }
}
