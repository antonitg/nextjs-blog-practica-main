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
    agent any

//         docker {
//             image 'node:lts-buster-slim'
//             args '-p 3000:3000'
//         }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install --save'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'nohup npm run dev > /dev/null 2>&1 &' 
            }
        }
        stage('Lint') { 
            steps {
                sh 'npm run lint' 
            }
        }
          
        stage('Test') { 
            steps {
                sh 'npm run jest' 
            }
        }
        stage('Parallel Stage') {
            when {
                branch 'master'
            }
            failFast true
            parallel {
                stage('Branch A') {
                    agent {
                        label "for-branch-a"
                    }
                    steps {
                        echo "On Branch A"
                    }
                }
                stage('Branch B') {
                    agent {
                        label "for-branch-b"
                    }
                    steps {
                        echo "On Branch B"
                    }
                }
            }
        }
    }
}
