'use strict';

const SftpClient = require('ssh2-sftp-client');
const logger = require('@condor-labs/logger');
const { delay } = require('../../utils/utils');
const slack = require('../../services/send-slack-notification');

console.log('ENVS',process.env.SLACK_WEBHOOK_URL);

let configFTP = null;
const retryFunction = async (func, commandName = '', retries = 1) => {
  try {
    return await func();
  } catch (error) {
    if (retries <= Number(1)) {
      logger.warning({
        message: `Retrying FTP ${commandName} command`,
        error,
      });
      await delay(Number(10));
      // eslint-disable-next-line no-param-reassign
      return await retryFunction(func, commandName, ++retries);
    }
    logger.error({
      message: `It was not possible to run FTP ${commandName} command`,
      error,
    });
    
    slack.sendNotification(
      `It was not possible to run FTP ${commandName} command`
     
    );
    throw error;
  
  }
};

async function connectFTP() {
  ftp.sftpClient = new SftpClient();
  if (!configFTP) {
    throw new Error('configFTP object is required');
  }
  const { host, port, user, password } = configFTP;
  await ftp.sftpClient.connect({
    host,
    port,
    user,
    password,
    algorithms: {
      "kex": [
          "diffie-hellman-group14-sha1","diffie-hellman-group-exchange-sha1"
      ]
  }
  }
  );
}

const ftp = {
  sftpClient: null,
  setConfig(config) {
    configFTP = config;
  },
  connect: connectFTP,
  async exists(path) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.exists(path);
    }, 'exists');
  },
  async list(path) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.list(path);
    }, 'list');
  },
  async mkdir(dirPath) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.mkdir(dirPath);
    }, 'mkdir');
  },
  async get(remotePath, localPath) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.get(remotePath, localPath);
    }, 'get');
  },
  async put(localPath, remotePath) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.put(localPath, remotePath);
    }, 'put');
  },
  async delete(path) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.delete(path);
    }, 'delete');
  },
  async close() {
    try {
      await this.sftpClient.end();
    } catch (error) {
      this.sftpClient = null;
    }
  },
  async rename(fromPath, toPath) {
    return await retryFunction(async () => {
      await this.connect();
      return await this.sftpClient.rename(fromPath, toPath);
    }, 'rename/move');
  },
};
module.exports = ftp;