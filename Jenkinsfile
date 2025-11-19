/**
 * Jenkins Pipeline para Dashboard SUNAT
 * 
 * Este pipeline ejecuta:
 * - Checkout del código
 * - Instalación de dependencias (backend y frontend)
 * - Compilación TypeScript
 * - Generación de Prisma Client
 * - Tests (backend)
 * - Linting (opcional)
 * - Build de producción
 * - Deploy simulado
 * 
 * Requisitos:
 * - Node.js >= 18 instalado en el agente Jenkins
 * - Credenciales configuradas en Jenkins:
 *   - NEON_DB_URL: URL de conexión a Neon PostgreSQL
 *   - JWT_ACCESS_SECRET: Secreto para JWT access tokens
 *   - JWT_REFRESH_SECRET: Secreto para JWT refresh tokens
 */

pipeline {
    agent any
    
    // Variables de entorno globales
    environment {
        // Node.js version (ajustar según tu entorno)
        NODE_VERSION = '18'
        
        // Variables de base de datos y autenticación (desde Jenkins credentials)
        DATABASE_URL = credentials('NEON_DB_URL')
        JWT_ACCESS_TOKEN_SECRET = credentials('JWT_ACCESS_SECRET')
        JWT_REFRESH_TOKEN_SECRET = credentials('JWT_REFRESH_SECRET')
        
        // Variables de configuración
        NODE_ENV = 'test'
        PORT = '4000'
        CORS_ORIGIN = 'http://localhost:5173'
        ACCESS_TOKEN_EXPIRES_IN = '15m'
        REFRESH_TOKEN_EXPIRES_IN = '7d'
        
        // Directorios del proyecto
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = '.'
    }
    
    // Opciones del pipeline
    options {
        // Timeout total del pipeline (60 minutos)
        timeout(time: 60, unit: 'MINUTES')
        
        // Reintentos en caso de fallo
        retry(2)
        
        // Timestamps en los logs
        timestamps()
        
        // Anotaciones de build
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        /**
         * STAGE 1: Checkout
         * Obtiene el código fuente del repositorio Git
         */
        stage('Checkout') {
            steps {
                script {
                    echo '📦 Checking out source code from repository...'
                    checkout scm
                    
                    // Mostrar información del commit
                    sh '''
                        echo "=== Git Information ==="
                        echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
                        echo "Commit: $(git rev-parse HEAD)"
                        echo "Author: $(git log -1 --pretty=format:'%an <%ae>')"
                        echo "Message: $(git log -1 --pretty=format:'%s')"
                    '''
                }
            }
        }
        
        /**
         * STAGE 2: Setup Node.js
         * Verifica/instala Node.js si es necesario
         */
        stage('Setup Node.js') {
            steps {
                script {
                    echo '🔧 Setting up Node.js environment...'
                    
                    sh '''
                        # Verificar Node.js instalado
                        if ! command -v node &> /dev/null; then
                            echo "❌ Node.js no encontrado. Instalando..."
                            # Aquí puedes agregar lógica para instalar Node.js
                            # Por ejemplo, usando nvm o descargando desde nodejs.org
                            exit 1
                        fi
                        
                        # Mostrar versiones
                        echo "Node.js version: $(node --version)"
                        echo "npm version: $(npm --version)"
                        
                        # Verificar versión mínima
                        NODE_MAJOR=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
                        if [ "$NODE_MAJOR" -lt 18 ]; then
                            echo "❌ Node.js 18+ requerido. Versión actual: $(node --version)"
                            exit 1
                        fi
                    '''
                }
            }
        }
        
        /**
         * STAGE 3: Install Dependencies
         * Instala dependencias de backend y frontend
         */
        stage('Install Dependencies') {
            parallel {
                stage('Install Backend') {
                    steps {
                        script {
                            echo '📥 Installing backend dependencies...'
                            dir("${env.BACKEND_DIR}") {
                                sh '''
                                    echo "Working directory: $(pwd)"
                                    echo "Installing npm packages..."
                                    npm ci --prefer-offline --no-audit
                                    
                                    if [ $? -eq 0 ]; then
                                        echo "✅ Backend dependencies installed successfully"
                                    else
                                        echo "❌ Failed to install backend dependencies"
                                        exit 1
                                    fi
                                '''
                            }
                        }
                    }
                }
                
                stage('Install Frontend') {
                    steps {
                        script {
                            echo '📥 Installing frontend dependencies...'
                            dir("${env.FRONTEND_DIR}") {
                                sh '''
                                    echo "Working directory: $(pwd)"
                                    echo "Installing npm packages..."
                                    npm ci --prefer-offline --no-audit
                                    
                                    if [ $? -eq 0 ]; then
                                        echo "✅ Frontend dependencies installed successfully"
                                    else
                                        echo "❌ Failed to install frontend dependencies"
                                        exit 1
                                    fi
                                '''
                            }
                        }
                    }
                }
            }
        }
        
        /**
         * STAGE 4: Prisma Setup
         * Genera el cliente Prisma y verifica la conexión a Neon
         */
        stage('Prisma Setup') {
            steps {
                script {
                    echo '🗄️ Setting up Prisma and database connection...'
                    dir("${env.BACKEND_DIR}") {
                        sh '''
                            echo "Generating Prisma Client..."
                            npm run prisma:generate
                            
                            if [ $? -ne 0 ]; then
                                echo "❌ Failed to generate Prisma Client"
                                exit 1
                            fi
                            
                            echo "✅ Prisma Client generated successfully"
                            
                            # Verificar conexión a la base de datos (sin aplicar migraciones)
                            echo "Testing database connection..."
                            # Usar Prisma.$executeRaw con string simple para evitar problemas con backticks en Groovy
                            node -e 'const {PrismaClient} = require("@prisma/client"); const p = new PrismaClient(); p.$executeRaw("SELECT 1").then(() => {console.log("✅ Database connection successful"); return p.$disconnect();}).catch((e) => {console.error("❌ Database connection failed:", e.message); process.exit(1);});'
                        '''
                    }
                }
            }
        }
        
        /**
         * STAGE 5: Build
         * Compila TypeScript del backend y build del frontend
         */
        stage('Build') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            echo '🔨 Building backend (TypeScript compilation)...'
                            dir("${env.BACKEND_DIR}") {
                                sh '''
                                    echo "Compiling TypeScript..."
                                    npm run build
                                    
                                    if [ $? -eq 0 ]; then
                                        echo "✅ Backend build successful"
                                        echo "Build output:"
                                        ls -lah dist/ | head -10
                                    else
                                        echo "❌ Backend build failed"
                                        exit 1
                                    fi
                                '''
                            }
                        }
                    }
                }
                
                stage('Build Frontend') {
                    steps {
                        script {
                            echo '🔨 Building frontend (Vite)...'
                            dir("${env.FRONTEND_DIR}") {
                                sh '''
                                    echo "Building React application with Vite..."
                                    npm run build
                                    
                                    if [ $? -eq 0 ]; then
                                        echo "✅ Frontend build successful"
                                        echo "Build output:"
                                        ls -lah build/ | head -10
                                    else
                                        echo "❌ Frontend build failed"
                                        exit 1
                                    fi
                                '''
                            }
                        }
                    }
                }
            }
        }
        
        /**
         * STAGE 6: Lint
         * Ejecuta linting en backend y frontend (si está configurado)
         */
        stage('Lint') {
            parallel {
                stage('Lint Backend') {
                    steps {
                        script {
                            echo '🔍 Linting backend code...'
                            dir("${env.BACKEND_DIR}") {
                                sh '''
                                    # Verificar si hay script de lint configurado
                                    if npm run | grep -q "  lint"; then
                                        echo "Running backend linter..."
                                        npm run lint || echo "⚠️ Linting issues found (non-blocking)"
                                    else
                                        echo "⚠️ No lint script configured for backend"
                                    fi
                                '''
                            }
                        }
                    }
                }
                
                stage('Lint Frontend') {
                    steps {
                        script {
                            echo '🔍 Linting frontend code...'
                            dir("${env.FRONTEND_DIR}") {
                                sh '''
                                    # Verificar si hay script de lint configurado
                                    if npm run | grep -q "  lint"; then
                                        echo "Running frontend linter..."
                                        npm run lint || echo "⚠️ Linting issues found (non-blocking)"
                                    else
                                        echo "⚠️ No lint script configured for frontend"
                                    fi
                                '''
                            }
                        }
                    }
                }
            }
        }
        
        /**
         * STAGE 7: Test
         * Ejecuta tests del backend (Jest)
         */
        stage('Test') {
            steps {
                script {
                    echo '🧪 Running tests...'
                    dir("${env.BACKEND_DIR}") {
                        sh '''
                            echo "Running backend tests with Jest..."
                            
                            # Crear archivo .env temporal para tests
                            cat > .env << EOF
                            NODE_ENV=test
                            DATABASE_URL=${DATABASE_URL}
                            JWT_ACCESS_TOKEN_SECRET=${JWT_ACCESS_TOKEN_SECRET}
                            JWT_REFRESH_TOKEN_SECRET=${JWT_REFRESH_TOKEN_SECRET}
                            PORT=4000
                            CORS_ORIGIN=http://localhost:5173
                            ACCESS_TOKEN_EXPIRES_IN=15m
                            REFRESH_TOKEN_EXPIRES_IN=7d
                            EOF
                            
                            # Ejecutar tests
                            npm test -- --coverage --verbose
                            
                            if [ $? -eq 0 ]; then
                                echo "✅ All tests passed"
                            else
                                echo "❌ Tests failed"
                                exit 1
                            fi
                        '''
                    }
                }
            }
            post {
                always {
                    // Publicar resultados de tests (si está configurado JUnit)
                    script {
                        dir("${env.BACKEND_DIR}") {
                            // Buscar reportes de cobertura
                            sh '''
                                if [ -d "coverage" ]; then
                                    echo "📊 Test coverage report generated"
                                    ls -lah coverage/
                                fi
                            '''
                        }
                    }
                }
            }
        }
        
        /**
         * STAGE 8: Database Migrations
         * Aplica migraciones de Prisma (solo en ciertos branches o manualmente)
         */
        stage('Database Migrations') {
            when {
                // Solo ejecutar en branch main/master o cuando se especifica manualmente
                anyOf {
                    branch 'main'
                    branch 'master'
                    expression { params.RUN_MIGRATIONS == true }
                }
            }
            steps {
                script {
                    echo '🗄️ Deploying database migrations...'
                    dir("${env.BACKEND_DIR}") {
                        sh '''
                            echo "Applying Prisma migrations to Neon database..."
                            npm run prisma:deploy
                            
                            if [ $? -eq 0 ]; then
                                echo "✅ Database migrations applied successfully"
                            else
                                echo "❌ Database migrations failed"
                                exit 1
                            fi
                        '''
                    }
                }
            }
        }
        
        /**
         * STAGE 9: Deploy (Simulado)
         * Simula el proceso de deploy (no despliega realmente)
         */
        stage('Deploy') {
            when {
                // Solo en branch main/master
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    echo '🚀 Simulating deployment...'
                    sh '''
                        echo "=== Deployment Simulation ==="
                        echo "Backend build artifacts:"
                        ls -lah backend/dist/ | head -5
                        echo ""
                        echo "Frontend build artifacts:"
                        ls -lah build/ | head -5
                        echo ""
                        echo "✅ Deployment simulation completed"
                        echo "⚠️ Actual deployment would happen here (Docker, Kubernetes, etc.)"
                    '''
                }
            }
        }
    }
    
    /**
     * POST ACTIONS
     * Se ejecutan después de todos los stages, independientemente del resultado
     */
    post {
        /**
         * Cuando el pipeline es exitoso
         */
        success {
            script {
                echo '✅ =========================================='
                echo '✅ Pipeline completed successfully!'
                echo '✅ =========================================='
                
                // Notificaciones opcionales (email, Slack, etc.)
                // emailext (
                //     subject: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                //     body: "Build completed successfully.\n\nCheck console output: ${env.BUILD_URL}",
                //     to: "${env.CHANGE_AUTHOR_EMAIL}"
                // )
            }
        }
        
        /**
         * Cuando el pipeline falla
         */
        failure {
            script {
                echo '❌ =========================================='
                echo '❌ Pipeline failed!'
                echo '❌ =========================================='
                
                // Mostrar información útil para debugging
                sh '''
                    echo "=== Build Failure Information ==="
                    echo "Build Number: ${BUILD_NUMBER}"
                    echo "Build URL: ${BUILD_URL}"
                    echo "Workspace: ${WORKSPACE}"
                    echo "Node Version: $(node --version)"
                    echo "npm Version: $(npm --version)"
                '''
                
                // Notificaciones opcionales
                // emailext (
                //     subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                //     body: "Build failed. Please check console output: ${env.BUILD_URL}",
                //     to: "${env.CHANGE_AUTHOR_EMAIL}"
                // )
            }
        }
        
        /**
         * Siempre se ejecuta (éxito o fallo)
         */
        always {
            script {
                echo '📊 =========================================='
                echo '📊 Pipeline execution completed'
                echo '📊 =========================================='
                
                // Limpiar archivos temporales si es necesario
                sh '''
                    echo "Cleaning up temporary files..."
                    # Agregar comandos de limpieza si es necesario
                '''
            }
        }
        
        /**
         * Limpieza después de fallo o aborto
         */
        cleanup {
            script {
                echo '🧹 Cleaning up workspace...'
                // Cerrar conexiones de base de datos, limpiar procesos, etc.
            }
        }
    }
}
