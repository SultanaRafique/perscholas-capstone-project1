pipeline {
  agent any
  stages {
    stage('Docker Build') {
      steps {
         bat 'docker build -t srafique001/capstone1:latest .'
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          bat "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          bat 'docker push srafique001/capstone1:latest'
         }
      }
    }
  }
}
