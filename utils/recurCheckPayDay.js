const cron = require('node-cron');
const fs = require("fs");

const EmailReminder = function() {

  this.recurCheckPayDay = (SubItemModel) => {
    var task = cron.schedule('* * * * *', async () => {
      console.log('running a task every minute');
      
      SubItemModel.returnAllItems().then(resolve => {
        console.log(resolve);
      });
    });
  
    task.start();
  };

  this.sendEmail = async ({ subscription, client }) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(process.env.SENDGRID_API_KEY);
    var msg = {
      to: client.email, // Change to your recipient
      from: { email: "dnguyen1@seattleu.edu", name: "Penny Pinchers" }, // Change to your verified sender
      subject: `Reminder for upcoming ${subscription.serviceName} pay day!!!`,
      //text: "and easy to do anywhere, even with Node.js",
      html: `<div style="text-align: center;">
      <h1>Hello ${client.username}</h1>
      <h3> The ${subscription.serviceName} service will be charged on ${subscription.dueDate} with $${subscription.price}.</h3>
      </br>
      <h3> Make sure to unsubscribe berfore the due date!</h3>
      </div>`,
    };
  
    fs.readFile("./utils/email_template.html", function (err, html) {
      if (err) {
        throw err;
      }
      msg.html = html.toString();
  
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error.body);
        });
    });
  };
}

module.exports = EmailReminder;