pipeline {
  agent {
    docker { image 'zeroplusx/firebase-tools' }
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
    stage('Publish') {
      steps { 
          sh 'firebase deploy --token $FIREBASE_TOKEN'
          }
    }
  }
}