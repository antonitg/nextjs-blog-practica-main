var nodemailer = require('nodemailer');
const core = require('@actions/core');
var smtpTransport = nodemailer.createTransport("SMTP",{
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
