pipeline {
    agent any
    environment {
        DATABASE_URL = credentials('NEON_DB_URL')
        JWT_ACCESS_TOKEN_SECRET = credentials('JWT_ACCESS_SECRET')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Prisma Generate') {
            steps {
                sh 'npx prisma generate'
            }
        }
        stage('Deploy Migrations') {
            steps {
                sh 'npx prisma migrate deploy'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        success {
            echo '✅ Build completed!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
