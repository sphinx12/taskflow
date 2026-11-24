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
                sh 'docker compose -p taskflow build user-service task-service frontend prometheus grafana'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '=== Stage 5: Deploying services ==='
                sh 'docker compose -p taskflow up -d --no-deps user-service task-service frontend prometheus grafana'
                echo 'Services deployed successfully.'
            }
        }

        stage('Health Check') {
            steps {
                echo '=== Stage 6: Verifying service health ==='
                sh '''
                    echo "Checking User Service..."
                    for i in $(seq 1 10); do curl -fs http://user-service:3001/health && break || sleep 2; done
                    echo "\nUser Service is healthy!"

                    echo "Checking Task Service..."
                    for i in $(seq 1 10); do curl -fs http://task-service:3002/health && break || sleep 2; done
                    echo "\nTask Service is healthy!"

                    echo "Checking Frontend Dashboard..."
                    for i in $(seq 1 10); do curl -fs http://frontend:80/ > /dev/null && break || sleep 2; done
                    echo "Frontend Dashboard is healthy!"

                    echo "Checking Prometheus..."
                    for i in $(seq 1 10); do curl -fs http://prometheus:9090/-/healthy && break || sleep 2; done
                    echo "\nPrometheus is healthy!"

                    echo "Checking Grafana..."
                    for i in $(seq 1 15); do curl -fs http://grafana:3000/api/health && break || sleep 2; done
                    echo "\nGrafana is healthy!"
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
            echo '   Grafana Monitoring: http://localhost:3000'
            echo '   Prometheus Metrics: http://localhost:9090'
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
