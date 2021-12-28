pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                // Get some code from a GitHub repository


                // Run Maven on a Unix agent.
                sh "npm run lint"

                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
      
        stage('Build') {
            steps {
                // Get some code from a GitHub repository


                // Run Maven on a Unix agent.
                sh "npm install -y"
                sh "npm run dev &"
                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
      
        stage('TEST') {
            steps {
                // Get some code from a GitHub repository


                // Run Maven on a Unix agent.
                sh "./node_modules/.bin/cypress run"

                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
    }
}
