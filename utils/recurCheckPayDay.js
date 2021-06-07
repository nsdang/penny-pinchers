const cron = require("node-cron");
const fs = require("fs");

const EmailReminder = function () {
  this.recurCheckPayDay = (UserModel, SubListModel, SubItemModel) => {
    var task = cron.schedule("0 0 1 * *", async () => {
      console.log("at 00:00 on everyday");

      // Check for monthly reminder
      SubItemModel.returnAllItems({ recurringOption: "Monthly" }).then(
        (resolve) => {
          resolve.forEach((element) => {
            if (new Date().getUTCDate() - element.dueDate.getUTCDate() === -1) {
              console.log("monthly", element);

              SubListModel.returnOwnerId({ listId: element.listId }).then(
                (resolve) => {
                  UserModel.returnUserInfo({ userId: resolve }).then(
                    (resolve) => {
                      this.sendEmail({
                        subscription: element,
                        client: resolve,
                      });
                    }
                  );
                }
              );
            }
          });
        }
      );

      // Check for annually reminder
      SubItemModel.returnAllItems({ recurringOption: "Annually" }).then(
        (resolve) => {
          resolve.forEach((element) => {
            var today = new Date();
            if (
              today.getUTCFullYear() - element.dueDate.getUTCMonth() === 1 &&
              today.getUTCMonth() === element.dueDate.getUTCMonth() &&
              today.getUTCDate() - element.dueDate.getUTCDate() === -1
            ) {
              console.log("annually", element);

              SubListModel.returnOwnerId({ listId: element.listId }).then(
                (resolve) => {
                  UserModel.returnUserInfo({ userId: resolve }).then(
                    (resolve) => {
                      this.sendEmail({
                        subscription: element,
                        client: resolve,
                      });
                    }
                  );
                }
              );
            }
          });
        }
      );
    });

    task.start();
  };

  this.sendEmail = async ({ subscription, client }) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(process.env.SENDGRID_API_KEY);

    // Initialize values
    var clientName = client.fname + " " + client.lname;
    var msg = {
      to: client.email,
      from: { email: "dnguyen1@seattleu.edu", name: "Penny Pinchers" },
      subject: `Reminder for upcoming ${subscription.serviceName} pay day!!!`,
      html: `<div style="text-align: center;">
      <h1>Hello ${client.fname + " " + client.lname}</h1>
      <h3> The ${subscription.serviceName} service will be charged on ${subscription.dueDate} with $${subscription.price}.</h3>
      </br>
      <h3> Make sure to unsubscribe berfore the due date!</h3>
      </div>`,
    };

    fs.readFile("./utils/email_template.html", function (err, html) {
      if (err) {
        throw err;
      }
      msg.html = html
        .toString()
        .replace("client_name", clientName)
        .replace("service_name", subscription.serviceName)
        .replace("due_date", subscription.dueDate);

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
};

module.exports = EmailReminder;
