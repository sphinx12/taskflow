pipeline {
    agent any

    environment {
        USER_SERVICE_IMAGE  = 'taskflow-user-service:latest'
        TASK_SERVICE_IMAGE  = 'taskflow-task-service:latest'
        COMPOSE_FILE        = 'docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '=== Stage 1: Checkout Code ==='
                checkout scm
                echo "Branch: ${env.BRANCH_NAME ?: 'local'}"
                echo "Commit: ${env.GIT_COMMIT ?: 'N/A'}"
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('User Service - Install') {
                    steps {
                        dir('user-service') {
                            echo '=== Installing User Service dependencies ==='
                            bat 'npm ci'
                        }
                    }
                }
                stage('Task Service - Install') {
                    steps {
                        dir('task-service') {
                            echo '=== Installing Task Service dependencies ==='
                            bat 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('User Service - Tests') {
                    steps {
                        dir('user-service') {
                            echo '=== Running User Service Tests ==='
                            bat 'npm test'
                        }
                    }
                    post {
                        failure {
                            echo 'User Service tests FAILED — Deployment blocked!'
                        }
                    }
                }
                stage('Task Service - Tests') {
                    steps {
                        dir('task-service') {
                            echo '=== Running Task Service Tests ==='
                            bat 'npm test'
                        }
                    }
                    post {
                        failure {
                            echo 'Task Service tests FAILED — Deployment blocked!'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '=== Stage 4: Building Docker images ==='
                bat 'docker compose build'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '=== Stage 5: Deploying services ==='
                bat 'docker compose down --remove-orphans'
                bat 'docker compose up -d'
                echo 'Services deployed successfully.'
            }
        }

        stage('Health Check') {
            steps {
                echo '=== Stage 6: Verifying service health ==='
                // Wait for services to be ready
                sleep(time: 10, unit: 'SECONDS')

                bat '''
                    curl -f http://localhost:3001/health || exit 1
                    echo User Service is healthy!
                    curl -f http://localhost:3002/health || exit 1
                    echo Task Service is healthy!
                '''
            }
        }
    }

    post {
        success {
            echo '============================================'
            echo ' PIPELINE SUCCESS - TaskFlow is deployed!'
            echo '   User Service: http://localhost:3001'
            echo '   Task Service: http://localhost:3002'
            echo '============================================'
        }
        failure {
            echo '============================================'
            echo ' PIPELINE FAILED - Check logs above!'
            echo ' Deployment was BLOCKED due to failure.'
            echo '============================================'
        }
        always {
            echo "Pipeline finished at: ${new Date()}"
        }
    }
}
