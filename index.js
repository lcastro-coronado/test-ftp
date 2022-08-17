const sftp = require('./src/helpers/sftp/sftpHelper');

const sftpConfig = {
    host:'test.rebex.net',
    port:'22',
    user:'demo',
    password:'password'
};


sftp.setConfig(sftpConfig);

const init = async() =>{

    console.log('list =>',await sftp.list('/'));

};

init();
