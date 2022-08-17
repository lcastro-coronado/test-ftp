'use strict';
const logger = require('@condor-labs/logger');
const { SLACK_WEBHOOK_URL } = process.env;
const { IncomingWebhook } = require('@slack/webhook');

const sendNotification = async (message) => {
  try {
    const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);
    await webhook.send(message);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  sendNotification,
};