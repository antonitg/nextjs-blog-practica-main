# nextjs-blog-practica-main
![badge-failure](https://img.shields.io/badge/test-failure-red)

# Practica Pepe

1. Introducción teórica Github Actions.
2. Workflow.
   - Linter.
     - ¿Qué es linter?
     - Explicación del job.
   - Cypress.
     - ¿Qué es cypress?
     - Explicación del job.
   - Badge.
     - ¿Qué son las badges?
     - Explicación del job.
   - Vercel.
     - ¿Qué es Vercel?
     - Explicación del job.

## Introducción teórica Github Actions.
### ¿Qué son las Github Actions?
GitHub Actions permite crear flujos de trabajo (workflows) que se pueden utilizar para compilar, probar y desplegar código, dando la posibilidad de crear flujos de integración y despliegue continuo dentro del propio repositorio de git. Los flujos de trabajo tienen que contener al menos un job.

### ¿Qué son la integración y la distribución continuas (CI/CD)?
La CI/CD es un método para distribuir las aplicaciones a los clientes con frecuencia mediante el uso de la automatización en las etapas del desarrollo de aplicaciones. Los principales conceptos que se le atribuyen son la integración, la distribución y la implementación continuas. Se trata de una solución para los problemas que puede generar la integración del código nuevo para los equipos de desarrollo y de operaciones.

## Lint
### ¿Qué es Linting?
Es una herramienta de software que revisa y "observa" tu código en busca de errores que puedan afectar tu código. Algunos "linteres" incluso pueden darte sugerencias de como arreglar el error o incluso arreglarlo ellos mismos.

### Expliación del job
Descargamos el codigo del repositorio con la action checkout i ejecutamos el lint que tenemos configurado en la aplicación.

```bash
  Linter_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Run lint
        run: |
          npm install
          npm install --save-dev eslint
          npm run lint
```
Funcionando despues de arreglar errores sintacticos (Cambio de dobles comillas a simples y de var a let o const)
![image](https://user-images.githubusercontent.com/45063500/146681917-da69d71a-911f-444e-90d9-82f704c4baff.png)

## Cypress
### ¿Qué es Cypress?
Cypress es un framework de testing moderno y todo en uno. Es rápido, fácil de usar y permite ejecutar pruebas sobre cualquier aplicación web.

### Expliación del job
Descargamos el codigo del repositorio con la action checkout i ejecutamos la action de cypress pasandole como se llama nuestro fichero de configuración y los comandos del build y el arranque de nuestra app, tambien inidcamos que necesita que acabe el job Linter_job para poder ejecutarse y indicamos que no pare la ejecución en caso de fallo con "continue-on-error: true", por último guarda el resultado de los tests en el archivo result.txt y con el action upload-artifact lo guarda para usarlo en la siguiente action.

```
  Cypress_job:
    needs: Linter_job
    runs-on: ubuntu-latest
    continue-on-error: true
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Cypress run
        id: cypress
        uses: cypress-io/github-action@v2
        continue-on-error: true
        with:
          config-file: cypress.json
          build: npm run build
          start: npm start
 
      - name: echo
        run: echo ${{steps.cypress.outcome}} >> result.txt

      - name: Upload
        uses: actions/upload-artifact@v2
        with:
          name: result.txt
          path: result.txt
```
No funcionaba 
![image](https://user-images.githubusercontent.com/45063500/146682872-880efa33-4c3e-4d05-a036-3f10dd27f5f6.png)

Para hacer el fix he cambiado index.js de pages/api/users y he cambiado metodo "POST0" por "POST"
![image](https://user-images.githubusercontent.com/45063500/146682841-a0013819-0789-4dd5-9305-22878ccdbfea.png)
![image](https://user-images.githubusercontent.com/45063500/146684469-43433c3d-b9d4-401a-afb8-e4e01f6fe848.png)

## Badges
### ¿Qué son las badges?
Las badges son utilizadas por el CI para comprobar de una manera visual la finalización de los últimos cambios en nuestro proyectos, se pueden usar para el status del deploy, los tests, el linter etc

### Expliación del job
Descargamos el codigo del repositorio con la action checkout i ejecutamos la action de download-artifact praa descargar el txt que habiamos subido en la action anterior, ejecutamos el action personalizada que hemos creado de la badge que hace los cambios en el readme para poner la badge y subimos los cambios a la rama main, tambien hacemos que necesite el job Cypress_job para que se ejecute despues.

```
  Add_badge_job:
    needs: Cypress_job
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2
      
      - name: Download Changes
        uses: actions/download-artifact@v2
        with:
          name: result.txt
      - name: Badge  
        uses: ./.github/actions/badge/
      
      - name: Push
        run: | 
            git config user.name "Antoni"
            git config user.email "antonitormo@gmail.com"
            git pull
            git add .
            git commit --allow-empty -m "Readme" 
            git remote set-url origin https://antonitg:${{ secrets.PASSWD }}@github.com/antonitg/nextjs-blog-practica-main.git

```

### Action
Dependiendo de los resultados pone una de las badges.
Compilado con "ncc build index.js --license licenses.txt"

```
const fs = require("fs");
const res = fs.readFileSync("result.txt", "utf8")
if (res == "success") {
   var badge = "![badge-success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
} else {
   var badge = "![badge-failure](https://img.shields.io/badge/test-failure-red)"
}

fs.readFile("README.md", "utf8", function (err, data) {
   var result = data.replace(/Section badge.*End section badge/, badge);
   fs.writeFile("README.md", result, function (err) {
   });
});  
```

## Mail

### Explicación job
Descargamos el codigo del repositorio con la action checkout i ejecutamos la action propia del mail.
```
  Mail_job:
    runs-on: ubuntu-latest
    if: always()
    needs: [Deploy_job, Cypress_job, Linter_job, Add_badge_job ]
    steps:
      - name: Checkout      
        uses: actions/checkout@v2
      
      - name: Send mail
        uses: ./.github/actions/mail/
        with:
          resLinter: ${{ needs.Linter_job.result }}
          resBadge:  ${{ needs.Add_badge_job.result }}
          resCypress:  ${{ needs.Cypress_job.result }}
          resDeploy:  ${{ needs.Deploy_job.result }}
          ownMail: ${{ secrets.OWNEMAIL  }}
          ownPasswd: ${{ secrets.OWNPASSWD }}
```
### Action
Para que funcionase he tenido que aceptar la funcion de login de fuentes desconoidas de google y gmail
```
var nodemailer = require('nodemailer');

const core = require('@actions/core');
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: core.getInput('ownMail'),
        pass: core.getInput('ownPasswd')
        }
});
var mailOptions = {
    from: core.getInput('ownMail'),
    to: 'antonitormo@gmail.com', 
    subject: 'Resultado del workflow ejecutado',
    text: 'Se ha realizado un push en la rama main que ha provocado la ejecución del workflow nombre_repositorio_workflow con los siguientes resultados: linter_job: ' + core.getInput('resLinter') + 'cypress_job: ' + core.getInput('resCypress') + 'add_badge_job: ' + core.getInput('resBadge') + 'deploy_job:' + core.getInput('resDeploy')
}
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log(response);
    }
});
```
![image](https://user-images.githubusercontent.com/45063500/146688794-d8bc8224-2df1-4adc-b5da-f8b307ec482a.png)
![image](https://user-images.githubusercontent.com/45063500/146689041-72d7c76d-83d6-43c2-bede-5491dc892a81.png)
![image](https://user-images.githubusercontent.com/45063500/146689049-e8c7f0ff-8583-4819-bd2c-dd60154f87f4.png)

## Workflow final
```
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the nodejs_linter_job branch
  push:
    branches: [nextjs-blog-practica_workflow]
  pull_request:
    branches: [nextjs-blog-practica_workflow]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  Linter_job:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Run lint
        run: |
          npm install
          npm install --save-dev eslint
          npm run lint

  Cypress_job:
    needs: Linter_job
    runs-on: ubuntu-latest
    continue-on-error: true
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Cypress run
        id: cypress
        uses: cypress-io/github-action@v2
        continue-on-error: true
        with:
          config-file: cypress.json
          build: npm run build
          start: npm start
 
      - name: echo
        run: echo ${{steps.cypress.outcome}} > result.txt

      - name: Upload
        uses: actions/upload-artifact@v2
        with:
          name: result.txt
          path: result.txt
  Add_badge_job:
    needs: Cypress_job
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2
      
      - name: Download Changes
        uses: actions/download-artifact@v2
        with:
          name: result.txt
      - name: Badge  
        uses: ./.github/actions/badge/
      
      - name: Push
        run: | 
            git config user.name "Antoni"
            git config user.email "antonitormo@gmail.com"
            git pull
            git add .
            git commit --allow-empty -m "Readme" 
            git remote set-url origin https://antonitg:${{ secrets.PASSWD }}@github.com/antonitg/nextjs-blog-practica-main.git
            git push
  Deploy_job:
    runs-on: ubuntu-latest
    needs: Cypress_job
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: deploy
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERC_TKN }}
          vercel-project-id: ${{ secrets.VERC_PROJ_ID}}
          vercel-org-id: ${{ secrets.VERC_ORG_ID}}
          working-directory: ./

  Mail_job:
    runs-on: ubuntu-latest
    if: always()
    needs: [Deploy_job, Cypress_job, Linter_job, Add_badge_job ]
    steps:
      - name: Checkout      
        uses: actions/checkout@v2
      
      - name: Send mail
        uses: ./.github/actions/mail/
        with:
          resLinter: ${{ needs.Linter_job.result }}
          resBadge:  ${{ needs.Add_badge_job.result }}
          resCypress:  ${{ needs.Cypress_job.result }}
          resDeploy:  ${{ needs.Deploy_job.result }}
          ownMail: ${{ secrets.OWNEMAIL  }}
          ownPasswd: ${{ secrets.OWNPASSWD }}
```
