pipeline {
    agent {
        docker {
            image 'node:20.12.0' // Use a Node.js image
            args '-v /var/run/docker.sock:/var/run/docker.sock --user root' // Run as root to have Docker access
        }
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id') // Docker Hub credentials stored in Jenkins
        DOCKER_HUB_REPO = 'mootezfarwa/noderepo' // Docker Hub repository name
        KUBECONFIG_CRED = credentials('eyJhbGciOiJSUzI1NiIsImtpZCI6InN1MjJVOU1lX0E5dWRzNXZMZHRVOXJ6b3g2WVVscmNReTFFdV9qaXZhdm8ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJqZW5raW5zIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImplbmtpbnMtdG9rZW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiamVua2lucyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjNiMjI0Yjg5LWFlNTYtNGU3YS04NGNhLWFmOWQ3Mzk1ZTZkNyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpqZW5raW5zOmplbmtpbnMifQ.Fi55P6VzQ0ejyY2N1ilv88uLQwcJsLsi70Rd8lUCtTpISm59SppwBS7sZ-sC4hnIffEdjm6FNMmlG662E3IbnBxzTk8KHgJbtkvsKx31Aw55Kwir98AJBqrIsDMF7GjVaLVTfn0lkmmAxgiHON1NGPm0_2imkRzumSvnB21Pjo1plwS-XAakeOQ5z-Pw409ajhwfWBZuSi7dVnB9uJ_cNrRny0O5n-jfHc8TBAgl3JeXCYRSyV9mLoM5lmcr9hFB5aDxYVPaKEgpdk5a_2Vs7oY3o2ySpZi3xAsEAKfZg4f_Jf8j-HoyxqKfYwyGwfWeSmDQOocW4UCDeg6XyddO8Q') // Kubeconfig or Token Secret ID
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from the source control
            }
        }

        stage("Install Docker and kubectl") {
            steps {
                script {
                    // Update package list, install Docker and kubectl
                    sh '''
                    apt-get update
                    apt-get install -y docker.io
                    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                    chmod +x kubectl
                    mv kubectl /usr/local/bin/
                    '''
                }
            }
        }

        stage("Install Dependencies") {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
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

        stage("Push Docker Image to Docker Hub") {
            steps {
                script {
                    // Tag the Docker image for Docker Hub
                    sh "docker tag my-backend-image:latest ${DOCKER_HUB_REPO}:latest"
                    
                    // Push the Docker image to Docker Hub
                    sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
                    sh "docker push ${DOCKER_HUB_REPO}:latest"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                // Deploy the application using kubectl
                withKubeConfig([credentialsId: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InN1MjJVOU1lX0E5dWRzNXZMZHRVOXJ6b3g2WVVscmNReTFFdV9qaXZhdm8ifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJqZW5raW5zIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImplbmtpbnMtdG9rZW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiamVua2lucyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjNiMjI0Yjg5LWFlNTYtNGU3YS04NGNhLWFmOWQ3Mzk1ZTZkNyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpqZW5raW5zOmplbmtpbnMifQ.Fi55P6VzQ0ejyY2N1ilv88uLQwcJsLsi70Rd8lUCtTpISm59SppwBS7sZ-sC4hnIffEdjm6FNMmlG662E3IbnBxzTk8KHgJbtkvsKx31Aw55Kwir98AJBqrIsDMF7GjVaLVTfn0lkmmAxgiHON1NGPm0_2imkRzumSvnB21Pjo1plwS-XAakeOQ5z-Pw409ajhwfWBZuSi7dVnB9uJ_cNrRny0O5n-jfHc8TBAgl3JeXCYRSyV9mLoM5lmcr9hFB5aDxYVPaKEgpdk5a_2Vs7oY3o2ySpZi3xAsEAKfZg4f_Jf8j-HoyxqKfYwyGwfWeSmDQOocW4UCDeg6XyddO8Q', serverUrl: 'https://192.168.1.76:6443']) {
                    sh 'kubectl apply -f deployment.yaml'
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
