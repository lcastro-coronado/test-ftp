require('dotenv').config();
const sftp = require('./src/helpers/sftp/sftpHelper');

const sftpConfig = {
host:process.env.SFTP_HOST,
port:process.env.SFTP_POST,
user:process.env.SFTP_USER,
password:process.env.SFTP_PASSWORD
};







sftp.setConfig(sftpConfig);

const init = async() =>{

console.log('put =>',await sftp.uploadDir('/Users/luiscastro/Desktop/screen','/licensees'));

};

init();
