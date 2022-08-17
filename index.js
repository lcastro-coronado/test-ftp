require('dotenv').config();
const sftp = require('./src/helpers/sftp/sftpHelper');

const sftpConfig = {
    host:'sftp.cebroker.com',
    port:'22',
    user:'test-user',
    password:'Condor2020+'
};


sftp.setConfig(sftpConfig);

const init = async() =>{

    console.log('list =>',await sftp.list('/'));

};

init();
