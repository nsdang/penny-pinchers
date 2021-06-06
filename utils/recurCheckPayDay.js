var cron = require('node-cron');

const recurCheckPayDay = () => {
  var task = cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });

  task.start();
};

module.exports = recurCheckPayDay();