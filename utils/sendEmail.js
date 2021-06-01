const sendEmail = async ({ subscription, client }) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
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
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body.errors);
    });
};

module.exports.sendEmail = sendEmail;
