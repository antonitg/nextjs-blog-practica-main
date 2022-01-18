// pipeline {
// va que tu pots
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
    triggers {
        pollSCM 'H/3 * * * *'
    }
      parameters {
            string(name: 'firstVal', defaultValue: 'beateta')
            string(name: 'secondVal', defaultValue: 'ines')
      }
//         docker {
//             image 'node:lts-buster-slim'
//             args '-p 3000:3000'
//         }
    environment {
        CI = 'true' 
    }
    stages {
            stage('First') {
                steps {
                 sh 'node ./scriptsJenkins/firstScript.js ${firstVal} >> first.txt'
                 sh 'uno=`cat first.txt`'
                
                }
            }
            stage('Second') {
                steps {
                 sh 'node ./scriptsJenkins/secondScript.js ${secondVal} >> second.txt'
                 sh 'dos=`cat second.txt`'
                }
            }
            stage('Third') {
                  steps {
                      script {
                          if ($uno == 'true') {
                              echo 'I only execute on the master branch 1'
                          } else {
                              echo 'I execute elsewhere 2'
                          }
                          if ($uno == true) {
                              echo 'I only execute on the master branch 3'
                          } else {
                              echo 'I execute elsewhere 4'
                          }
                      }
                  }
//                   if ($uno == true) {
//                         echo '1'
//                   } else {
//                         echo '2'
//                   }
//                   if ($uno == 'true') {
//                         echo '3'
//                   } else {
//                         echo '4'
//                   }
                
          }
                                                
                                                
//         stage('Build') {
//             steps {
//                 sh 'npm install --save'
//             }
//         }
//         stage('Deploy') { 
//             steps {
//                 sh 'nohup npm run dev > /dev/null 2>&1 &' 
//             }
//         }
//         stage('Lint') { 
//             steps {
//                 sh 'npm run lint' 
//             }
//         }
//         stage('Parallel Stage') {
//             parallel {
//                 stage('Branch A') {
//                     steps {
//                         echo "On Branch A"
//                     }
//                 }
//                 stage('Branch B') {
//                      steps {
//                         echo "On Branch B"
//                     }
//                 }
//             }
//         }
//         stage('Test') { 
//             steps {
//                 sh 'npm run jest' 
//             }
//         }  
    }
}
