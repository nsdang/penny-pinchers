var fs = require("fs");

// const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// // with a + sign before the phone number
// const phonenoPlus = /^\+?[1-9]\d{1,14}$/;

// const validationErrors = {};
// if (shareMethod == "Email") {
//   if (!userInfo.email.match(mailformat)) {
//     validationErrors["email"] = "This is not a valid email address";
//   }
// } else {
//   if (!userInfo.phoneNumber.match(phonenoPlus)) {
//     validationErrors["phoneno"] = "This is not a valid phone number";
//   }
// }
// if (Object.keys(validationErrors).length > 0) {
//   throw new UserInputError("Failed to share due to validation errors", { validationErrors });
// }

const sendEmail = async ({ subscription, client }) => {
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
      throw error;
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

const recurCheckPayDay = (list, item, user ) => {
  function checkDueDateEvery24Hours(i) {
    setTimeout(() => {
      console.log("Infinite Loop Test n:", i);
      checkDueDateEvery24Hours(++i);
    }, 1000 * 60 * 60 * 24);
  }

  checkDueDateEvery24Hours(0);
};

module.exports.sendEmail = sendEmail;
module.exports.recurCheckPayDay = recurCheckPayDay;
