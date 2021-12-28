// pipeline {
//     agent any
//      tools {nodejs "nodejs"}
//     stages {
//         stage('Test') {
//             steps {
//                 // Get some code from a GitHub repository


//                 // Run Maven on a Unix agent.
//                 nodejs(nodeJSInstallationName: 'nodejs', configId: '<config-file-provider-id>') {
//                     sh 'npm run lint'
//                 }
// //                 sh "npm run lint"

//                 // To run Maven on a Windows agent, use
//                 // bat "mvn -Dmaven.test.failure.ignore=true clean package"
//             }
//         }
      
//         stage('Build') {
//             steps {
//                 // Get some code from a GitHub repository


//                 // Run Maven on a Unix agent.
//                 sh "npm install -y"
//                 sh "npm run dev &"
//                 // To run Maven on a Windows agent, use
//                 // bat "mvn -Dmaven.test.failure.ignore=true clean package"
//             }
//         }
      
//         stage('TEST') {
//             steps {
//                 // Get some code from a GitHub repository


//                 // Run Maven on a Unix agent.
//                 sh "./node_modules/.bin/cypress run"

//                 // To run Maven on a Windows agent, use
//                 // bat "mvn -Dmaven.test.failure.ignore=true clean package"
//             }
//         }
//     }
// }

pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'npm run dev' 
            }
        }
        stage('Test') { 
            steps {
                sh './node_modules/.bin/cypress run' 
            }
        }
    }
}
