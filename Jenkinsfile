pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Bind Docker socket
        }
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id') // Docker Hub credentials
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm // Checkout code from source control
            }
        }

        stage("Install Dependencies") {
            steps {
                script {
                    sh 'npm -v'
                    sh 'npm install'
                }
            }
        }

        stage("Start SonarQube") {
            steps {
                script {
                    // Pull and run SonarQube container
                    sh '''
                        docker pull sonarqube:latest
                        docker run -d --name sonarqube-container -p 9000:9000 sonarqube:latest
                    '''
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    sh 'docker build -t my-backend-image:latest .'
                }
            }
        }

        stage("Run Application Container") {
            steps {
                script {
                    // Stop and remove any existing container with the same name
                    sh '''
                        if [ $(docker ps -a -q -f name=my-backend-container) ]; then
                            docker stop my-backend-container
                            docker rm my-backend-container
                        fi
                    '''
                    // Run the application container
                    sh 'docker run -d --name my-backend-container my-backend-image:latest'
                }
            }
        }

        stage("SonarQube Scan") {
            steps {
                script {
                    // Run SonarQube analysis (add sonar-scanner CLI configuration here)
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=myproject \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=your-sonar-token
                    '''
                }
            }
        }

        stage("Push Docker Image to Docker Hub") {
            steps {
                script {
                    sh 'docker login -u ${DOCKER_HUB_CREDENTIALS_USR} -p ${DOCKER_HUB_CREDENTIALS_PSW}'
                    sh 'docker tag my-backend-image:latest your-docker-hub-username/repo-name:latest'
                    sh 'docker push your-docker-hub-username/repo-name:latest'
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
