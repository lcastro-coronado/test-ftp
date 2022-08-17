// This config file is used to constantly run your project with PM2
// In case of doubts: https://desarrolloweb.com/articulos/ejecutar-aplicacion-nodejs-pm2.html and https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
    apps : [{
      name : "sale-force-ftp",
      exec_mode: 'cluster',
      script : "./index.js",
      max_memory_restart: '650M',
      log_date_format: 'YYYY/MM/DD HH:mm:ss',
    }]
}