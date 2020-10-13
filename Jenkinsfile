pipeline {
  agent {
    dockerfile true
  }
    environment {
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { sh 'npm run-script test' }
        }
      }
    }

    stage('Build') {
      steps { sh 'npm run-script build' }
    }

    stage("Publish Pre-Release") {
        steps {
            sh 'firebase deploy --only hosting:dev --token $FIREBASE_TOKEN'
        }
    }
        
    stage("Publish Release") {
        when { expression { env.BRANCH_NAME.contains("master") } }
        steps {
            sh 'firebase deploy --only hosting:prod --token $FIREBASE_TOKEN'
        }
    }
  }
  post {
        success {
            emailext body: 'Success Build', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Success'
        }
        unsuccessful {
            emailext body: 'Unsuccess Build', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Unsuccess'

        }
    }
}