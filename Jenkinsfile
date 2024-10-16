pipeline {
    agent {
        docker {
            image 'node:18' // Use a Node.js image
            args '-v /var/run/docker.sock:/var/run/docker.sock --user root' // Run as root
        }
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from the source control
            }
        }

        stage("Install Docker") {
            steps {
                script {
                    // Update package list and install Docker
                    sh '''
                    apt-get update
                    apt-get install -y docker.io
                    '''
                }
            }
        }

        stage("Install Dependencies") {
            steps {
                script {
                    // Check if npm is available
                    sh 'npm -v'
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    // Check if Docker is available
                    sh 'docker --version'
                    // Build the Docker image
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }

        stage("Extract Kubernetes Token") {
            steps {
                script {
                    // Path to the Kubernetes service account token
                    def tokenPath = "/var/run/secrets/kubernetes.io/serviceaccount/token"

                    // Read the token from the file
                    def token = sh(script: "cat ${tokenPath}", returnStdout: true).trim()

                    // Print the token (for debugging purposes, you might want to remove this)
                    echo "Extracted Kubernetes Token: ${token}"

                    // Set the token as an environment variable for use in the deployment stage
                    env.KUBE_TOKEN = token
                }
            }
        }

        stage("Deploy Docker Image to Kubernetes") {
            steps {
                script {
                    // Use the Kubernetes token to deploy the Docker image
                    // Make sure to set your Kubernetes context appropriately if necessary
                    sh '''
                    kubectl config set-credentials jenkins --token=${KUBE_TOKEN}
                    kubectl config set-context --current --user=jenkins
                    kubectl apply -f k8s/deployment.yaml // Adjust the path to your Kubernetes manifests
                    '''
                }
            }
        }
    }

    post {
        always {
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
