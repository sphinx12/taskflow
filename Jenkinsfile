pipeline {
    agent any

    triggers {
        pollSCM('')
    }

    environment {
        COMPOSE_PROJECT_NAME = 'taskflow'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '=== Stage 1: Checkout Code ==='
                checkout scm
                echo "Branch: ${env.BRANCH_NAME ?: 'master'}"
                echo "Commit: ${env.GIT_COMMIT ?: 'N/A'}"
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('User Service - Install') {
                    steps {
                        dir('user-service') {
                            echo '=== Installing User Service dependencies ==='
                            sh 'npm ci'
                        }
                    }
                }
                stage('Task Service - Install') {
                    steps {
                        dir('task-service') {
                            echo '=== Installing Task Service dependencies ==='
                            sh 'npm ci'
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
                            sh 'npm test'
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
                            sh 'npm test'
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
                sh 'docker compose -p taskflow build user-service task-service frontend'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '=== Stage 5: Deploying services ==='
                sh 'docker compose -p taskflow up -d --no-deps user-service task-service frontend'
                echo 'Services deployed successfully.'
            }
        }

        stage('Health Check') {
            steps {
                echo '=== Stage 6: Verifying service health ==='
                sleep(time: 5, unit: 'SECONDS')
                sh '''
                    curl -f http://user-service:3001/health || exit 1
                    echo "User Service is healthy!"
                    curl -f http://task-service:3002/health || exit 1
                    echo "Task Service is healthy!"
                    curl -f http://frontend:80/ || exit 1
                    echo "Frontend Dashboard is healthy!"
                '''
            }
        }
    }

    post {
        success {
            echo '============================================'
            echo ' PIPELINE SUCCESS - TaskFlow is deployed!'
            echo '   Frontend Dashboard: http://localhost (Port 80)'
            echo '   User Service:       http://localhost:3001'
            echo '   Task Service:       http://localhost:3002'
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
